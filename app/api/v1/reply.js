const Router = require('koa-router')

const {ReplyDao} = require('../../dao/reply')
const {ReplyValidator, PositiveArticleIdParamsValidator} = require('../../validators/reply')
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const {setRedis} = require('../../cache/_redis')
const REDIS_KEY_PREFIX = 'boblog'
const REDIS_KEY_API_PREFIX = 'boblog_api'

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
    nickname: r.getDataValue('nickname'),
    content: r.getDataValue('content'),
    created_at: r.getDataValue('created_at'),
    comment_id: r.getDataValue('comment_id')
  };

  // 清除Redis
  const key = `${REDIS_KEY_PREFIX}_article_detail_${v.get('body.target_id')}`
  const apikey = `${REDIS_KEY_API_PREFIX}_article_detail_${v.get('body.target_id')}`
  setRedis(key, null, 0)
  setRedis(apikey, null, 0)

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
  await ReplyDao.destroy(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('删除回复评论成功')
})

// 修改评论
router.put('/reply/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  await ReplyDao.update(id, v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('更新评论成功')
})

// 获取评论列表
router.get('/reply', async (ctx) => {
  const comment_id = ctx.query.comment_id
  let replyList = await ReplyDao.list(comment_id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(replyList);

})

// 获取评论详情
router.get('/reply/:id', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  let reply = await ReplyDao.detail(id)

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(reply);

})

module.exports = router
