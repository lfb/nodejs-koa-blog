const Router = require('koa-router');

const {
    ArticleValidator,
    PositiveIdParamsValidator,
    ArticleSearchValidator
} = require('../../validators/article');

const {Auth} = require('../../../middlewares/auth');
const {ArticleDao} = require('../../dao/article');
const {CategoryDao} = require('../../dao/category');
const {CommentsDao} = require('../../dao/comments');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
    prefix: '/v1'
})

/**
 * 创建文章
 */
router.post('/article', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new ArticleValidator().validate(ctx);

    // 创建文章
    await ArticleDao.createArticle(v);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('创建文章成功');
});

/**
 * 删除文章
 */
router.delete('/article/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取文章ID参数
    const id = v.get('path.id');
    // 删除文章
    await ArticleDao.destroyArticle(id);

    ctx.response.status = 200;
    ctx.body = res.success('删除文章成功');
})

/**
 * 更新文章
 */
router.put('/article/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取文章ID参数
    const id = v.get('path.id');
    // 更新文章
    await ArticleDao.updateArticle(id, v);

    ctx.response.status = 200;
    ctx.body = res.success('更新文章成功');
})


/**
 * 获取文章列表
 */
router.get('/article', async (ctx) => {
    // 获取页码，排序方法，分类ID，搜索关键字
    const {page, desc, category_id, keyword} = ctx.query;
    // 查询文章列表
    const articleList = await ArticleDao.getArticleList(page, desc, category_id, keyword);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(articleList);
});

/**
 * 查询文章详情
 */
router.get('/article/:id', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取文章ID参数
    const id = v.get('path.id');
    // 查询文章
    const article = await ArticleDao.getArticleDetail(id);

    // 获取关联此文章的分类详情
    const category = await CategoryDao.getCategory(article.getDataValue('category_id'));
    // 获取关联此文章的评论列表
    const commentsList = await CommentsDao.getArticleComments(id);

    // 更新文章浏览
    await ArticleDao.updateArticleBrowse(id, ++article.browse);

    await article.setDataValue('category_detail', category);
    await article.setDataValue('comments_list', commentsList);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(article);

})


/**
 * 搜索文章
 */
router.get('/search/article', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new ArticleSearchValidator().validate(ctx);

    // 获取查询文章关键字
    const keyword = v.get('query.keyword');
    // 页码
    const page = v.get('query.page');
    // 排序
    const desc = v.get('query.desc');

    // 查询文章
    const article = await ArticleDao.getArticleByKeyword(keyword, page, desc);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(article);

})

module.exports = router
