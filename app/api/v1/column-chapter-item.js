const Router = require('koa-router');

const {
  ColumnChapterItemValidator,
  PositiveIdParamsValidator
} = require('../../validators/column-chapter-item');

const {Auth} = require('../../../middlewares/auth');
const {ColumnChapterItemDao} = require('../../dao/column-chapter-item');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

/**
 * 创建专栏文章
 */
router.post('/column/chapter/item', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new ColumnChapterItemValidator().validate(ctx);

  // 创建专栏章节
  await ColumnChapterItemDao.createColumnChapterItem(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('创建专栏文章成功');
});

/**
 * 删除专栏文章
 */
router.delete('/column/chapter/item/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏文章ID参数
  const id = v.get('path.id');
  // 删除专栏
  await ColumnChapterItemDao.destroyColumnChapterItem(id);

  ctx.response.status = 200;
  ctx.body = res.success('删除专栏文章成功');
})

/**
 * 更新专栏文章
 */
router.put('/column/chapter/item/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏ID参数
  const id = v.get('path.id');
  // 更新专栏章节
  await ColumnChapterItemDao.updateColumnChapterItem(id, v);

  ctx.response.status = 200;
  ctx.body = res.success('更新专栏文章成功');
})


/**
 * 获取专栏文章列表
 */
router.get('/column/chapter/item', async (ctx) => {
  // 获取页码，排序方法
  const {column_chapter_id} = ctx.query;
  // 查询专栏章节列表
  const columnChapterItemList = await ColumnChapterItemDao.getColumnChapterItemList(column_chapter_id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(columnChapterItemList);
});

/**
 * 查询专栏文章详情
 */
router.get('/column/chapter/item/:id', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏ID参数
  const id = v.get('path.id');
  // 查询专栏文章
  const columnChapterItem = await ColumnChapterItemDao.getColumnChapterItemDetail(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(columnChapterItem);

})

module.exports = router
