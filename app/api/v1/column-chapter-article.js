const Router = require('koa-router');

const {
  ColumnChapterArticleValidator,
  PositiveIdParamsValidator
} = require('../../validators/column-chapter-article');

const {Auth} = require('../../../middlewares/auth');
const {ColumnChapterArticleDao} = require('../../dao/column-chapter-article');
const {ColumnCommentsDao} = require('../../dao/column-comments');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

/**
 * 创建专栏文章
 */
router.post('/column/chapter/c', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new ColumnChapterArticleValidator().validate(ctx);

  // 创建专栏章节
  await ColumnChapterArticleDao.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('创建专栏文章成功');
});

/**
 * 删除专栏文章
 */
router.delete('/column/chapter/article/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏文章ID参数
  const id = v.get('path.id');
  // 删除专栏
  await ColumnChapterArticleDao.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success('删除专栏文章成功');
})

/**
 * 更新专栏文章
 */
router.put('/column/chapter/article/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏ID参数
  const id = v.get('path.id');
  // 更新专栏章节
  await ColumnChapterArticleDao.update(id, v);

  ctx.response.status = 200;
  ctx.body = res.success('更新专栏文章成功');
})


/**
 * 获取专栏文章列表
 */
router.get('/column/chapter/article', async (ctx) => {
  // 获取页码，排序方法
  const {column_chapter_id} = ctx.query;
  // 查询专栏章节列表
  const columnChapterArticleList = await ColumnChapterArticleDao.list(column_chapter_id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(columnChapterArticleList);
});

/**
 * 查询专栏文章详情
 */
router.get('/column/chapter/article/:id', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏ID参数
  const id = v.get('path.id');
  // 查询专栏文章
  const columnChapterArticle = await ColumnChapterArticleDao.destroy(id);

  // 获取关联此文章的评论列表
  const commentsList = await ColumnCommentsDao.articleComments(id);
  await columnChapterArticle.setDataValue('comments', commentsList);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(columnChapterArticle);

})

module.exports = router
