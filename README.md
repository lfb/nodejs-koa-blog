
<p align="center"><a href="https://github.com/liangfengbo" target="_blank" rel="noopener noreferrer"><img width="100" src="https://avatars0.githubusercontent.com/u/26264225?s=460&v=4" alt="Vue logo"></a></p>


<p align="center">
  <a href="https://github.com/liangfengbo/frontend-basics/commits/master"><img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Build Status"></a>
  <a href="https://github.com/liangfengbo/frontend-basics/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="Coverage Status"></a>
</p>

## 一、项目
- Koa2+Vue前后端分离项目，已经部署上线：[www.boblog.com](http://www.boblog.com)
- 文章教程：[Koa2从0搭建到实现文章API接口](https://www.imooc.com/article/80671)

## 二、项目介绍

- 技术栈：nodejs, vuejs, mysql; Koa2, Sequelize, jwt.
- 前后端分离：
  - 用nodejs的koa2框架搭建接口服务器，提供API接口；
  - 前后端用vuejs搭建，从API接口获取数据。
- jwt做权限接口验证。
- Sequelize管理mysql数据库。
- 已实现完整一个博客系统网站。


## 三、如何学习和使用

#### 3.1.首先克隆整套项目代码git clone: 

- `git clone https://github.com/liangfengbo/nodejs-koa2-mysql-sequelize-jwt.git`

#### 3.1.Node Koa2项目使用
- 3.1.1. 在根目录下，安装包，执行: `npm install` 命令
- 3.1.2. 需要在config文件下db.js配置本地数据库

```js
const sequelize = new Sequelize('数据库', '数据库用户名', '数据库密码', {})

别忘了创建数据库，黑窗口登录msyql：create database '数据库用户名'
```
- 3.1.3. 开启服务 `npm start`；然后看到成功创建本地的数据库；浏览器打开：http://localhost:3000/ 即可以访问，但会有JWT权限提示。

##### 

### 3.2.前端项目使用
- 3.2.1. 在根目录下进入web项目：`cd web`，
- 3.2.2. 安装包，执行: `npm install` 命令，
- 3.2.3. 启动服务: `npm run dev`; 浏览器打开：http://localhost:8080/ 即可以访问。

### 3.3. 后端项目使用
- 3.2.1. 在根目录下进入admin项目：`cd admin`，
- 3.2.2. 安装包，执行: `npm install` 命令，
- 3.2.3. 启动服务: `npm run dev`; 浏览器打开：http://localhost:8081/ 即可以访问。

## 四、项目路由

#### 4.1.Node Koa2项目接(路由)
```js
// └──routes/index.js文件

const router = new Router({
    prefix: '/api/v1'
})

/**
 * 用户接口
 */
// 用户注册
router.post('/user/register', UserController.create);
// 用户登录
router.post('/user/login', UserController.login);
// 删除用户
router.delete('/user/delete/:id', UserController.delete);
// 获取用户信息
router.get('/user/info', UserController.getUserInfo);
// 获取用户列表
router.get('/user/list', UserController.getUserList);

/**
 * 文章接口
 */
// 创建文章
router.post('/article/create', ArticleController.create);
// 获取文章详情
router.get('/article/detail/:id', ArticleController.detail);
// 删除文章
router.delete('/article/delete/:id', ArticleController.delete);
// 更改文章
router.put('/article/update/:id', ArticleController.update);
// 获取文章列表
router.get('/article/list', ArticleController.list);
// 搜索文章
router.get('/article/search', ArticleController.search)

/**
 * 分类接口
 */
// 创建分类
router.post('/category/create', CategoryController.create);
// 获取分类详情
router.get('/category/detail/:id', CategoryController.detail);
// 删除分类
router.delete('/category/delete/:id', CategoryController.delete);
// 更改分类
router.put('/category/update/:id', CategoryController.update);
// 获取分类列表
router.get('/category/list', CategoryController.list);
```

#### 4.2.前端项目路由

```js
// └──web/src/router/index.js文件

/* 首页 */    path: '/',
/* 文章详情 */  path: '/article/detail/:id',
```

#### 4.3.后端项目路由

```js
// └──admin/src/router/index.js文件

/* 后台登录 */    path: '/login',
/* 管理员列表 */  path: '/user/lock',
/* 管理员信息 */  path: '/user/index',
/* 文章列表 */    path: '/article/list'
/* 新增文章 */    path: '/article/create',
/* 更新文章 */    path: '/article/update/:id',
/* 分类列表 */    path: '/category/list',
/* 新增分类 */    path: '/category/create',
/* 更新分类 */    path: '/category/update/:id', 
```