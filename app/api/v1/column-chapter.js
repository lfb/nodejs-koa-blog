const Router = require('koa-router');

const {
  ColumnChapterValidator,
  PositiveIdParamsValidator
} = require('../../validators/column-chapter');

const {Auth} = require('../../../middlewares/auth');
const {ColumnChapterDao} = require('../../dao/column-chapter');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

/**
 * 创建专栏章节
 */
router.post('/column/chapter', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new ColumnChapterValidator().validate(ctx);

  // 创建专栏章节
  await ColumnChapterDao.createColumnChapter(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('创建专栏章节成功');
});

/**
 * 删除专栏
 */
router.delete('/column/chapter/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏章节ID参数
  const id = v.get('path.id');
  // 删除专栏
  await ColumnChapterDao.destroyColumnChapter(id);

  ctx.response.status = 200;
  ctx.body = res.success('删除专栏章节成功');
})

/**
 * 更新专栏
 */
router.put('/column/chapter/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏ID参数
  const id = v.get('path.id');
  // 更新专栏章节
  await ColumnChapterDao.updateColumnChapter(id, v);

  ctx.response.status = 200;
  ctx.body = res.success('更新专栏章节成功');
})


/**
 * 获取专栏列表
 */
router.get('/column/chapter', async (ctx) => {
  // 获取页码，排序方法
  const {column_id} = ctx.query;
  // 查询专栏章节列表
  const columnChapterList = await ColumnChapterDao.getColumnChapterList(column_id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(columnChapterList);
});

/**
 * 查询专栏章节详情
 */
router.get('/column/chapter/:id', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏ID参数
  const id = v.get('path.id');
  // 查询专栏章节
  const columnChapter = await ColumnChapterDao.getColumnChapterDetail(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(columnChapter);

})

module.exports = router
