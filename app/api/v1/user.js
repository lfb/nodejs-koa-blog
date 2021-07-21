/**
 * @description 用户的路由 API 接口
 * @author 梁凤波, Peter Liang
 */

const Router = require('koa-router')

const {
    RegisterValidator,
    UserLoginValidator
} = require('@validators/user')

const { UserDao } = require('@dao/user');
const { Auth } = require('@middlewares/auth');
const { LoginManager } = require('@service/login');
const { Resolve } = require('@lib/helper');
const res = new Resolve();

const AUTH_USER = 16;

const router = new Router({
    prefix: '/api/v1/user'
})

// 用户注册
router.post('/register', async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new RegisterValidator().validate(ctx);
    const email = v.get('body.email');
    const password = v.get('body.password2');

    // 创建用户
    const [err, data] = await UserDao.create({
        password,
        email,
        username: v.get('body.username')
    });

    if (!err) {
        data.token = await LoginManager.userLogin({
            email,
            password
        });
        // 返回结果
        ctx.response.status = 200;
        ctx.body = res.json(data);

    } else {
        ctx.body = res.fail(err)
    }

})

// 管理登录
router.post('/login', async (ctx) => {

    const v = await new UserLoginValidator().validate(ctx);

    let [err, token] = await LoginManager.userLogin({
        email: v.get('body.email'),
        password: v.get('body.password')
    });

    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json({ token });
    } else {
        ctx.body = res.fail(err, err.msg);
    }
});

// 获取用户信息
router.get('/auth', new Auth(AUTH_USER).m, async (ctx) => {
    // 获取用户ID
    const id = ctx.auth.uid;

    // 查询用户信息
    let [err, data] = await UserDao.detail(id);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data)
    } else {
        ctx.body = res.fail(err)
    }
})

module.exports = router
