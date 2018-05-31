const Router = require('koa-router')
const UserController = require('../controllers/user')
const NavController = require('../controllers/nav')
const ArticleController = require('../controllers/article')

const router = new Router({
    prefix: '/api/v1'
})

/**
 * 用户接口
 */
// 用户注册
router.post('/createUser', UserController.createUser);
// 获取用户信息
router.get('/userInfo', UserController.getUserName);
// 用户登录
router.post('/login', UserController.postLogin);

/**
 * 文章接口
 */
// 创建文章
router.post('/article', ArticleController.createArticle);
// 获取文章列表
router.get('/article', ArticleController.getArticleList);
// 获取文章详情
router.get('/article/:id', ArticleController.getArticleDetail);
// 删除文章
router.delete('/article/:id', ArticleController.deleteArticle);
// 更改文章
router.put('/article/:id', ArticleController.updateArticle);

/**
 * 导航接口
 */
// 创建导航
router.post('/nav', NavController.createNav);
// 获取导航列表
router.get('/nav', NavController.getNavlist);
// 获取导航详情
router.get('/nav/:id', NavController.getNavDetail);
// 删除导航
router.delete('/nav/:id', NavController.deleteNav);
// 更改导航
router.put('/nav/:id', NavController.updateNav);

module.exports = router
