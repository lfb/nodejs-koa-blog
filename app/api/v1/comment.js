const Router = require('koa-router')

const { CommentDao } = require('@dao/comment')
const { ReplyDao } = require('@dao/reply')
const { CommentValidator, PositiveArticleIdParamsValidator } = require('@validators/comment')
const { Auth } = require('@middlewares/auth');

const { Resolve } = require('@lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/api/v1'
})

// 创建评论
router.post('/comment', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new CommentValidator().validate(ctx);
  const [err, data] = await CommentDao.create(v);
  if (!err) {
    const resData = {
      id: data.id,
      content: data.content,
      status: data.status,
      article_id: data.article_id,
      user_id: data.user_id,
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
router.delete('/comment/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  const [err, data] = await CommentDao.destroy(id);
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('删除评论成功')
  } else {
    ctx.body = res.fail(err)
  }
})

// 修改评论
router.put('/comment/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  const [err, data] = await CommentDao.update(id, v);
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('更新评论成功')
  } else {
    ctx.body = res.fail(err)
  }

})

// 获取评论列表
router.get('/comment', async (ctx) => {
  let [err, data] = await CommentDao.list(ctx.query);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }
})

// 获取评论详情
router.get('/comment/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  const [err, data] = await CommentDao.detail(id, ctx.query)
  // 返回结果
  if (!err) {
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }
})

// 获取关联目标下的评论列表
router.get('/comment/target/list', async (ctx) => {
  const [err, data] = await CommentDao.targetComment(ctx.query)
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(data);
  } else {
    ctx.body = res.fail(err);
  }

})

module.exports = router
