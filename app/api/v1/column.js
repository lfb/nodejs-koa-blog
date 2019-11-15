const Router = require('koa-router');

const {
  ColumnValidator,
  PositiveIdParamsValidator
} = require('../../validators/column');

const {Auth} = require('../../../middlewares/auth');
const {ColumnDao} = require('../../dao/column');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

/**
 * 创建专栏
 */
router.post('/column', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new ColumnValidator().validate(ctx);

  // 创建专栏
  await ColumnDao.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('创建专栏成功');
});

/**
 * 删除专栏
 */
router.delete('/column/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏ID参数
  const id = v.get('path.id');
  // 删除专栏
  await ColumnDao.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success('删除专栏成功');
})

/**
 * 更新专栏
 */
router.put('/column/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏ID参数
  const id = v.get('path.id');
  // 更新专栏
  await ColumnDao.update(id, v);

  ctx.response.status = 200;
  ctx.body = res.success('更新专栏成功');
})


/**
 * 获取专栏列表
 */
router.get('/column', async (ctx) => {
  // 查询专栏列表
  const columnList = await ColumnDao.list(ctx.query);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(columnList);
});

/**
 * 查询专栏详情
 */
router.get('/column/:id', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏ID参数
  const id = v.get('path.id');
  // 查询专栏
  const column = await ColumnDao.detail(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(column);

})

module.exports = router
