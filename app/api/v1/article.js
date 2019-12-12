const Router = require('koa-router');

const {
  ArticleValidator,
  PositiveIdParamsValidator,
  ArticleSearchValidator
} = require('../../validators/article');

const {Auth} = require('../../../middlewares/auth');
const {ArticleDao} = require('../../dao/article');
const {CommentDao} = require('../../dao/comment');
const {ColumnDao} = require('../../dao/column');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();
const marked = require('marked');

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

/**
 * 创建文章
 */
router.post('/article', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new ArticleValidator().validate(ctx);

  // 创建文章
  await ArticleDao.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('创建文章成功');
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
  await ArticleDao.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success('删除文章成功');
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
  await ArticleDao.update(id, v);

  ctx.response.status = 200;
  ctx.body = res.success('更新文章成功');
})


/**
 * 获取文章列表
 */
router.get('/article', async (ctx) => {
  // 查询文章列表
  const list = await ArticleDao.list(ctx.query);
  console.log(list)
  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json();
  await ctx.render('article-list', {
    list,
  });
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
  const article = await ArticleDao.detail(id);

  // 获取关联此文章的评论列表
  const commentList = await CommentDao.targetComment({
    target_id: id,
    target_type: 'article'
  });

  // 更新文章浏览
  await ArticleDao.updateBrowse(id, ++article.browse);
  await article.setDataValue('article_comment', commentList);
  const content = marked(article.content.toString());
  // 返回结果
  ctx.response.status = 200;
  await ctx.render('article-detail', {
    article: article,
    content
  });
})

/**
 * 返回首页的文章和专栏
 */
router.get('/article/detail', async (ctx) => {
  // 获取文章ID参数
  const id = v.get('path.id');
  // 查询文章
  const article = await ArticleDao.detail(id);
  // 返回结果
  const content = marked(article.content.toString());
  ctx.response.status = 200;
  await ctx.render('article-detail', {
    article: article,
    content
  });
})

/**
 * 关于
 */
router.get('/about', async (ctx) => {
  await ctx.render('about');
})


module.exports = router
