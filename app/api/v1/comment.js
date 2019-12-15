const Router = require('koa-router')

const {CommentDao} = require('../../dao/comment')
const {CommentValidator, PositiveArticleIdParamsValidator} = require('../../validators/comment')
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
router.post('/comment', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new CommentValidator().validate(ctx);

  const r = await CommentDao.create(v);

  const data = {
    id: r.getDataValue('id'),
    nickname: r.getDataValue('nickname'),
    content: r.getDataValue('content'),
    target_id: r.getDataValue('target_id'),
    target_type: r.getDataValue('target_type'),
    created_at: r.getDataValue('created_at')
  };

  // 清除Redis
  const key = `${REDIS_KEY_PREFIX}_article_detail_${r.getDataValue('target_id')}`
  const apikey = `${REDIS_KEY_API_PREFIX}_article_detail_${r.getDataValue('target_id')}`
  setRedis(key, null, 0)
  setRedis(apikey, null, 0)

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(data);
})

// 删除评论
router.delete('/comment/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  await CommentDao.destroy(id);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('删除评论成功')
})

// 修改评论
router.put('/comment/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  await CommentDao.update(id, v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('更新评论成功')
})

// 获取评论列表
router.get('/comment', async (ctx) => {
  const page = ctx.query.page;
  let commentList = await CommentDao.list(page);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(commentList);

})

// 获取评论详情
router.get('/comment/:id', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveArticleIdParamsValidator().validate(ctx);

  // 获取分类ID参数
  const id = v.get('path.id');
  let comment = await CommentDao.detail(id)

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(comment);

})

// 获取关联目标下的评论列表
router.get('/comment/target/list', async (ctx) => {
  let comment = await CommentDao.targetComment(ctx.query)

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(comment);
})

module.exports = router
