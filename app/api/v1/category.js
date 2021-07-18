/**
 * @description 分类的路由 API 接口
 * @description Category's routing API interface
 * @author 梁凤波, Peter Liang
 */

const Router = require('koa-router');

const {
  CategoryValidator,
  PositiveIdParamsValidator
} = require('@validators/category');

const { CategoryDao } = require('@dao/category');
const { Auth } = require('@middlewares/auth');

const { Resolve } = require('@lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/api/v1'
})

/**
 * 创建分类
 */
router.post('/category', new Auth(AUTH_ADMIN).m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new CategoryValidator().validate(ctx);
  const [err, data] = await CategoryDao.create({
    name: v.get('body.name'),
    status: v.get('status'),
    sort_order: v.get('sort_order'),
    parent_id: v.get('body.parent_id'),
  });

  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(data)
  } else {
    ctx.body = res.fail(err)
  }
})


/**
 * 删除文章
 */
router.delete('/category/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  // 删除分类
  const [err, data] = await CategoryDao.destroy(id);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('删除分类成功');
  } else {
    ctx.body = res.fail(err);
  }
})


/**
 * 更新分类
 */
router.put('/category/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  // 更新分类
  const [err, data] = await CategoryDao.update(id, v);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.success('更新分类成功');
  } else {
    ctx.body = res.fail(err);
  }
})

/**
 * 获取所有的分类
 */
router.get('/category', async (ctx) => {
  const [err, data] = await CategoryDao.list(ctx.query);
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }
})

/**
 * 获取分类详情
 */
router.get('/category/:id', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取参数
  const id = v.get('path.id');
  // 获取分类
  const [err, data] = await CategoryDao.detail(id);
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }
})

module.exports = router
