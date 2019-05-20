const Router = require('koa-router')

const {LoginType} = require('../../lib/enum')
const {UserDao} = require('../../dao/user')
const {Auth} = require('../../../middlewares/auth')
const {generateToken} = require('../../../core/util')
const {WXManager} = require('../../service/wx')
const {TokenValidator, NotEmptyValidator} = require('../../validators/token')

const router = new Router({
    prefix: '/v1/token'
})

// 获取token
router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx);
    let token;
    switch (v.get('body.type')) {
        // 用户邮箱登录
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'));
            break;

        // 管理员登录
        case LoginType.ADMIN_EMAIL:
            break;

        // 小程序登录
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'));
            break;
            
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')

    }
    ctx.body = {
        token
    }
})

// 验证token
router.post('/verify', async (ctx) => {
    // 验证必须带token参数
    const v = await new NotEmptyValidator().validate(ctx);

    // 验证结果
    const result = Auth.verifyToken(v.get('body.token'));
    ctx.status = 200
    ctx.body = {
        msg: 'success',
        result,
        errorCode: 0
    }
})

// 邮箱登录
async function emailLogin(account, secret) {
    // 验证账号密码是否正确
    const user = await UserDao.verifyEmailPassword(account, secret);

    // 发布令牌
    return generateToken(user.id, Auth.USER)
}

module.exports = router
