## 项目介绍
[![koa](https://img.shields.io/badge/koa-%5E2.7.0-brightgreen.svg) ](https://www.npmjs.com/package/koa)
[![koa-router](https://img.shields.io/badge/koa--router-%5E7.4.0-brightgreen.svg)](https://www.npmjs.com/package/koa-router)
[![sequelize](https://img.shields.io/badge/sequelize-%5E5.6.1-brightgreen.svg)](https://www.npmjs.com/package/sequelize)
[![mysql2](https://img.shields.io/badge/mysql2-%5E1.6.5-brightgreen.svg)](https://www.npmjs.com/package/mysql2)

Node.js + Koa2 + MySQL + Vue.js 实战开发一套完整个人博客项目网站。

## 数据库
启动项目前一定要在创建好 `boblog` 数据库。
```
# 登录数据库
$ mysql -uroot -p密码

# 创建 wxapp 数据库
$ CREATE DATABASE IF NOT EXISTS boblog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 项目使用
首先使克隆项目，然后进入项目根目录使用命令安装包，最后命令启动项目，代码会根据模型自动创建数据库表的。
```
# 克隆项目代码
$ git clone https://github.com/liangfengbo/nodejs-koa-blog.git

# 进入koa项目根目录
$ cd nodejs-koa-blog

# 安装包
$ npm install

# 运行服务
$ npm run dev

# 打开浏览器输入回车：http://localhost:3000
```

## 项目亮点
Koa服务端编程、异步编程、面向对象编程。

- Koa 与 Koa 二次开发API 
- 多 koa-router 拆分路由
- require-directory 自动路由加载
- nodemon修改文件自动重启
- 异步编程，async/await 
- 异步异常链与全局异常处理 
- Sequelize ORM 管理 MySQL
- JWT 权限控制中间件 
- Validator 与 LinValidator 验证器

## 接口说明
- [管理员接口文档说明](./doc/admin.md)
- [文章接口文档说明](./doc/article.md)

## 项目参考资料
- [《纯正商业级应用－Node.js Koa2开发微信小程序服务端》](https://s.imooc.com/SHHXs2R), by 慕课网：7七月老师
- [开源：lin-cms-koa](https://github.com/TaleLin/lin-cms-koa), by TaleLin Team

