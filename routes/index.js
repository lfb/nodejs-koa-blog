const Router = require('koa-router')
const User = require('../controllers/User')
const Article = require('../controllers/Article')
const Category = require('../controllers/Category')
const UploadToken = require('../controllers/UploadToken')

const Routers = new Router({
    prefix: '/api/v1'
})

/**
 * 用户接口
 */
// 用户注册
Routers.post('/user/register', User.create);
// 用户登录
Routers.post('/user/login', User.login);
// 删除用户
Routers.delete('/user/delete/:id', User.delete);
// 获取用户信息
Routers.get('/user/info', User.info);
// 获取用户列表
Routers.get('/user/list', User.list);

/**
 * 文章接口
 */
// 创建文章
Routers.post('/article/create', Article.create);
// 获取文章详情
Routers.get('/article/detail/:id', Article.detail);
// 删除文章
Routers.delete('/article/hidden/:id', Article.hidden);
// 更改文章
Routers.put('/article/update/:id', Article.update);
// 获取文章列表
Routers.get('/article/list', Article.list);
// 搜索文章
Routers.get('/article/search', Article.search)

/**
 * 分类接口
 */
// 创建分类
Routers.post('/category/create', Category.create);
// 获取分类详情
Routers.get('/category/detail/:id', Category.detail);
// 删除分类
Routers.delete('/category/delete/:id', Category.delete);
// 更改分类
Routers.put('/category/update/:id', Category.update);
// 获取分类列表
Routers.get('/category/list', Category.list);
// 查询分类ID下的所有文章列表
Routers.get('/category/article/:id', Category.article);


/**
 * 上传token
 */
Routers.get('/upload/token', UploadToken.token)

module.exports = Routers
