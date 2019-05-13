const Router = require('koa-router')

const {ArticleValidator} = require('../../validators/article')
const {Article} = require('../../models/article')
const {success} = require('../../lib/helper')

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
        browse: v.get('body.browse')
    }

    const r = await Article.create(article)

    success('创建成功')
})

module.exports = router
