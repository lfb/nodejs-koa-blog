const Router = require('koa-router')

const { ReplyDao } = require('@dao/reply')
const { ReplyValidator, PositiveArticleIdParamsValidator } = require('@validators/reply')
const { Auth } = require('@middlewares/auth');

const { Resolve } = require('@lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/api/v1'
})

// 创建回复
router.post('/reply', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new ReplyValidator().validate(ctx);
  // 创建回复
  const [err, data] = await ReplyDao.create(v);

  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('回复成功');
  } else {
    ctx.body = res.fail(err);
  }

})

// 删除回复
router.delete('/reply/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  const [err, data] = await ReplyDao.destroy(id);
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('删除回复回复成功')
  } else {
    ctx.body = res.fail(err)
  }
})

// 修改回复
router.put('/reply/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  const [err, data] = await ReplyDao.update(id, v);
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('更新回复成功')

  } else {
    ctx.body = res.fail(err)
  }

})

// 获取回复列表
router.get('/reply', async (ctx) => {
  const [err, data] = await ReplyDao.list(ctx.query);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }
})

// 获取回复详情
router.get('/reply/:id', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  const [err, data] = await ReplyDao.detail(id)

  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err)
  }
})

module.exports = router
