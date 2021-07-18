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

// 创建评论
router.post('/reply', async (ctx) => {
  // 通过验证器校验参数是否通过
  console.log(ctx.request.body)
  const v = await new ReplyValidator().validate(ctx);
  // 创建回复
  const [err, data] = await ReplyDao.create(v);

  if (!err) {
    const resData = {
      id: data.id,
      content: data.content,
      status: data.status,
      comment_id: data.comment_id,
      article_id: data.article_id,
      user_id: data.user_id,
      reply_user_id: data.reply_user_id,
      created_at: data.created_at
    };

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(resData);
  } else {
    ctx.body = res.fail(err);
  }

})

// 删除评论
router.delete('/reply/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  const [err, data] = await ReplyDao.destroy(id);
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('删除回复评论成功')
  } else {
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
  if (!err) {
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
  if (!err) {
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

  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err)
  }
})

module.exports = router
