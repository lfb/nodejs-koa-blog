const Router = require('koa-router')

const {RegisterValidator} = require('../../validators/user')
const {User} = require('../../models/user')
const {handleResult} = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/user'
})

// 用户注册
router.post('/register', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new RegisterValidator().validate(ctx)

    // 获取用户注册的参数
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }

    // 创建用户
    await User.create(user)

    // 处理成功方法
    handleResult('注册成功')
})

module.exports = router
