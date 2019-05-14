const Router = require('koa-router')

const {CategoryValidator, PositiveKeyParamsValidator} = require('../../validators/category')
const {Article} = require('../../models/article')
const {Category} = require('../../models/category')
const {handleResult} = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/category'
})

// 创建分类
router.post('/create', async (ctx) => {
    const v = await new CategoryValidator().validate(ctx)
    const category = {
        name: v.get('body.name'),
        key: v.get('body.key')
    }
    const r = await Category.create(category)

    handleResult('创建分类成功')
})

// 查询分类 ID 下的文章
router.get('/:key/article', async (ctx) => {
    const v = await new PositiveKeyParamsValidator().validate(ctx)
    const key = v.get('path.key')
    const r = await Category.findAll({
        where: {
            key
        },
        include: [{
            model: Article,
            include: [{
                model: Category
            }]
        }]
    })

    if (r) {
        handleResult(r)

    } else {
        handleResult("分类文章不存在", 10001)
    }
})

module.exports = router
