## Node.js
- Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 
- Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

简单来说：Node.js就是可以让JS脱离浏览器能够运行，而且能操作文件数据库等高级应用开发功能。

## Koa
- Koa是Node.js的一个开发框架，其最大的特点是精简和强大的中间件。
- 在Koa中，一切的流程都是中间件，数据流向遵循洋葱模型，先入后出，是按照类似堆栈的方式组织和执行。

## Koa安装

```
# 安装
npm intall koa

# 核心依赖
"dependencies": {
  "axios": "^0.18.0",
  "basic-auth": "^2.0.1",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^8.4.0",
  "koa": "^2.7.0",
  "koa-bodyparser": "^4.2.1",
  "koa-router": "^7.4.0",
  "koa-static": "^5.0.0",
  "lodash": "^4.17.11",
  "mysql2": "^1.6.5",
  "npm-check": "^5.9.0",
  "require-directory": "^2.1.1",
  "sequelize": "^5.6.1",
  "validator": "^10.11.0"
},
```

## Koa启动
```js
const Koa = require('koa')

const app = new Koa()

app.use(() => {
    console.log("Hello Koa2")
})

app.listen(3000)
```

## Koa中间件
koa2一切都是中间件，
koa2 的中间件是洋葱模型。基于async/await 可以更好的处理异步操作。
![img](http://www.json119.com/content/images/2018/10/1.png)

1. 一个请求到一旦到后端，就开始接触洋葱的最外层。
2. 遇到一个next()，就进入下一层。不过值得提醒的是，异步函数的next(),与同步函数的next(),不是在同一个空间的，我们可以假想一个“异步空间栈”，后入先出。
3. 什么时候到洋葱中心？就是遇到的第一个没有next的中间件，或者遇到一个中间件报错，就会把这个中间件当成中心，因为遇到错误了，不会再继续往里面走。这个时候，就开始向洋葱的外层开始走了。如果第一个中间件就没有next，直接返回的。那么就不存在洋葱模型。
4. 一层一层外面走的时候，就先走位所有的同步中间件，再依次走“异步空间栈”的中间件。

来源：[白话koa2的洋葱模型](http://www.json119.com/li-jie-koa2de-yang-cong-mo-xing/)

例子：
```js
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    // cxt 上下文 洋葱模型
    // next 下一个中间件
    console.log(1)
    await next()
    console.log(2)
})

app.use(async (ctx, next) => {
    console.log(3)
    await next()
    console.log(4)
})

app.listen(3000)
```
输出的顺序是： 1 3 4 2


## koa-router
[路由管理模块：koa-router](https://www.npmjs.com/package/koa-router)

```js
var Koa = require('koa');
var Router = require('koa-router');
 
var app = new Koa();
var router = new Router();
 
router.get('/', (ctx, next) => {
  // ctx.router available
});
 
app
  .use(router.routes())
  .use(router.allowedMethods());
```

## require-directory

自动加载路由模块

```js
const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
const requireDirectory = require('require-directory')

// 绝对路径
const apiDirectory = `${process.cwd()}/app/api`
requireDirectory(module, apiDirectory, {
    visit: whenLoadModule
})

// 判断 requireDirectory 加载的模块是否为路由
function whenLoadModule(obj) {
    if (obj instanceof Router) {
        app.use(obj.routes())
    }
}
```

##  nodemon
它的作用监听文件的改动变化，当代码改变后，会自动重启。
```
# 全局安装
cnpm install -g  nodemon

# package.json配置
"scripts": {
    "dev": "nodemon app.js"
    // ..,
}

# 使用启动
npm run dev
```

## api版本

版本，业务变动，兼容

api携带版本号：1.路径，2.查询参数，3.header

开闭原则：修改是关闭，扩展开放

## 好的代码

- 阅读
- 利于维护
- 提高编程效率

编程=》主题=》拆分=》文件


## 错误处理
思路：首先：在路由处理时抛出错误，然后定义一个错误的构造类来抛出对应的错误，最后定义一个全局的中间件来捕获错误进行处理

```js
// 首先定义错误类
class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        // ...
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
       // ...
    }
}

// 然后抛出对应的类型错误
throw new ParameterException()

// 最后全局处理错误的中间件捕获错误并且进行抛出错误
const catchError = async (ctx, next) => {
    try {
        await next()

    } catch (error) {
        if (error instanceof HttpException) {
            // ...

        } else {
            // ...
        }
    }
}
```

## Sequelize

步骤：建立数据库，创建模型，操作模型

建立数据库

```js

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        // create_time && update_time
        timestamps: true,
        // delete_time
        paranoid: true,
        createdAt: 'create_at',
        updatedAt: 'update_at',
        deletedAt: 'delete_at',
        // 把驼峰命名转换为下划线
        underscored: true
    }
})

// 创建模型
sequelize.sync({
    force: false
})
```

创建模型

```js
// 定义用户模型
class User extends Model {

}

// 初始用户模型
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
}, {
    sequelize,
    tableName: 'user'
})
```

## LinValidator

参数校验器

```js

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要正整数', {min: 1})
        ]
    }
}
```
