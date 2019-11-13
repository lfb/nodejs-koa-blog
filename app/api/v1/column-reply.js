const Router = require('koa-router')

const {ColumnReplyDao} = require('../../dao/column-reply')
const {ColumnCommentReplyDao} = require('../../dao/column-comment-reply')
const {ColumnReplyValidator, PositiveArticleIdParamsValidator} = require('../../validators/column-reply')
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

// 创建评论
router.post('/column/reply', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new ColumnReplyValidator().validate(ctx);
  // 创建回复
  const r = await ColumnReplyDao.create(v);

  // 创建评论回复表
  await ColumnCommentReplyDao.create({
    column_comment_id: v.get('body.column_comment_id'),
    column_reply_id: r.getDataValue('id')
  })

  const data = {
    id: r.getDataValue('id'),
    nickname: r.getDataValue('nickname'),
    content: r.getDataValue('content'),
    created_at: r.getDataValue('created_at'),
    comment_id: r.getDataValue('comment_id')
  };

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(data);
})

// 删除评论
router.delete('/column/reply/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  await ColumnReplyDao.destroy(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('删除回复评论成功')
})

// 修改评论
router.put('/column/reply/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  await ColumnReplyDao.update(id, v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('更新评论成功')
})

// 获取评论列表
router.get('/column/reply', async (ctx) => {
  const page = ctx.query.page;
  let replyList = await ColumnReplyDao.list(page);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(replyList);

})

// 获取评论详情
router.get('/column/reply/:id', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  let reply = await ColumnReplyDao.detail(id)

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(reply);

})

module.exports = router
