<p align="center"><a href="http://www.boblog.com" target="_blank" rel="noopener noreferrer"><img width="234" src="http://images.boblog.com/BOBLOG-03.png" alt="logo"></a></p>

## 这是个什么的项目？

使用 Node.js + Koa2 + MySQL + Vue.js 实战开发一套完整个人博客项目网站。博客线上地址：[www.boblog.com](http://www.boblog.com)

## 解决了什么问题？
- 服务端：使用 Node.js 的 Koa2 框架二次开发 Restful API。
- 前端：Vue.js 打造了前端网站和后台管理系统。


## 项目包含什么功能？

[![koa](https://img.shields.io/badge/koa-%5E2.7.0-brightgreen.svg) ](https://www.npmjs.com/package/koa)
[![koa-router](https://img.shields.io/badge/koa--router-%5E7.4.0-brightgreen.svg)](https://www.npmjs.com/package/koa-router)
[![sequelize](https://img.shields.io/badge/sequelize-%5E5.6.1-brightgreen.svg)](https://www.npmjs.com/package/sequelize)
[![mysql2](https://img.shields.io/badge/mysql2-%5E1.6.5-brightgreen.svg)](https://www.npmjs.com/package/mysql2)

### Node.js Koa2服务端 API
- [x] 管理员与权限控制接口
- [x] 文章管理接口
- [x] 评论回复功能接口
- [x] 专栏接口
- [x] 专栏关联章节接口
- [x] 专栏章节关联文章接口
- [x] 专栏文章评论回复接口
- [x] 分类接口
- [x] 广告接口

### 博客前端展示网站和后台管理系统
- [x] 使用最新 [Vue-cli3 模板](https://github.com/liangfengbo/vue-cli3-template) 搭建
- [x] 使用 Vue.js iviewui design 搭建的后台管理系统

## 项目特点
- 前后端分离，使用精小而强大的 Node.js Koa2 框架做服务端 API 接口，使用前端 Vue.js 框架搭建博客前端展示网站和后台管理系统。
- Koa 与 Koa 二次开发API，深入Koa2的中间件洋葱模型的应用，使用 async/await 解决异步编程问题。
- 在 Koa2 项目添加参数验证、全局异常处理中间件，编写JWT权限控制中间件，使项目变得更加健壮、清晰地高效开发。
- 使用 Sequelize ORM 管理 MySQL。
- 前端网站结合最新 [Vue-cli3](https://github.com/liangfengbo/vue-cli3-template) 搭建，简单易维护。
- 后台管理系统使用 iviewui design 组件库，每个接口都使用模块化管理，清晰、简单快速地管理。
- ...

## 如何使用和学习？

### 数据库
启动项目前一定要在创建好 `boblog` 数据库。
```
# 登录数据库
$ mysql -uroot -p密码

# 创建 wxapp 数据库
$ CREATE DATABASE IF NOT EXISTS boblog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 修改 Koa2 项目数据库配置
请在根目录下的 [|——config/config.js](https://github.com/liangfengbo/nodejs-koa-blog/blob/master/config/config.js) 文件下修改您本地的数据库名字（`boblog`）和数据库密码。

### 克隆项目
首先使克隆项目，然后进入项目根目录使用命令安装包，最后命令启动项目，代码会根据模型自动创建数据库表的。

根目录都是 Node.js + Koa2 API开发源代码，根目录下的 web 文件夹下都是前端网站项目源代码，根目录下的 admin 文件夹下都是后台管理系统的源代码。


```
# 克隆项目代码
$ git clone https://github.com/liangfengbo/nodejs-koa-blog.git

# 进入项目根目录
$ cd nodejs-koa-blog

# 安装依赖包
$ npm install

# 启动 Node.js Koa2 项目
$ npm run dev

# 打开浏览器输入回车：http://localhost:3000/v1/
# 可以查看目录下的 ./app/api/v1 下的接口 或者 看 doc 目录下的markdown 接口文档，在 postman 测试接口

# 启动前端项目
1. 在根目录下进入web项目：cd web，
2. 安装包，执行: npm install 命令，
3. 启动服务: npm run dev; 浏览器打开：http://localhost:8080/ 即可以访问。

# 启动后台管理系统
1. 在根目录下进入admin项目：cd admin，
2. 安装包，执行: npm install 命令，
3. 启动服务: npm run dev; 浏览器打开：http://localhost:8083/ 即可以访问。
```

### 接口说明（重要）
项目的所有接口文档都这里，可以逐个文档看。
- [管理员接口文档说明](./doc/admin.md)
- [文章接口文档说明](./doc/article.md)
- [分类接口文档说明](./doc/category.md)
- [评论接口文档说明](./doc/comment.md)
- [回复评论接口文档说明](./doc/reply.md)
- [专栏接口文档说明](./doc/column.md)
- [专栏章节接口文档说明](./doc/column-chapter.md)
- [章节目接口文档说明](./doc/chapter-section.md)
- [广告接口文档说明](./doc/advertise.md)

## FAQ
1. 没有yarn环境，npm 可以吗？ 
> 答：可以的，建议使用 yarn，yarn 比 npm 速度快，主要是安装版本统一。

2. 启动 Koa2 项目报错，请问原因？
> 答：首先，请检查一下使用 npm 或 yarn 安装依赖包没。然后，再请检查一下确保安装好数据库，新建好数据库：boblog，请看上面的数据库配置。最后看下启动打印日志是否有报错的信息。
3. ... 更多问题请到 [Issues](https://github.com/liangfengbo/nodejs-koa-blog/issues)查阅，或者有问题请到 [Issues 提问](https://github.com/liangfengbo/nodejs-koa-blog/issues/new)。

## License

项目已实现管理员、权限管理、文章、分类、评论等接口，前端模板网站和后台管理系统。自己可以根据项目代码学习，可以到 postman 软件中测试API或学习。

喜欢或对你有帮助的话，请你点一个星星 <strong style='color:red;'>star</strong> 鼓励我，或者您有更好的建议和意见，请提出来告知我，可以留言 [Issues](https://github.com/liangfengbo/nodejs-koa-blog/issues/new)。希望能够帮助到你学习！Thanks！共勉！

[MIT](https://github.com/liangfengbo/nodejs-koa-blog/blob/master/LICENSE), by 梁凤波

