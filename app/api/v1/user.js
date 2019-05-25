const Router = require('koa-router')

const {
    RegisterValidator,
    UserLoginValidator
} = require('../../validators/user')

const {LoginManager} = require('../../service/login');
const {UserDao} = require('../../dao/user');
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/v1/user'
})

// 用户注册
router.post('/register', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new RegisterValidator().validate(ctx);

    // 创建用户
    await UserDao.createUser(v);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('注册成功');
})

// 用户登录
router.post('/login', async (ctx) => {

    const v = await new UserLoginValidator().validate(ctx);

    let token = await LoginManager.userLogin(v.get('body.account'), v.get('body.secret'));

    ctx.response.status = 200;
    ctx.body = {
        msg: '登录成功',
        token
    }
});

// 获取用户信息
router.get('/info', new Auth().m, async (ctx) => {

    // 获取用户ID
    const id = ctx.auth.uid;

    // 查询用户信息
    let userInfo = await UserDao.getUserInfo(id);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(userInfo)
})

module.exports = router
