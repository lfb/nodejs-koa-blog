const Router = require('koa-router')

const {CommentReplyDao} = require('../../dao/comment-reply')
const {CommentReplyValidator, PositiveArticleIdParamsValidator} = require('../../validators/comment-reply')
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

// 创建评论
router.post('/comment-reply', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new CommentReplyValidator().validate(ctx);
  // 创建回复
  const params = {
    comment_id: v.get('body.comment_id'),
    reply_id:  v.get('body.reply_id')
  }
  const r = await CommentReplyDao.create(params);
  const data = {
    comment_id: r.getDataValue('comment_id'),
    reply_id: r.getDataValue('reply_id')
  };

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(data);
})

// 删除评论
router.delete('/comment-reply/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  await CommentReplyDao.destroy(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('删除回复评论成功')
})

// 修改评论
router.put('/comment-reply/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  await CommentReplyDao.update(id, v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('更新评论成功')
})

// 获取评论列表
router.get('/reply', async (ctx) => {
  const page = ctx.query.page;
  let CommentReplyList = await CommentReplyDao.list(page);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(CommentReplyList);

})

// 获取评论详情
router.get('/comment-reply/:id', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  let commentReply = await CommentReplyDao.detail(id)

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(commentReply);

})

module.exports = router
