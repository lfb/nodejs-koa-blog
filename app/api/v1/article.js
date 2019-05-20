const Router = require('koa-router')

const {ArticleValidator, PositiveIdParamsValidator} = require('../../validators/article')
const {ArticleDao} = require('../../dao/article')
const {Auth} = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/article'
})

/**
 * 创建文章
 */
router.post('/create', new Auth().m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new ArticleValidator().validate(ctx);

    // 获取参数
    const article = {
        title: v.get('body.title'),
        author: v.get('body.author'),
        content: v.get('body.content'),
        cover: v.get('body.cover'),
        browse: v.get('body.browse'),
        category_id: v.get('body.category_id')
    }

    // 创建文章
    await ArticleDao.createArticle(article);

    // 返回结果
    ctx.status = 200
    ctx.body = {
        msg: '创建文章成功',
        errorCode: 0
    }
})

router.get('/list', async (ctx) => {

    // 查询文章列表
    const data = await ArticleDao.getArticleList();

    // 返回结果
    ctx.status = 200;
    ctx.body = {
        msg: 'success',
        errorCode: 0,
        data
    }
})

/**
 * 查询文章详情
 */
router.get('/detail/:id', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取文章ID参数
    const id = v.get('path.id');

    // 查询文章
    const data = await ArticleDao.getArticleDetail(id);

    // 返回结果
    ctx.status = 200;
    ctx.body = {
        msg: 'success',
        errorCode: 0,
        data
    }
})

module.exports = router
