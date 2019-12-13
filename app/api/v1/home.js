const Router = require('koa-router');
const marked = require('marked');
const path = require('path');
const fs = require('fs-extra');
const mime = require('mime');

const responseFile = async (path, context, encoding) => {
  const fileContent = await fs.readFile(path, encoding);
  context.type = mime.getType(path);
  context.body = fileContent;
};

const {PositiveIdParamsValidator} = require('../../validators/article');
const {CommentValidator} = require('../../validators/comment')

const {ArticleDao} = require('../../dao/article');
const {CategoryDao} = require('../../dao/category');
const {CommentDao} = require('../../dao/comment');

const router = new Router()

const LAST_MODIFIED_TIME = '123'

/**
 * 首页 - 文章列表页
 */
router.get('/', async (ctx) => {
  // 返回结果
  // const ifNoneMatch = ctx.request.header['if-modified-since']
  // if (ifNoneMatch === LAST_MODIFIED_TIME) {
  //   ctx.response.status = 304;
  //
  // } else {
  // 查询文章列表
  const articleList = await ArticleDao.list(ctx.query);
  // 获取所有的分类
  const categoryList = await CategoryDao.list();

  ctx.response.status = 200;
  ctx.response.set('Content-Type', 'text/html; charset=utf-8')
  // ctx.response.set('Cache-Control', 'max-age=60, s-maxage=90')
  // ctx.response.set('Last-Modified', LAST_MODIFIED_TIME)

  await ctx.render('article-list', {
    article: articleList,
    category: categoryList
  })
  // }
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
  const content = marked(article.content.toString());
  // 返回结果
  ctx.response.status = 200;
  await ctx.render('article-detail', {
    article,
    content,
    commentList
  })
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
  // 返回结果
  ctx.response.status = 200;
  await ctx.render('article-detail', {
    article,
    content,
    commentList
  })
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
