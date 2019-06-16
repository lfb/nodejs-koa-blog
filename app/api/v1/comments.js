const Router = require('koa-router')

const {CommentsDao} = require('../../dao/comments')
const {CommentsValidator, PositiveArticleIdParamsValidator} = require('../../validators/comments')
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
    prefix: '/v1'
})

// 创建评论
router.post('/comments', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new CommentsValidator().validate(ctx);

    const r = await CommentsDao.createComments(v);

    const data = {
        id: r.getDataValue('id'),
        article_id: r.getDataValue('article_id'),
        parent_id: r.getDataValue('parent_id'),
        nickname: r.getDataValue('nickname'),
        content: r.getDataValue('content'),
        created_at: r.getDataValue('created_at')
    };

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(data);
})

// 删除评论
router.delete('/comments/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveArticleIdParamsValidator().validate(ctx);

    // 获取分类ID参数
    const id = v.get('path.id');
    await CommentsDao.destroyComments(id);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('删除评论成功')
})

// 修改评论
router.put('/comments/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveArticleIdParamsValidator().validate(ctx);

    // 获取分类ID参数
    const id = v.get('path.id');
    await CommentsDao.updateComments(id, v);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('更新评论成功')
})

// 获取评论列表
router.get('/comments', async (ctx) => {
    const page = ctx.query.page;
    let commentsList = await CommentsDao.getCommentsList(page);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(commentsList);

})

// 获取评论详情
router.get('/comments/:id', async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveArticleIdParamsValidator().validate(ctx);

    // 获取分类ID参数
    const id = v.get('path.id');
    let comments = await CommentsDao.getComments(id)

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(comments);

})

// 获取文章下的评论
router.get('/article/:article_id/comments', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveArticleIdParamsValidator().validate(ctx);

    // 获取分类ID参数
    const article_id = v.get('path.article_id');
    // 页面, 排序
    const {page, desc} = ctx.query;
    const commentsList = await CommentsDao.getArticleComments(article_id, page, desc);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(commentsList);
})


module.exports = router