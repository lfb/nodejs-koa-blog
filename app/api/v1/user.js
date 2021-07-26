/**
 * @description 用户的路由 API 接口
 * @author 梁凤波, Peter Liang
 */

const Router = require('koa-router')

const {
    RegisterValidator,
    PositiveIdParamsValidator,
    UserLoginValidator
} = require('@validators/user')

const { UserDao } = require('@dao/user');
const { Auth } = require('@middlewares/auth');
const { LoginManager } = require('@service/login');
const { Resolve } = require('@lib/helper');
const res = new Resolve();

const AUTH_USER = 8;
const AUTH_ADMIN = 16;

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
        const [errToken, token, id] = await LoginManager.userLogin({
            email,
            password
        });
        if (!errToken) {
            data.token = token
            data.id = id
        }
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

    let [err, token, id] = await LoginManager.userLogin({
        email: v.get('body.email'),
        password: v.get('body.password')
    });

    if (!err) {
        let [err, data] = await UserDao.detail(id);
        if (!err) {
            data.setDataValue('token', token)
            ctx.response.status = 200;
            ctx.body = res.json(data);
        }
    } else {
        ctx.body = res.fail(err, err.msg);
    }
});

// 获取用户信息
router.get('/auth', new Auth(AUTH_USER).m, async (ctx) => {
    // 获取用户ID
    const id = ctx.auth.uid;

    // 查询用户信息
    let [err, data] = await UserDao.detail(id, 1);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data)
    } else {
        ctx.response.status = 401;
        ctx.body = res.fail(err, err.msg)
    }
})

// 获取用户列表
// 需要管理员及以上才能操作
router.get('/list', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 查询用户信息
    let [err, data] = await UserDao.list(ctx.query);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data)
    } else {
        ctx.body = res.fail(err)
    }
})


// 获取用户信息
// 需要管理员及以上才能操作
router.get('/detail/:id', new Auth(AUTH_USER).m, async (ctx) => {
    // 获取用户ID
    const v = await new PositiveIdParamsValidator().validate(ctx);
    const id = v.get('path.id');
    // 查询用户信息
    let [err, data] = await UserDao.detail(id);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data)
    } else {
        ctx.body = res.fail(err)
    }
})


// 获取用户列表
// 需要管理员及以上才能操作
router.delete('/delete/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取用户ID参数
    const id = v.get('path.id');
    // 删除用户
    const [err, data] = await UserDao.destroy(id);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除用户成功');
    } else {
        ctx.body = res.fail(err);
    }
})

// 获取更新用户信息
// 需要管理员及以上才能操作
router.put('/update/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取用户ID参数
    const id = v.get('path.id');
    // 删除用户
    const [err, data] = await UserDao.update(id, v);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('更新用户成功');
    } else {
        ctx.body = res.fail(err);
    }
})

module.exports = router
