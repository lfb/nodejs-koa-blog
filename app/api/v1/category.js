const Router = require('koa-router')

const {CategoryValidator, PositiveKeyParamsValidator} = require('../../validators/category')

// 使用分类模型
const {CategoryModelUsage} = require('../../usages/category')
const Category = new CategoryModelUsage()

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

    // 创建分类
    await Category.create(category)

    // 返回结果
    ctx.status = 200
    ctx.body = {
        msg: '创建分类成功',
        errorCode: 0,
    }
})

/**
 * 获取分类列表：包括每个分类下的文章
 */
router.get('/list', async (ctx) => {

    // 通过分类模型查询文章
    const data = await Category.list()

    // 返回结果
    ctx.status = 200
    ctx.body = {
        msg: 'success',
        errorCode: 0,
        data
    }
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
    const data = await Category.article(key)

    // 返回结果
    ctx.status = 200
    ctx.body = {
        msg: 'success',
        errorCode: 0,
        data
    }
})

module.exports = router
