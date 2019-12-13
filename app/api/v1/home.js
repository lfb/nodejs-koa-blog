/**
 * @description 前端项目模板渲染处理页
 * @author 梁凤波
 */

const Router = require('koa-router');
const marked = require('marked');

const {PositiveIdParamsValidator} = require('../../validators/article');
const {CommentValidator} = require('../../validators/comment')

const {ArticleDao} = require('../../dao/article');
const {CategoryDao} = require('../../dao/category');
const {CommentDao} = require('../../dao/comment');

const {getRedis, setRedis} = require('../../cache/_redis')
// redis key 前缀
const KEY_PREFIX = 'boblog'

const router = new Router()

/**
 * 首页 - 文章列表页
 */
router.get('/', async (ctx) => {
  // 尝试获文章取缓存
  const {category_id = 0, page = 1} = ctx.query;
  const key = `${KEY_PREFIX}_article_list_category_id${category_id}_page${page}`
  const cacheArticleData = await getRedis(key)
  if (cacheArticleData) {
    await ctx.render('article-list', cacheArticleData)

  } else {
    // 没有缓存，则读取数据库
    const articleList = await ArticleDao.list(ctx.query);
    // 获取所有的分类
    const categoryList = await CategoryDao.list();
    ctx.response.status = 200;
    ctx.response.set('Content-Type', 'text/html; charset=utf-8')
    ctx.response.set('Cache-Control', 'max-age=60, s-maxage=90')
    const data = {
      article: articleList,
      category: categoryList
    }

    // 设置缓存，过期时间 1min
    setRedis(key, data, 60)
    await ctx.render('article-list', data)
  }
})

/**
 * 文章详情页面
 */
router.get('/article/detail/:id', async (ctx) => {
  // 尝试获文章取缓存
  const key = `${KEY_PREFIX}_article_detail_${ctx.params.id}`
  const cacheArticleDetail = await getRedis(key)
  if (cacheArticleDetail) {
    await ctx.render('article-detail', cacheArticleDetail)
  } else {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取文章ID参数
    const id = v.get('path.id');
    // 查询文章
    const article = await ArticleDao.detail(id);
    // 获取关联此文章的评论列表
    const commentList = await CommentDao.targetComment({
      target_id: id,
      target_type: 'article'
    });
    // 更新文章浏览
    await ArticleDao.updateBrowse(id, ++article.browse);
    const content = marked(article.content.toString());

    const data = {
      article,
      content,
      commentList
    }
    /**
     * 设置缓存，过期时间 1min
     */
    setRedis(key, data, 60)
    ctx.response.status = 200;
    ctx.response.set('Content-Type', 'text/html; charset=utf-8')
    ctx.response.set('Cache-Control', 'max-age=60, s-maxage=90')
    // 返回结果
    await ctx.render('article-detail', data)
  }
})

// 创建评论
router.post('/comment', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new CommentValidator().validate(ctx);
  await CommentDao.create(v);
  const id = v.get('body.target_id')
  // 查询文章
  const article = await ArticleDao.detail(id);
  // 获取关联此文章的评论列表
  const commentList = await CommentDao.targetComment({
    target_id: id,
    target_type: 'article'
  });
  const content = marked(article.content.toString());
  /**
   * 设置缓存，过期时间 1min
   */
  const data = {
    article,
    content,
    commentList
  }
  const key = `${KEY_PREFIX}_article_detail_${ctx.params.id}`
  setRedis(key, data, 60)
  ctx.response.status = 200;
  ctx.response.set('Content-Type', 'text/html; charset=utf-8')
  ctx.response.set('Cache-Control', 'max-age=60, s-maxage=90')
  await ctx.render('article-detail', data)
})

/**
 * 关于页
 */
router.get('/about', async ctx => {
  ctx.response.status = 200;
  ctx.response.set('Content-Type', 'text/html; charset=utf-8')
  ctx.response.set('Cache-Control', 'max-age=3600, s-maxage=36000')
  await ctx.render('about')
})

// 404 页面
router.get('*', async ctx => {
  ctx.response.status = 200;
  ctx.response.set('Content-Type', 'text/html; charset=utf-8')
  ctx.response.set('Cache-Control', 'max-age=3600, s-maxage=36000')
  await ctx.render('404')
})

module.exports = router
