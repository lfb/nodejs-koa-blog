const Router = require('koa-router')

const {AdvertiseDao} = require('../../dao/advertise')
const {AdvertiseValidator, PositiveArticleIdParamsValidator} = require('../../validators/advertise')
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const {getRedis, setRedis} = require('../../cache/_redis')
// redis key 前缀
const REDIS_KEY_API_PREFIX = 'boblog_api'

const router = new Router({
  prefix: '/api/v1'
})

// 创建广告
router.post('/advertise', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new AdvertiseValidator().validate(ctx);
  // 创建回复
  const r = await AdvertiseDao.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(r);
})

// 删除广告
router.delete('/advertise/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取广告ID参数
  const id = v.get('path.id');
  await AdvertiseDao.destroy(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('删除广告成功')
})

// 修改广告
router.put('/advertise/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取广告ID参数
  const id = v.get('path.id');
  await AdvertiseDao.update(id, v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('更新广告成功')
})

// 获取广告列表
router.get('/advertise', async (ctx) => {
  const key = `${REDIS_KEY_API_PREFIX}_advertise_list`
  const cacheAdvertiseListData = await getRedis(key)
  if (cacheAdvertiseListData) {
    console.log('广告缓存')
    // 返回结果
    ctx.body = res.json(cacheAdvertiseListData);

  } else {
    const page = ctx.query.page;
    const list = await AdvertiseDao.list(page);

    setRedis(key, list, 60)
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list);
  }

})

// 获取广告详情
router.get('/advertise/:id', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取广告ID参数
  const id = v.get('path.id');
  const data = await AdvertiseDao.detail(id)

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(data);

})

module.exports = router
