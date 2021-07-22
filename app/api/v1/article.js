const Router = require('koa-router');

const {
  ArticleValidator,
  PositiveIdParamsValidator
} = require('@validators/article');

const { Auth } = require('@middlewares/auth');
const { ArticleDao } = require('@dao/article');
const { CommentDao } = require('@dao/comment');

const { Resolve } = require('@lib/helper');
const res = new Resolve();

const hljs = require('highlight.js');
const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          // Deprecated as of 10.7.0. highlight(lang, code, ...args) has been deprecated.
          // Deprecated as of 10.7.0. Please use highlight(code, options) instead.
          // https://github.com/highlightjs/highlight.js/issues/2277
          // hljs.highlight(lang, str, true).value + '</code></pre>';
          hljs.highlight(str, {
            language: lang,
            ignoreIllegals: true
          }).value + '</code></pre>';
      } catch (__) { }
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/api/v1'
})

/**
 * 创建文章
 */
router.post('/article', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new ArticleValidator().validate(ctx);

  // 创建文章
  const [err, data] = await ArticleDao.create(v);
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('创建文章成功');
  } else {
    ctx.body = res.fail(err);
  }
});

/**
 * 删除文章
 */
router.delete('/article/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取文章ID参数
  const id = v.get('path.id');
  // 删除文章
  const [err, data] = await ArticleDao.destroy(id);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('删除文章成功');
  } else {
    ctx.body = res.fail(err);
  }
})

/**
 * 更新文章
 */
router.put('/article/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取文章ID参数
  const id = v.get('path.id');
  // 更新文章
  const [err, data] = await ArticleDao.update(id, v);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('更新文章成功');
  } else {
    ctx.body = res.fail(err);
  }
})


/**
 * 获取文章列表
 */
router.get('/article', async (ctx) => {
  // 尝试获文章取缓存
  const { category_id = 0, page = 1 } = ctx.query;

  // 没有缓存，则读取数据库
  const [err, data] = await ArticleDao.list(ctx.query);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.json(data)
  } else {
    ctx.body = res.fail(err)
  }
});

/**
 * 查询文章详情
 */
router.get('/article/:id', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);
  // 获取文章ID参数
  const id = v.get('path.id');
  // 查询文章
  const [err, data] = await ArticleDao.detail(id, ctx.query);
  if (!err) {
    // 获取关联此文章的评论列表
    const [commentError, commentData] = await CommentDao.targetComment({
      article_id: id
    })

    if (!commentError) {
      data.article_comment = commentData
    }

    if (ctx.query.is_markdown) {
      data.content = md.render(data.content)
    }


    // 更新文章浏览
    await ArticleDao.updateBrowse(id, ++data.browse);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }
})

module.exports = router
