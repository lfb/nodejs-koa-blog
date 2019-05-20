const Router = require('koa-router')

const {
    TokenNotEmptyValidator
} = require('../../validators/token')
const {Auth} = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/token'
})

// 验证token
router.post('/verify', async (ctx) => {
    // 验证必须带token参数
    const v = await new TokenNotEmptyValidator().validate(ctx);

    // 验证结果
    const result = Auth.verifyToken(v.get('body.token'));

    ctx.status = 200
    ctx.body = result
})

module.exports = router
