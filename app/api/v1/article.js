const Router = require('koa-router')

const { ArticleValidator, PositiveIdParamsValidator } = require('@validators/article')

const { Auth } = require('@middlewares/auth')
const { ArticleDao } = require('@dao/article')
const { CommentDao } = require('@dao/comment')

const { Resolve } = require('@lib/helper')

const res = new Resolve()

const AUTH_ADMIN = 16

const router = new Router({
    prefix: '/api/v1'
})

/**
 * 创建文章
 */
router.post('/article', new Auth(AUTH_ADMIN).m, async ctx => {
    // 通过验证器校验参数是否通过
    const v = await new ArticleValidator().validate(ctx)

    // 创建文章
    const [err, data] = await ArticleDao.create(v)
    if (!err) {
        // 返回结果
        ctx.response.status = 200
        ctx.body = res.success('创建文章成功')
    } else {
        ctx.body = res.fail(err)
    }
})

/**
 * 删除文章
 */
router.delete('/article/:id', new Auth(AUTH_ADMIN).m, async ctx => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx)

    // 获取文章ID参数
    const id = v.get('path.id')
    // 删除文章
    const [err, data] = await ArticleDao.destroy(id)
    if (!err) {
        ctx.response.status = 200
        ctx.body = res.success('删除文章成功')
    } else {
        ctx.body = res.fail(err)
    }
})

/**
 * 更新文章
 */
router.put('/article/:id', new Auth(AUTH_ADMIN).m, async ctx => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx)

    // 获取文章ID参数
    const id = v.get('path.id')
    // 更新文章
    const [err, data] = await ArticleDao.update(id, v)
    if (!err) {
        ctx.response.status = 200
        ctx.body = res.success('更新文章成功')
    } else {
        ctx.body = res.fail(err)
    }
})

/**
 * 获取文章列表
 */
router.get('/article', async ctx => {
    // 尝试获文章取缓存
    const { category_id = 0, page = 1, is_year_group = 0 } = ctx.query

    let err = null
    let data = null

    // 如果是按照年份
    if (is_year_group) {
        ;[err, data] = await ArticleDao.listGroup(ctx.query)
    } else {
        ;[err, data] = await ArticleDao.list(ctx.query)
    }

    // is_year_group：按年分组
    if (!err) {
        ctx.response.status = 200
        ctx.body = res.json(data)
    } else {
        ctx.body = res.fail(err)
    }
})

/**
 * 查询文章详情
 */
router.get('/article/:id', async ctx => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx)
    // 获取文章ID参数
    const id = v.get('path.id')

    // 查询文章
    const [err, data] = await ArticleDao.detail(id, ctx.query)
    if (!err) {
        // 只是获取seo信息的
        const isMeta = ctx.query.is_meta
        if (!isMeta) {
            // 获取关联此文章的评论列表
            const [commentError, commentData] = await CommentDao.targetComment({
                article_id: id
            })
            if (!commentError) {
                data.article_comment = commentData
            }
        }

        // 返回结果
        ctx.response.status = 200
        ctx.body = res.json(data)
    } else {
        ctx.body = res.fail(err)
    }
})

module.exports = router
