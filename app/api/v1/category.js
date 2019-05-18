const Router = require('koa-router')

const {CategoryValidator, PositiveKeyParamsValidator} = require('../../validators/category')

// 使用分类模型
const {Category} = require('../../models/category')
const {Auth} = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/category'
})

/**
 * 创建分类
 */
router.post('/create', new Auth().m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new CategoryValidator().validate(ctx)

    // 获取参数
    const category = {
        name: v.get('body.name'),
        key: v.get('body.key'),
        parent_id: v.get('body.parent_id')
    }

    // 创建分类
    await Category.createCategory(category)

    // 返回结果
    ctx.status = 200
    ctx.body = {
        msg: '创建分类成功',
        errorCode: 0,
    }
})

/**
 * 获取分类下关联的文章
 */
router.get('/list', async (ctx) => {

    // 获取分类下关联的文章
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

    // 获取参数
    const key = v.get('path.key')

    // 查询
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
