const Router = require('koa-router')

const {AdvertiseDao} = require('../../dao/advertise')
const {AdvertiseValidator, PositiveArticleIdParamsValidator} = require('../../validators/advertise')
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
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
  ctx.body = res.success('删除回复评论成功')
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
  ctx.body = res.success('更新评论成功')
})

// 获取广告列表
router.get('/advertise', async (ctx) => {
  const page = ctx.query.page;
  let CommentReplyList = await AdvertiseDao.list(page);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(CommentReplyList);

})

// 获取广告详情
router.get('/advertise/:id', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取广告ID参数
  const id = v.get('path.id');
  let commentReply = await AdvertiseDao.detail(id)

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(commentReply);

})

module.exports = router
