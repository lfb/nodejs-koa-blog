<p align="center"><a href="http://www.boblog.com" target="_blank" rel="noopener noreferrer"><img width="234" src="https://cdn.boblog.com/boblog.png" alt="logo"></a></p>

前言：这个项目我花了很多时间去学习维护迭代，其中2020年4月到今年6月份，其中有非常多原因没有继续维护迭代，这一年中，我经历了很多事情：有痛苦的，有快乐的，也有大起大落的。这一年的经历总结一句话：喜欢的，就赶紧去做吧，选择了，就别后悔了。现在，我回来了，这个月我删掉了所有的commit log，删了之前大量的辣鸡代码，把我积累到的知识重新写了一版本，我会继续优化迭代这个项目，希望能和伙伴们继续快乐的生活，快乐的工作！

线上地址：[www.boblog.com](http://www.boblog.com)

## 一、这是个什么的项目？
实战开发的一套完整的博客项目网站：
- Node.js + Koa2 + MySQL 开发的一套完整 RESTful API
- Vue.js + element-ui 管理后台
- SSR Nuxtjs 前台服务端渲染


## 二、项目包含什么功能？

[![koa](https://img.shields.io/badge/koa-%5E2.7.0-brightgreen.svg) ](https://www.npmjs.com/package/koa)
[![koa-router](https://img.shields.io/badge/koa--router-%5E7.4.0-brightgreen.svg)](https://www.npmjs.com/package/koa-router)
[![sequelize](https://img.shields.io/badge/sequelize-%5E5.6.1-brightgreen.svg)](https://www.npmjs.com/package/sequelize)
[![mysql2](https://img.shields.io/badge/mysql2-%5E1.6.5-brightgreen.svg)](https://www.npmjs.com/package/mysql2)

### 2.1.Node.js Koa2服务端 RESTful API
- 管理员管理
- 用户管理
- 文章管理
- 分类管理
- 评论管理
- 回复管理

### 2.2.优势
- 使用精小而强大的 Node.js Koa2 框架做服务端 API 接口。
- 前端既有服务端渲染，也有前后端分离，且做了大量的优化工作，前端展示网站打开快。

### 2.4.知识点
- 服务端：`Node.js, Koa, MySQL, Sequelize`
- 前端服务端渲染：`Nuxt.js, Markdown`
- 后端管理系统：`Vue.js, element-ui, Markdown`
- 性能优化
- 非常适合想用 `Node.js Koa2` 做网站的朋友，相信你一定能学到知识。

## 三、如何学习？
### 3.1.克隆项目
首先使克隆项目，然后进入项目根目录使用命令安装包，最后命令启动项目，代码会根据模型自动创建数据库表的。
```
# 克隆项目代码
$ git clone https://github.com/lgb/nodejs-koa-blog.git
```

### 3.2.数据库
启动项目前一定要在创建好 `boblog` 数据库，以下是执行数据库命令：
```
# 登录数据库
$ mysql -uroot -p密码

# 创建 boblog 数据库
$ CREATE DATABASE IF NOT EXISTS boblog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3.3.修改 Koa2 项目数据库配置
请在根目录下的 [|——config/config.js](https://github.com/LFB/nodejs-koa-blog/blob/master/config/config.js) 文件下修改您本地的数据库名字（`boblog`）和数据库密码 ( `password` )。

根目录都是 Node.js + Koa2 API 开发源代码，重点是 app 文件夹下的 api 开发；根目录下的 frontend-boblog 文件夹下都是前端网站项目源代码；根目录下的 admin 文件夹下都是后台管理系统的源代码。

以下是启动服务端项目的操作命令：
```
# 进入项目根目录
$ cd nodejs-koa-blog

# 安装依赖包
$ npm install 或者 yarn install

# 启动 Node.js Koa2 项目
$ npm run dev 或者 yarn dev
```

打开浏览器输入回车：http://localhost:5000 可以看到服务端渲染的前端网站，当然可能该网站是个空数据网站，可以查看目录下的 `./app/api/v1` 下的接口或者看 doc 目录下的 markdown 接口文档，在 postman 测试接口。


以下是启动后台管理系统的操作命令：
```
# 启动后台管理系统
1. 在根目录下进入admin项目：cd admin，
2. 安装包，执行: npm install 或者 yarn install 命令，
3. 启动服务: npm run dev 或者 yarn dev; 浏览器打开：http://localhost:9528/ 即可以访问。
```

## 五、FAQ
1. 没有yarn环境，npm 可以吗？
> 答：可以的，建议使用 yarn，yarn 比 npm 速度快，主要是安装版本统一。

2. 启动 Koa2 项目报错，请问原因？
> 答：首先，请检查一下使用 npm 或 yarn 安装依赖包没。然后，再请检查一下确保安装好数据库，新建好数据库：boblog，请看上面的数据库配置。最后看下启动打印日志是否有报错的信息。
3. ... 更多问题请到 [Issues](https://github.com/lfb/nodejs-koa-blog/issues)查阅，或者有问题请到 [Issues 提问](https://github.com/lfb/nodejs-koa-blog/issues/new)。

## License

项目已实现管理员、权限管理、文章、分类、评论等接口，前端模板网站和后台管理系统。自己可以根据项目代码学习，可以到 postman 软件中测试API或学习。

喜欢或对你有帮助的话，请你点一个星星 <strong style='color:red;'>star</strong> 鼓励我，或者您有更好的建议和意见，请提出来告知我，可以留言 [Issues](https://github.com/lfb/nodejs-koa-blog/issues/new)。希望能够帮助到你学习！Thanks！共勉！

[MIT](https://github.com/lfb/nodejs-koa-blog/blob/master/LICENSE), by 梁凤波

