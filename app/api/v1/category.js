/**
 * @description 分类的路由 API 接口
 * @description Category's routing API interface
 * @author 梁凤波, Peter Liang
 */

const Router = require('koa-router');

const {
  CategoryValidator,
  PositiveIdParamsValidator
} = require('../../validators/category');

const {CategoryDao} = require('../../dao/category');
const {Auth} = require('../../../middlewares/auth');

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
 * 创建分类
 */
router.post('/category', new Auth(AUTH_ADMIN).m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new CategoryValidator().validate(ctx);
  const result = await CategoryDao.create({
    name: v.get('body.name'),
    key: v.get('body.key'),
    parent_id: v.get('body.parent_id'),
  });

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(result)
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
  await CategoryDao.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success('删除分类成功');
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
  await CategoryDao.update(id, v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('更新分类成功');
})

/**
 * 获取所有的分类
 */
router.get('/category', async (ctx) => {
  const key = `${REDIS_KEY_API_PREFIX}_category_list`
  const cacheCategoryListData = await getRedis(key)
  if (cacheCategoryListData) {
    // 返回结果
    ctx.body = res.json(cacheCategoryListData);
  } else {
    const categoryList = await CategoryDao.list();
    setRedis(key, categoryList, 60)
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(categoryList);
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
  const category = await CategoryDao.detail(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(category);
})

module.exports = router
