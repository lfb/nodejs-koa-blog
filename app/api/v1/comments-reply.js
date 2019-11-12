const Router = require('koa-router')

const {CommentReplyDao} = require('../../dao/comment-reply')
const {CommentsReplyValidator, PositiveArticleIdParamsValidator} = require('../../validators/comments-reply')
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

// 创建评论
router.post('/comments-reply', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new CommentsReplyValidator().validate(ctx);
  // 创建回复
  const r = await CommentReplyDao.createCommentReply(v.get('body.comment_id'), v.get('body.reply_id'));
  const data = {
    comment_id: r.getDataValue('comment_id'),
    reply_id: r.getDataValue('reply_id')
  };

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(data);
})

// 删除评论
router.delete('/comments-reply/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  await CommentReplyDao.destroyReply(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('删除回复评论成功')
})

// 修改评论
router.put('/comments-reply/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  await CommentReplyDao.updateReply(id, v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('更新评论成功')
})

// 获取评论列表
router.get('/reply', async (ctx) => {
  const page = ctx.query.page;
  let CommentReplyList = await ReplyDao.getCommentReply(page);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(CommentReplyList);

})

// 获取评论详情
router.get('/comments-reply/:id', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  let commentReply = await ReplyDao.getReply(id)

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(commentReply);

})

module.exports = router
