const Router = require('koa-router')

const {RegisterValidator} = require('../../validators/user')

const {UserDao} = require('../../dao/user')

const router = new Router({
    prefix: '/v1/user'
})

// 用户注册
router.post('/register', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new RegisterValidator().validate(ctx);

    // 获取参数
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }

    // 创建用户
    await UserDao.createUser(user);

    // 返回结果
    ctx.status = 200;
    ctx.body = {
        msg: '注册成功',
        errorCode: 0
    }
})

module.exports = router
