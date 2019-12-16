/**
 * @description 处理前端网站 ejs 模板渲染
 * @author 梁凤波
 */

const Router = require('koa-router')
const marked = require('marked')

const {ReplyDao} = require('../../dao/reply')
const {ArticleDao} = require('../../dao/article')
const {CategoryDao} = require('../../dao/category')
const {CommentDao} = require('../../dao/comment')
const {AdvertiseDao} = require('../../dao/advertise')

const {PositiveIdParamsValidator} = require('../../validators/article')
const {CommentValidator} = require('../../validators/comment')
const {ReplyValidator} = require('../../validators/reply')

const {getRedis, setRedis} = require('../../cache/_redis')
const REDIS_KEY_PREFIX = 'boblog'

const router = new Router()

/**
 * 首页 - 文章列表页
 */
router.get('/', async (ctx) => {
  // 获取参数
  const {category_id = 0, page = 1, keyword} = ctx.query
  // 设置 Redis 的 key
  let key = `${REDIS_KEY_PREFIX}_article_list_category_id${category_id}_page${page}`
  if (keyword) {
    key += 'keyword'
  }

  // 读取 Redis 中的数据
  const cacheArticleData = await getRedis(key)
  if (cacheArticleData && !keyword) {
    ctx.response.status = 304;
    // await ctx.render('article-list', cacheArticleData)

  } else {
    console.log('进入查询数据库数据')
    // 如果没有缓存数据，则读取数据库
    // 文章
    const article = await ArticleDao.list(ctx.query)
    // 分类
    const category = await CategoryDao.list()
    // 广告
    const advertise = await AdvertiseDao.list()

    // 合并数据
    const data = {article, category, advertise: advertise.data}

    // 设置缓存，过期时间 1min
    setRedis(key, data, 60)
    // 响应返回页面
    ctx.response.status = 200
    ctx.response.set('Content-Type', 'text/html charset=utf-8')
    ctx.response.set('Cache-Control', 'max-age=60, s-maxage=90')
    const LAST_MODIFIED_TIME = '123'
    ctx.response.set('Last-Modified', LAST_MODIFIED_TIME)
    await ctx.render('article-list', data)
  }
})


/**
 * 文章详情页面
 */
router.get('/article/detail/:id', async (ctx) => {
  // 尝试获文章取缓存
  const key = `${REDIS_KEY_PREFIX}_article_detail_${ctx.params.id}`
  // 获取参数
  const cacheArticleDetail = await getRedis(key)
  if (cacheArticleDetail) {
    console.log('读缓存详情数据')
    ctx.response.status = 304;

  } else {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx)
    // 获取文章ID参数
    const id = v.get('path.id')
    // 查询文章
    const article = await ArticleDao.detail(id)
    // 分类
    const category = await CategoryDao.list()
    // 广告
    const advertise = await AdvertiseDao.list()
    // 获取关联此文章的评论列表
    const commentList = await CommentDao.AllTargetComment({
      target_id: id,
      target_type: 'article'
    })

    // 更新文章浏览
    await ArticleDao.updateBrowse(id, ++article.browse)
    // 通过 marked 工具解析 markdown 语法
    const content = marked(article.content.toString())

    // 合并数据
    const data = {article, content, category, advertise: advertise.data, commentList}

    // 设置 Redis 缓存，过期时间1分钟
    setRedis(key, data, 60)

    // 响应返回页面
    ctx.response.status = 304;
    ctx.response.set('Content-Type', 'text/html charset=utf-8')
    // 返回结果
    await ctx.render('article-detail', data)
  }
})

// 创建评论
router.post('/comment', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new CommentValidator().validate(ctx)
  // 创建评论
  await CommentDao.create(v)
  // 获取评论目标id和评论类型
  const targetId = v.get('body.target_id')
  const targetType = v.get('body.target_type')
  // 查询文章
  const article = await ArticleDao.detail(targetId)
  // 获取关联此文章的评论列表
  const commentList = await CommentDao.targetComment({
    target_id: targetId,
    target_type: targetType
  })
  // 通过 marked 工具解析 markdown 语法
  const content = marked(article.content.toString())

  // 分类
  const category = await CategoryDao.list()
  // 广告
  const advertise = await AdvertiseDao.list()

  // 合并数据
  const data = {article, content, category, advertise: advertise.data, commentList}
  // 设置 Redis 缓存，过期时间1分钟
  const key = `${REDIS_KEY_PREFIX}_article_detail_${ctx.params.id}`
  setRedis(key, data, 60)

  // 响应页面
  ctx.response.status = 200
  ctx.response.set('Content-Type', 'text/html charset=utf-8')
  await ctx.render('article-detail', data)
})

// 创建评论
router.post('/reply', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new ReplyValidator().validate(ctx);
  // 创建回复
  await ReplyDao.create(v);

  // 获取评论目标id和评论类型
  const targetId = v.get('body.target_id')
  const targetType = v.get('body.target_type')
  // 查询文章
  const article = await ArticleDao.detail(targetId)
  // 获取关联此文章的评论列表
  const commentList = await CommentDao.targetComment({
    target_id: targetId,
    target_type: targetType
  })
  // 通过 marked 工具解析 markdown 语法
  const content = marked(article.content.toString())

  // 分类
  const category = await CategoryDao.list()
  // 广告
  const advertise = await AdvertiseDao.list()

  // 合并数据
  const data = {article, content, category, advertise: advertise.data, commentList}
  // 设置 Redis 缓存，过期时间1分钟
  const key = `${REDIS_KEY_PREFIX}_article_detail_${targetId}`
  setRedis(key, data, 60)

  // 响应页面
  ctx.response.status = 200
  ctx.response.set('Content-Type', 'text/html charset=utf-8')
  await ctx.render('article-detail', data)
})

/**
 * 关于页
 */
router.get('/about', async ctx => {
  ctx.response.status = 200
  ctx.response.set('Content-Type', 'text/html charset=utf-8')
  await ctx.render('about')
})

// 404 页面
router.get('*', async ctx => {
  ctx.response.status = 200
  ctx.response.set('Content-Type', 'text/html charset=utf-8')
  await ctx.render('404')
})

module.exports = router
