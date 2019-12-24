<p align="center"><a href="http://www.boblog.com" target="_blank" rel="noopener noreferrer"><img width="234" src="http://images.boblog.com/BOBLOG-03.png" alt="logo"></a></p>

## 一、这是个什么的项目？

基于 Node.js Koa2 实战开发的一套完整的博客项目网站，使用 Koa2 二次开发一套适合多端的 RESTful API，同时配套完整的后台管理系统，且前端展示既有基于 ejs 服务端渲染，也有基于 Vue.js 前后端分离的 2 套前端网站。

博客线上地址是：[https://www.boblog.com](https://www.boblog.com/)

## 二、项目包含什么功能？

[![koa](https://img.shields.io/badge/koa-%5E2.7.0-brightgreen.svg) ](https://www.npmjs.com/package/koa)
[![koa-router](https://img.shields.io/badge/koa--router-%5E7.4.0-brightgreen.svg)](https://www.npmjs.com/package/koa-router)
[![sequelize](https://img.shields.io/badge/sequelize-%5E5.6.1-brightgreen.svg)](https://www.npmjs.com/package/sequelize)
[![mysql2](https://img.shields.io/badge/mysql2-%5E1.6.5-brightgreen.svg)](https://www.npmjs.com/package/mysql2)

### 2.1.Node.js Koa2服务端 RESTful API
- [x] 管理员与权限控制接口
- [x] 文章管理接口
- [x] 评论/回复功能接口
- [x] 分类接口
- [x] 广告接口

### 2.2.博客前端展示网站
- ejs 服务端渲染
- Vue.js 前后端分离

### 2.2.后台管理系统
- [x] 使用 Vue.js iviewui design 搭建的后台管理系统

### 2.3.优势
- 使用精小而强大的 Node.js Koa2 框架做服务端 API 接口。
- 前端既有服务端渲染，也有前后端分离，且做了大量的优化工作，前端展示网站打开快。
- 性能优化方面的工作：
    - 服务端使用了缓存机制，减少服务器的请求压力，如Redis 缓存，HTTP缓存
    - 使用了 CND 加速，静态文件存储在七牛服务器上
    - ejs 服务端渲染尽量减少文件的引入，减少对 DOM的操作，且封装使用了图片懒加载，事件防抖和节流控制浏览器滚动监听事件。
    - Vue.js 项目使用了模块按需加载，使用浏览器缓存机制减少对服务器请求的压力
    - ...

### 2.4.知识点
- 服务端：`Node.js, Koa, MySQL, Sequelize, Redis`
- 前端服务端渲染：`ejs, jQuery, Bootstrap`, [体验网址：www.boblog.com](https://www.boblog.com/)
- 前后端分离：`Vue.js, iviewui`, [体验网址：vue.boblog.com](http://vue.boblog.com/)
- 后端管理系统：`Vue.js, iviewui`
- 性能优化
- 非常适合想用 `Node.js Koa2` 做网站的朋友，相信你一定能学到知识。

## 三、如何学习？
### 3.1.克隆项目
首先使克隆项目，然后进入项目根目录使用命令安装包，最后命令启动项目，代码会根据模型自动创建数据库表的。
```
# 克隆项目代码
$ git clone https://github.com/LFB/nodejs-koa-blog.git
```

### 3.2.数据库
启动项目前一定要在创建好 `boblog` 数据库，以下是执行数据库命令：
```
# 登录数据库
$ mysql -uroot -p密码

# 创建 boblog 数据库
$ CREATE DATABASE IF NOT EXISTS boblog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3.3.Redis
项目使用了Redis，请在你的电脑上面装上Redis：：[「点击：附上Redis安装教程」](https://www.runoob.com/redis/redis-install.html)，安装好 Redis 后，需启动Redis。 

### 3.4.修改 Koa2 项目数据库配置
请在根目录下的 [|——config/config.js](https://github.com/LFB/nodejs-koa-blog/blob/master/config/config.js) 文件下修改您本地的数据库名字（`boblog`）和数据库密码 ( `password` )。

根目录都是 Node.js + Koa2 API 开发源代码，重点是 app 文件夹下的 api 开发；根目录下的 view 文件夹是 ejs 渲染项目；web 文件夹下都是前端网站项目源代码；根目录下的 admin 文件夹下都是后台管理系统的源代码。

以下是启动服务端项目的操作命令：
```
# 进入项目根目录
$ cd nodejs-koa-blog

# 安装依赖包
$ npm install

# 启动 Node.js Koa2 项目
$ npm run dev
```

打开浏览器输入回车：http://localhost:3000 可以看到服务端渲染的前端网站，当然可能该网站是个空数据网站，可以查看目录下的 `./app/api/v1` 下的接口或者看 doc 目录下的 markdown 接口文档，在 postman 测试接口。


以下是启动后台管理系统的操作命令：
```
# 启动后台管理系统
1. 在根目录下进入admin项目：cd admin，
2. 安装包，执行: npm install 命令，
3. 启动服务: npm run dev; 浏览器打开：http://localhost:8083/ 即可以访问。
```


以下启动 Vue.js 前端项目
```
# 启动 Vue.js 前端项目
1. 在根目录下进入web项目：cd web，
2. 安装依赖包，执行: yarn install 或者 npm install 命令，
3. 启动项目: yarn serve 或者 npm run serve; 浏览器打开：http://localhost:8080/ 即可以访问。
```


### 四、接口说明（重要）
项目的所有接口文档都这里，可以逐个文档看。
- [管理员接口文档说明](./doc/admin.md)
- [文章接口文档说明](./doc/article.md)
- [分类接口文档说明](./doc/category.md)
- [评论接口文档说明](./doc/comment.md)
- [评论回复接口文档说明](./doc/reply.md)
- [广告接口文档说明](./doc/advertise.md)

## 五、FAQ
1. 没有yarn环境，npm 可以吗？ 
> 答：可以的，建议使用 yarn，yarn 比 npm 速度快，主要是安装版本统一。

2. 启动 Koa2 项目报错，请问原因？
> 答：首先，请检查一下使用 npm 或 yarn 安装依赖包没。然后，再请检查一下确保安装好数据库，新建好数据库：boblog，请看上面的数据库配置。最后看下启动打印日志是否有报错的信息。
3. ... 更多问题请到 [Issues](https://github.com/LFB/nodejs-koa-blog/issues)查阅，或者有问题请到 [Issues 提问](https://github.com/LFB/nodejs-koa-blog/issues/new)。

## License

项目已实现管理员、权限管理、文章、分类、评论等接口，前端模板网站和后台管理系统。自己可以根据项目代码学习，可以到 postman 软件中测试API或学习。

喜欢或对你有帮助的话，请你点一个星星 <strong style='color:red;'>star</strong> 鼓励我，或者您有更好的建议和意见，请提出来告知我，可以留言 [Issues](https://github.com/LFB/nodejs-koa-blog/issues/new)。希望能够帮助到你学习！Thanks！共勉！

[MIT](https://github.com/LFB/nodejs-koa-blog/blob/master/LICENSE), by 梁凤波

