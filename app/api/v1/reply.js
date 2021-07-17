const Router = require('koa-router')

const {ReplyDao} = require('@dao/reply')
const {ReplyValidator, PositiveArticleIdParamsValidator} = require('@validators/reply')
const {Auth} = require('@middlewares/auth');

const {Resolve} = require('@lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/api/v1'
})

// 创建评论
router.post('/reply', async (ctx) => {
  // 通过验证器校验参数是否通过
  console.log(ctx.request.body)
  const v = await new ReplyValidator().validate(ctx);
  // 创建回复
  const r = await ReplyDao.create(v);

  const data = {
    id: r.getDataValue('id'),
    content: r.getDataValue('content'),
    status: r.getDataValue('status'),
    comment_id: r.getDataValue('comment_id'),
    user_id: r.getDataValue('user_id'),
    reply_user_id: r.getDataValue('reply_user_id'),
    created_at: r.getDataValue('created_at')
  };

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(data);
})

// 删除评论
router.delete('/reply/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  const [err, data] = await ReplyDao.destroy(id);
  if(!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('删除回复评论成功')
  }else {
    ctx.body = res.fail(err)
  }
})

// 修改评论
router.put('/reply/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  const [err, data] = await ReplyDao.update(id, v);
  if(!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('更新评论成功')

  } else {
    ctx.body = res.fail(err)
  }

})

// 获取评论列表
router.get('/reply', async (ctx) => {
  const comment_id = ctx.query.comment_id
  const [err, data] = await ReplyDao.list(comment_id);
  if(!err) {
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }


})

// 获取评论详情
router.get('/reply/:id', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  const [err, data] = await ReplyDao.detail(id)

  if(!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(data);
  }else {
    ctx.body = res.fail(err)
  }
})

module.exports = router
