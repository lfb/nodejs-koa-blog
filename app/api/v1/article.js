const Router = require('koa-router')

const {ArticleValidator, PositiveIdParamsValidator} = require('../../validators/article')

// 使用文章模型
const {ArticleModelUsage} = require('../../usage/article')
const Article = new ArticleModelUsage()

const router = new Router({
    prefix: '/v1/article'
})

/**
 * 创建文章
 */
router.post('/create', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new ArticleValidator().validate(ctx)

    // 获取创建文章的参数
    const article = {
        title: v.get('body.title'),
        author: v.get('body.author'),
        content: v.get('body.content'),
        cover: v.get('body.cover'),
        browse: v.get('body.browse'),
        category_id: v.get('body.category_id')
    }

    // 通过文章模型创建文章
    await Article.create(article)

    // 返回结果
    ctx.status = 200
    ctx.body = {
        msg: '创建文章成功',
        errorCode: 0
    }
})

router.get('/list', async (ctx) => {

    // 通过文章模型查询
    const data = await Article.list()

    // 返回结果
    ctx.status = 200
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
    const v = await new PositiveIdParamsValidator().validate(ctx)

    // 获取文章ID参数
    const id = v.get('path.id')

    // 查询文章
    const data = await Article.detail(id)

    // 返回结果
    ctx.status = 200
    ctx.body = {
        msg: 'success',
        errorCode: 0,
        data
    }
})

module.exports = router
