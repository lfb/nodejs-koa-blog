const KoaRouter = require('koa-router')
const User = require('../controllers/User')
const Article = require('../controllers/Article')
const Category = require('../controllers/Category')
const UploadToken = require('../controllers/UploadToken')

const Router = new KoaRouter({
    prefix: '/api/v1'
})

/**
 * 用户接口
 */
// 用户注册
Router.post('/user/register', User.create);
// 用户登录
Router.post('/user/login', User.login);
// 删除用户
Router.delete('/user/delete/:id', User.delete);
// 获取用户信息
Router.get('/user/info', User.info);
// 获取用户列表
Router.get('/user/list', User.list);

/**
 * 文章接口
 */
// 创建文章
Router.post('/article/create', Article.create);
// 获取文章详情
Router.get('/article/detail/:id', Article.detail);
// 删除文章
Router.delete('/article/hidden/:id', Article.hidden);
// 更改文章
Router.put('/article/update/:id', Article.update);
// 获取文章列表
Router.get('/article/list', Article.list);
// 搜索文章
Router.get('/article/search', Article.search)

/**
 * 分类接口
 */
// 创建分类
Router.post('/category/create', Category.create);
// 获取分类详情
Router.get('/category/detail/:id', Category.detail);
// 删除分类
Router.delete('/category/delete/:id', Category.delete);
// 更改分类
Router.put('/category/update/:id', Category.update);
// 获取分类列表
Router.get('/category/list', Category.list);
// 查询分类ID下的所有文章列表
Router.get('/category/article/:id', Category.article);


/**
 * 上传token
 */
Router.get('/upload/token', UploadToken.token)


module.exports = Router
