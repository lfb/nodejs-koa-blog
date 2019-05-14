const Router = require('koa-router')

const {ArticleValidator, PositiveIdParamsValidator} = require('../../validators/article')
const {Article} = require('../../models/article')
const {Category} = require('../../models/category')
const {handleResult} = require('../../lib/helper')

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

    // 处理成功方法
    handleResult('创建文章成功')
})

router.get('/list', async (ctx) => {

    // 通过文章模型查询
    const result = await Article.findAll({
        // 过滤文章内容
        attributes: {
            exclude: ['content']
        }
    })

    // 处理成功方法
    if (result) {
        handleResult(result)
    } else {
        handleResult("文章列表为空")
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
    const result = await Article.findOne({
        where: {
            id
        },
        // 把文章关联的分类也查询出来
        include: [{
            model: Category
        }]
    })

    // 返回查询得到的结果
    if (result) {
        handleResult(result)

    } else {
        handleResult("文章不存在", 10001)
    }
})

module.exports = router
