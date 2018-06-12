const Router = require('koa-router')
const UserController = require('../controllers/user')
const ArticleController = require('../controllers/article')

const router = new Router({
    prefix: '/api/v1'
})

/**
 * 用户接口
 */
// 用户注册
router.post('/user', UserController.create);
// 用户登录
router.post('/user/login', UserController.login);
// 获取用户信息
router.get('/user', UserController.getUserInfo);
// 获取用户列表
router.get('/user/list', UserController.getUserList);
// 删除用户
router.delete('/user/:id', UserController.delete);

/**
 * 文章接口
 */
// 创建文章
router.post('/article', ArticleController.create);
// 获取文章列表
router.get('/article', ArticleController.getArticleList);
// 获取文章详情
router.get('/article/:id', ArticleController.detail);
// 删除文章
router.delete('/article/:id', ArticleController.delete);
// 更改文章
router.put('/article/:id', ArticleController.update);

module.exports = router
