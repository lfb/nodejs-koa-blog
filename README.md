
<p align="center"><a href="http://www.boblog.com" target="_blank" rel="noopener noreferrer"><img width="234" src="http://images.boblog.com/BOBLOG-03.png" alt="Vue logo"></a></p>


<p align="center">
  <a href="https://github.com/liangfengbo/frontend-basics/commits/master"><img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Build Status"></a>
  <a href="https://github.com/liangfengbo/frontend-basics/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="Coverage Status"></a>
</p>

## 一、项目介绍
- 完整的一套个人博客网站
- 技术栈：
    - 服务端：Nodejs，框架Koa2
    - 前端和后台模板：Vue.js
    - 数据库：MySQL
    - 完整包含技术：Node.js, Koa2, MySQL, Sequelize, JWT; Vue.js.
- 项目亮点：
    - 前后端分离，服务器端使用Koa2做接口，前端和后台管理使用Vue.js
    - Koa2项目代码结构清晰，功能模块化开发。
    - 使用ES6最新的技术栈，代码规范。
    - 代码简单明了，适合新手和有经验开发的朋友。
    - 使用Sequelize ORM管理数据库MySQL，JWT验证。
    - 保持更新中.. 代码质量一直在提高。
- 已实现的功能模块：
    - 权限
        - 用户登录注册 
        - JWT验证
        - 权限组分配（开发中）
    - 分类
        - 无极限分类
        - 分类增删改查
    - 文章
        - 文章增删改查
        - 七牛上传图片
        - 分类关联多文章
        - 分页
        - 软删除文章
    - 前端网站
        - Vue.js
        - 自己封装组件
        - 积累的Vue.js经验搭建的开发框架
    - 后台管理网站（Vue.js + iviews）
        - Vue.js
        - iviews组件
        - 对网站的数据进行管理
    
