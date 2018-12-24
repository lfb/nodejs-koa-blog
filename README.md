
<p align="center"><a href="http://www.boblog.com" target="_blank" rel="noopener noreferrer"><img width="234" src="http://images.boblog.com/BOBLOG-03.png" alt="Vue logo"></a></p>


<p align="center">
  <a href="https://github.com/liangfengbo/frontend-basics/commits/master"><img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Build Status"></a>
  <a href="https://github.com/liangfengbo/frontend-basics/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="Coverage Status"></a>
</p>

## 一、项目
- Koa2+Vue前后端分离项目，已经部署上线：[www.boblog.com](http://www.boblog.com)
- 文章教程：[Koa2从0搭建到实现文章API接口](https://www.imooc.com/article/80671)

## 二、项目介绍

- 技术栈：Nodejs, Vuejs, MySQL; Koa2, Sequelize, jwt.
- 前后端分离：
  - 用nodejs的koa2框架搭建接口服务器，提供API接口；
  - 前后端用vuejs搭建，从API接口获取数据。
- 接口包含：
  - jwt做权限接口验证。
  - 用户登录注册接口；
  - 文章增删改查，搜索，分页接口；
  - 分类增删改查接口；
  - 分类关联多文章。
- Sequelize管理mysql数据库。
- 已实现完整一个博客系统网站。
- 项目优化建议：1.前端性能优化；2.用户接口和管理员接口区分(权限管理)。
- 喜欢或对你学习有帮助的话请点Star，Thanks！


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
// 查询分类ID下的所有文章列表
router.get('/category/article/list/:id', CategoryController.getCategoryArticle);
```

#### 4.2.前端项目路由

```js
// └──web/src/router/index.js文件

/* 首页 */        path: '/',
/* 文章详情 */    path: '/article/detail/:id',
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

## 五、部分接口说明

#### 5.1.用户(管理员)接口


#### 5.1.1.注册接口

##### 地址：
```
/user/register
```

##### 请求方式

```
POST
```

##### 参数说明

参数 | 说明 | 必填 | 类型
---|---|---|---
username | 用户名 | 是 | String
password | 用户名 | 是 | String

##### 示例（postman软件测试，自己下载测试）

```
http://localhost:3000/api/v1/user/register

参数一：username bobo
参数二：password bobo123
```


##### 创建成功

```js
{
    "code": 200,
    "msg": "创建用户成功",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpYW5nZmVuZ2JvIiwiaWQiOjMsImlhdCI6MTU0MzM4MjAwOCwiZXhwIjoxNTQzMzg1NjA4fQ.-AEyGpqf5l7uKdaHArEGpKC3L5wHRHSNkvcciVumhBo"
}
```

#### 5.1.2.登录
##### 地址

```
/user/login
```
##### 请求方式

```
POST
```
##### 参数说明

参数 | 说明 | 必填 | 类型
---|---|---|---
username | 用户名 | 是 | String
password | 用户名 | 是 | String

##### 示例（postman软件测试，自己下载测试）

```
http://localhost:3000/api/v1/user/login

参数一：username bobo
参数二：password bobo123
```


##### 创建成功

```js
{
    "code": 200,
    "msg": "登录成功",
    "data": {
        "id": 3,
        "username": "liangfengbo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpYW5nZmVuZ2JvIiwiaWQiOjMsImlhdCI6MTU0MzM4MjI2MiwiZXhwIjoxNTQzMzg1ODYyfQ.xsTAkURA8nx8cMS12IGAb5uU69-ipmkgfpk6fROV7Ec"
    }
}
```

#### 5.1.3.获取用户信息

##### 地址

```
/user/info
```

##### 请求方式
```
GET
```

##### 参数说明


参数 | 说明 | 必填 | 类型
---|---|---|---
Authorization | JWT验证是报文headers带过来的token参数 | 是 | String

##### 在header发送中加入token传递格式为：

> Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpYW5nZmVuZ2JvIiwiaWQiOjMsImlhdCI6MTU0MzM4MjI2MiwiZXhwIjoxNTQzMzg1ODYyfQ.xsTAkURA8nx8cMS12IGAb5uU69-ipmkgfpk6fROV7Ec，该token是由上面登录接口返回来的token

##### 处理jwt验证时候，我添加了方法，凡是以下没有过滤的接口，都要带上token验证，否则报401权限不足错误。

```js
// |-在根目录app.js文件下，过滤不用jwt验证
// 此接口列表，过滤不用jwt验证
app.use(jwt({secret: secret.sign}).unless({
    path: [
        // 文章详情
        /^\/api\/v1\/article\/detail/,
        // 文章列表
        /^\/api\/v1\/article\/list/,
        // 登录
        /^\/api\/v1\/user\/login/,
        // 创建用户
        /^\/api\/v1\/user\/register/,
        // 分类列表
        /^\/api\/v1\/category\/list/,
        // 文章搜索
        /^\/api\/v1\/article\/search/
    ]
}))
```

##### 示例

```
http://localhost:3000/api/v1/user/info
```

##### 返回成功信息
```
{
    "code": 200,
    "msg": "查询成功",
    "data": {
        "id": 3,
        "username": "liangfengbo"
    }
}
```

## 最后

项目已实现登录注册接口，文章增删改查，分页，查询以及分类增删改查等接口，自己可以根据项目代码学习，以及到postman软件中测试或学习；喜欢或对你有帮助的话请点star或有您有更好的建议和意见，请提出来告知我，可以留言issues。

希望能够帮助到你学习！Thanks！

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 Fengbo Liang
