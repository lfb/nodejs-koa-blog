const Router = require('koa-router');

const {
  ColumnChapterValidator,
  PositiveColumnIdParamsValidator,
  PositiveIdParamsValidator
} = require('../../validators/column-chapter');

const {Auth} = require('../../../middlewares/auth');
const {ColumnChapterDao} = require('../../dao/column-chapter');
const {ColumnDao} = require('../../dao/column');

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
  await ColumnChapterDao.create(v);

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
  await ColumnChapterDao.destroy(id);

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
  await ColumnChapterDao.update(id, v);

  ctx.response.status = 200;
  ctx.body = res.success('更新专栏章节成功');
})


/**
 * 获取专栏章节列表
 */
router.get('/column/chapter-list/:column_id', async (ctx) => {
  // 获取专栏
  // 通过验证器校验参数是否通过
  const v = await new PositiveColumnIdParamsValidator().validate(ctx);
  const column_id = v.get('path.column_id');
  // 查询当前ID的专栏
  const column = await ColumnDao.title(column_id);
  // 查询专栏章节列表
  const chapterList = await ColumnChapterDao.list(column_id);

  // 带上专栏名称
  column.setDataValue('chapter_list', chapterList)
  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(column);
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
  const columnChapter = await ColumnChapterDao.detail(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(columnChapter);

})

module.exports = router
