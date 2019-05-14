const Router = require('koa-router')

const {ArticleValidator, PositiveIdParamsValidator} = require('../../validators/article')
const {Article} = require('../../models/article')
const {Category} = require('../../models/category')
const {handleResult} = require('../../lib/helper')
const {
    Sequelize
} = require('sequelize')

const router = new Router({
    prefix: '/v1/article'
})

// 创建文章
router.post('/create', async (ctx) => {
    const v = await new ArticleValidator().validate(ctx)
    const article = {
        title: v.get('body.title'),
        author: v.get('body.author'),
        content: v.get('body.content'),
        cover: v.get('body.cover'),
        browse: v.get('body.browse'),
        category_id: v.get('body.category_id')
    }

    const r = await Article.create(article)

    handleResult('创建文章成功')
})

// 查询文章详情
router.get('/detail/:id', async (ctx) => {
    const v = await new PositiveIdParamsValidator().validate(ctx)
    const id = v.get('path.id')
    const r = await Article.findOne({
        where: {
            id
        },
        include: [{
            model: Category
        }]
    })

    if (r) {
        handleResult(r)

    } else {
        handleResult("文章不存在", 10001)
    }
})

module.exports = router
