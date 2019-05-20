const Router = require('koa-router')

const {
    CategoryValidator,
    PositiveKeyParamsValidator,
    PositiveIdParamsValidator
} = require('../../validators/category')

// 使用分类模型
const {CategoryDao} = require('../../dao/category')
const {Auth} = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/category'
})

/**
 * 创建分类
 */
router.post('/create', new Auth().m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new CategoryValidator().validate(ctx);

    await CategoryDao.createCategory(v);

    // 返回结果
    ctx.status = 200;
    ctx.body = {
        msg: '创建分类成功',
        errorCode: 0,
    }
})


/**
 * 删除文章
 */
router.delete('/delete/:id', new Auth().m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取分类ID参数
    const id = v.get('path.id');

    // 删除分类
    await CategoryDao.deleteCategory(id);

    ctx.body = {
        msg: '删除成功',
        errorCode: 0
    }

})


/**
 * 更新分类
 */
router.put('/update/:id', new Auth().m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取分类ID参数
    const id = v.get('path.id');

    // 更新分类
    await CategoryDao.updateCategory(id, v);

    ctx.body = {
        msg: '更新成功',
        errorCode: 0
    }

})

/**
 * 获取分类下关联的文章
 */
router.get('/list', async (ctx) => {

    // 获取分类下关联的文章
    const data = await CategoryDao.getCategoryList();

    // 返回结果
    ctx.status = 200;
    ctx.body = {
        msg: 'success',
        errorCode: 0,
        data
    }
})


/**
 * 查询分类名称下的所有关联文章
 */
router.get('/article/:id', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveKeyParamsValidator().validate(ctx);

    // 获取参数
    const id = v.get('path.id');

    // 查询
    const data = await CategoryDao.getArticle(id);

    // 返回结果
    ctx.status = 200;
    ctx.body = {
        msg: 'success',
        errorCode: 0,
        data
    }
})


module.exports = router
