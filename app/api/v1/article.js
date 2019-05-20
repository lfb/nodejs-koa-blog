const Router = require('koa-router')

const {
    ArticleValidator,
    PositiveIdParamsValidator,
    ArticleSearchValidator
} = require('../../validators/article')

const {ArticleDao} = require('../../dao/article')
const {Auth} = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1'
})

/**
 * 创建文章
 */
router.post('/article', new Auth().m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new ArticleValidator().validate(ctx);
    // 创建文章
    await ArticleDao.createArticle(v);

    // 返回结果
    ctx.status = 200
    ctx.body = {
        msg: '创建文章成功',
        errorCode: 0
    }
})


/**
 * 删除文章
 */
router.delete('/article/:id', new Auth().m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取文章ID参数
    const id = v.get('path.id');

    // 删除文章
    await ArticleDao.deleteArticle(id);

    ctx.body = {
        msg: '删除成功',
        errorCode: 0
    }

})

/**
 * 更新文章
 */
router.put('/article/:id', new Auth().m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取文章ID参数
    const id = v.get('path.id');

    // 更新文章
    await ArticleDao.updateArticle(id, v);

    ctx.body = {
        msg: '更新成功',
        errorCode: 0
    }
})


/**
 * 获取文章列表
 */
router.get('/article', async (ctx) => {

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
router.get('/article/:id', async (ctx) => {

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

/**
 * 搜索文章
 */
router.get('/article/search', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new ArticleSearchValidator().validate(ctx);

    // 获取文章ID参数
    const keyword = v.get('query.keyword');

    // 查询文章
    const data = await ArticleDao.getArticleByKeyword(keyword);

    // 返回结果
    ctx.status = 200;
    ctx.body = {
        msg: '查询成功',
        errorCode: 0,
        data
    }
})

module.exports = router