- 博客线上地址：[www.boblog.com](http://www.boblog.com)
- 入门文章教程：[Koa2从0搭建到实现文章API接口](https://www.imooc.com/article/80671)
- 喜欢或对你学习有帮助的话请点Star，Thanks！



## 二、如何学习和使用

#### 2.1.首先克隆整套项目代码git clone: 

- `git clone https://github.com/liangfengbo/nodejs-koa2-mysql-sequelize-jwt.git`

### 2.1.服务端Node.js Koa2项目使用
- 2.1.1. 在根目录下，安装包，执行: `npm install` 命令
- 2.1.2. 需要在目录下的config文件下db.js配置本地数据库

```js
// 重要一定要创建好数据库，且在config文件夹下的db.js配置好数据库。
const sequelize = new Sequelize('数据库', '数据库用户名', '数据库密码', {})

别忘了创建数据库，黑窗口登录msyql：create database '数据库用户名'
```
- 2.1.3. 开启服务 `npm start`；然后看到成功创建本地的数据库；浏览器打开：http://localhost:3000/ 即可以访问，但会有JWT权限提示。

##### 

### 2.2.前端项目使用
- 3.2.1. 在根目录下进入web项目：`cd web`，
- 3.2.2. 安装包，执行: `npm install` 命令，
- 3.2.3. 启动服务: `npm run dev`; 浏览器打开：http://localhost:8080/ 即可以访问。

### 2.3. 后台管理系统使用
- 3.2.1. 在根目录下进入admin项目：`cd admin`，
- 3.2.2. 安装包，执行: `npm install` 命令，
- 3.2.3. 启动服务: `npm run dev`; 浏览器打开：http://localhost:8081/ 即可以访问。

## 三、项目重点说明

### 项目结构：

 根目录都是 **Koa2** 项目源代码，根目录下的 **web** 文件夹下都是前端项目源代码，根目录下的 **admin** 文件夹下都是后台管理系统的源代码。

### 服务端Koa2项目结构说明

- [接口地址（点击即可看源码）](https://github.com/liangfengbo/nodejs-koa2-mysql-sequelize-jwt/blob/master/routes/index.js)
- [过滤JWT接口地址（点击即可看源码）](https://github.com/liangfengbo/nodejs-koa2-mysql-sequelize-jwt/blob/master/app.js)
- [处理文章数据（点击即可看源码）](https://github.com/liangfengbo/nodejs-koa2-mysql-sequelize-jwt/blob/master/controllers/article.js)
- [处理分类数据（点击即可看源码）](https://github.com/liangfengbo/nodejs-koa2-mysql-sequelize-jwt/blob/master/controllers/category.js)
- [上传七牛Token（点击即可看源码）](https://github.com/liangfengbo/nodejs-koa2-mysql-sequelize-jwt/blob/master/controllers/upload.js)
- [用户管理（点击即可看源码）](https://github.com/liangfengbo/nodejs-koa2-mysql-sequelize-jwt/blob/master/controllers/user.js)
- 前端项目，后台管理项目都是Vue.js写的，自己整理搭建的框架[vue-cli-project](https://github.com/liangfengbo/vue-cli-project)，重点使用了Vuex管理api接口数据，推荐看一看，有什么好的建议或者改进欢迎留言issues，谢谢。
- 以下是整个项目结构，自己可以看代码研究看，有什么问题请留言issues：

```
└──
admin - 后台管理系统
bin	
config                  - * 配置数据库
controllers             - * 控制器，在这里处理前端发来的请求，以及数据。
middleware	            - * 中间件，在这里处理用户是否有权限操作
models                 - * 模型，对数据库进行增删改查操作都在这里
public/stylesheets
routes                  - * 路由地址
schema                  - * 对数据库进行建表等操作
views
web - 前端项目
.gitignore
LICENSE
README.md
app.js                 - * 路由
package-lock.json
package.json
start.json
```
## 四、相关文档：
- [nodejs环境官网下载：http://nodejs.cn/download/](http://nodejs.cn/download/)
- [Koa-generator](https://www.npmjs.com/package/koa2-generator)
- [学习文档：Koa Context 上下文对象](https://github.com/demopark/koa-docs-Zh-CN/blob/master/api/context.md)  
- [学习文档：Koa Request  请求对象](https://github.com/demopark/koa-docs-Zh-CN/blob/master/api/request.md)
- [学习文档：Koa Response 响应对象](https://github.com/demopark/koa-docs-Zh-CN/blob/master/api/response.md)
- [学习文档：Koa Middlewares  中间件](https://github.com/demopark/koa-docs-Zh-CN#%E4%B8%AD%E9%97%B4%E4%BB%B6)
- [学习文档：Sequelize 文档的中文版](https://github.com/demopark/sequelize-docs-Zh-CN)
- [学习文档：Sequelize Model definition - 模型定义 >](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/models-definition.md) 
- [学习文档：Instances - 实例](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/instances.md)
- [我的教程文章：Koa2从0搭建到实现文章API接口](https://www.imooc.com/article/80671)
- [我的教程文章：详细MySQL基本操作](https://www.imooc.com/article/81273)

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
email | 邮箱 | 是 | String
roles_id | 角色ID | 否 | Number
##### 示例（postman软件测试，自己下载测试）

```
http://localhost:3000/api/v1/user/register

参数一：username bobo
参数二：password bobo123
参数二：email itbo@163.com
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
// 此接口列表，过滤不用jwt验证
app.use(jwt({secret: secret.sign}).unless({
    path: [
        // 文章列表
        /^\/api\/v1\/article\/list/,
        // 文章详情
        /^\/api\/v1\/article\/detail/,
        // 文章搜索
        /^\/api\/v1\/article\/search/,
        // 上传token
        /^\/api\/v1\/upload\/token/,
        // 注册
        /^\/api\/v1\/user\/register/,
        // 登录
        /^\/api\/v1\/user\/login/,
        // 分类列表
        /^\/api\/v1\/category\/list/,
        // 分类文章
        /^\/api\/v1\/category\/article/,
        // 分类列表
        /^\/api\/v1\/category\/article\/list/
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
        "username": "liangfengbo",
        "email": "itbo@163.com"
    }
}
```

## 最后

项目已实现登录注册接口，文章增删改查，分页，查询以及分类增删改查，无极限分类等接口，自己可以根据项目代码学习，以及到postman软件中测试或学习；喜欢或对你有帮助的话请点star或有您有更好的建议和意见，请提出来告知我，可以留言issues。

希望能够帮助到你学习！Thanks！

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 Fengbo Liang
