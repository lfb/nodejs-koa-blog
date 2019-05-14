const Router = require('koa-router')

const {CategoryValidator, PositiveKeyParamsValidator} = require('../../validators/category')
const {Article} = require('../../models/article')
const {Category} = require('../../models/category')
const {handleResult} = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/category'
})

/**
 * 创建分类
 */
router.post('/create', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new CategoryValidator().validate(ctx)

    // 获取创建分类的参数
    const category = {
        name: v.get('body.name'),
        key: v.get('body.key'),
        parent_id: v.get('body.parent_id')
    }

    // 通过分类模型创建文章
    await Category.create(category)

    // 处理成功方法
    handleResult('创建分类成功')
})

/**
 * 获取分类列表：包括每个分类下的文章
 */
router.get('/list', async (ctx) => {

    // 通过分类模型查询文章
    const result = await Category.findAndCountAll({
        include: [{
            model: Article,
            // 过滤文章的字段，只返回文章的id和标题即可
            attributes: {
                exclude: [
                    'author',
                    'content',
                    'cover',
                    'browse',
                    'create_at',
                    'update_at',
                    'delete_at',
                    'category_id',
                    'CategoryId'
                ]
            }
        }]

    })

    // 处理成功方法
    handleResult(result)
})

/**
 * 查询分类名称下的所有关联文章
 */
router.get('/:key/article', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveKeyParamsValidator().validate(ctx)

    // 获取分类名称
    const key = v.get('path.key')

    // 通过分类模型查询
    const result = await Category.findAll({
        where: {
            key
        },
        include: [{
            model: Article,
            include: [{
                model: Category
            }],
            // 过滤文章内容
            attributes: {
                exclude: ['content']
            }
        }]
    })

    // 处理成功方法
    if (result) {
        handleResult(result)

    } else {
        handleResult("分类文章不存在", 10001)
    }
})

module.exports = router
