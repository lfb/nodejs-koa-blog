const Router = require('koa-router');

const {
  ArticleValidator,
  PositiveIdParamsValidator
} = require('../../validators/article');

const {Auth} = require('../../../middlewares/auth');
const {ArticleDao} = require('../../dao/article');
const {CommentDao} = require('../../dao/comment');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const {getRedis, setRedis} = require('../../cache/_redis')
// redis key 前缀
const REDIS_KEY_API_PREFIX = 'boblog_api'

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
  // 尝试获文章取缓存
  const {category_id = 0, page = 1} = ctx.query;
  const key = `${REDIS_KEY_API_PREFIX}_article_list_category_id${category_id}_page${page}`
  const cacheArticleData = await getRedis(key)

  if (cacheArticleData) {
    ctx.body = res.json(cacheArticleData);

  } else {
    // 没有缓存，则读取数据库
    const articleList = await ArticleDao.list(ctx.query);
    setRedis(key, articleList, 60)
    ctx.response.status = 200;
    // 设置缓存，过期时间 1min
    ctx.body = res.json(articleList)
  }
});

/**
 * 查询文章详情
 */
router.get('/article/:id', async (ctx) => {
  // 尝试获文章取缓存
  const key = `${REDIS_KEY_API_PREFIX}_article_detail_${ctx.params.id}`
  const cacheArticleDetail = await getRedis(key)
  if (cacheArticleDetail) {
    ctx.body = res.json(cacheArticleDetail);

  } else {
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
    /**
     * 设置缓存，过期时间 1min
     */
    setRedis(key, article, 60)
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(article);
  }
})

module.exports = router
