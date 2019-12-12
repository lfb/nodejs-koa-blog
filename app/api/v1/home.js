const Router = require('koa-router');
const marked = require('marked');

const {PositiveIdParamsValidator} = require('../../validators/article');

const {ArticleDao} = require('../../dao/article');
const {CategoryDao} = require('../../dao/category');
const {CommentDao} = require('../../dao/comment');

const router = new Router()
/**
 * 首页 - 文章列表页
 */
router.get('/', async (ctx) => {
  // 查询文章列表
  const articleList = await ArticleDao.list(ctx.query);
  // 获取所有的分类
  const categoryList = await CategoryDao.list();

  // 返回结果
  ctx.response.status = 200;
  await ctx.render('article-list', {
    article: articleList,
    category: categoryList
  })
})

/**
 * 文章详情页面
 */
router.get('/article/detail/:id', async (ctx) => {
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
  await article.setDataValue('article_comment', commentList);
  const content = marked(article.content.toString());
  // 返回结果
  ctx.response.status = 200;
  await ctx.render('article-detail', {
    article: article,
    content
  });
})

/**
 * 关于页
 */
router.get('/about', async (ctx, next) => {
  await ctx.render('about')
})

// 404 页面
router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router
