
# nodejs-koa2-mysql-sequelize-jwt

- 技术栈：nodejs, koa2, mysql, sequelize, jwt
- 项目数据层和操作层分明
- 使用koa2框架中间件，参数处理
- jwt做权限接口验证
- sequelize管理mysql数据库
- 异步处理async/await
- 已实现用户登录注册接口，文章增删改查接口
- 喜欢或对你有帮助的话请点star✨✨，或有您有更好的建议和意见，请提出来告知我，可以留言issues，可以加我QQ: 841053515, Thanks.

### 注：学习详细教程：[Koa2从0搭建到实现文章API接口 https://www.imooc.com/article/80671](https://www.imooc.com/article/80671)

### 一、学习使用


git clone

```
git clone https://github.com/liangfengbo/nodejs-koa2-mysql-sequelize-jwt.git
```

1.1.安装

```
npm install
```

1.2.需要在config文件下db.js配置本地数据库
```
const sequelize = new Sequelize('数据库', '数据库用户名', '数据库密码', {})

别忘了创建数据库，黑窗口登录msyql：create database '数据库用户名'
```


1.3.开启服务

```
npm start
```

#### 二、路由说明

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
router.get('/article/list', ArticleController.getArticleList);
```


# 服务器地址

```
http://localhost:3000/api/v1
```

## 一、注册接口

```
/user/register
```

#### 请求方式

```
POST
```

#### 参数


参数 | 说明 | 必填 | 类型
---|---|---|---
username | 用户名 | 是 | String
password | 密码 | 是 | String

#### 示例

```
http://localhost:3000/api/v1/user/register
```

#### 返回结果


```
{
    "code": 200,
    "msg": "创建用户成功",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvYiIsImlkIjo0LCJpYXQiOjE1MzUzNzcyMTcsImV4cCI6MTUzNTM4MDgxN30.AqlVBYV_AGpuzvUo6KjHAXlKkYbsuja10EH-eU_u88Q"
}
```

## 二、登录接口

```
/user/login
```

#### 请求方式

```
POST
```

#### 参数

参数 | 说明 | 必填 | 类型
---|---|---|---
username | 用户名 | 是 | String
password | 密码 | 是 | String


#### 返回结果

```
{
    "code": 200,
    "msg": "登录成功",
    "data": {
        "id": 4,
        "username": "Bob",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvYiIsImlkIjo0LCJpYXQiOjE1MzUzNzczODksImV4cCI6MTUzNTM4MDk4OX0.1wM7Y7wDC-Ly9V5Vm-el_CW85IfcN41JrmcPPvipLEA"
    }
}
```




## 三、获取用户信息接口

```
/user/info
```

#### 请求方式

```
GET
```

#### 参数


参数 | 特别说明
---|---
Authorization |  JWT验证是报文headers带过来的token参数，格式为：Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvYiIsImlkIjo0LCJpYXQiOjE1MzUzNzczODksImV4cCI6MTUzNTM4MDk4OX0.1wM7Y7wDC-Ly9V5Vm-el_CW85IfcN41JrmcPPvipLEA

处理jwt验证时候，我添加了方法

```
// |-app.js文件下
// 过滤不用jwt验证
app.use(jwt({secret: secret.sign}).unless({
    path: [
        // 注册接口
        /^\/api\/v1\/user\/register/,
        // 登录接口
        /^\/api\/v1\/user\/login/
    ]
}))

```

#### 需要从headers的Authorization带上Bearer + token

```
Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvYiIsImlkIjo0LCJpYXQiOjE1MzUzNzczODksImV4cCI6MTUzNTM4MDk4OX0.1wM7Y7wDC-Ly9V5Vm-el_CW85IfcN41JrmcPPvipLEA
```

登录注册都会返回token信息，用户信息，删除，更新都需要传递token验证

```
{
    "code": 200,
    "msg": "登录成功",
    "data": {
        "id": 4,
        "username": "Bob",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvYiIsImlkIjo0LCJpYXQiOjE1MzUzNzczODksImV4cCI6MTUzNTM4MDk4OX0.1wM7Y7wDC-Ly9V5Vm-el_CW85IfcN41JrmcPPvipLEA"
    }
}
```

在header中加入token才能获取到接口信息，而且token有效期是1个小时就失效。


#### 成功返回数据

```
{
    "code": 200,
    "msg": "查询成功",
    "data": {
        "id": 4,
        "username": "Bob"
    }
}
```

## 四、获取用户列表

```
/user/list
```

#### 请求方式

```
GET
```

#### 返回成功数据

```
{
    "code": 200,
    "msg": "查询成功",
    "data": [
        {
            "id": 1,
            "username": "梁凤波"
        },
        {
            "id": 2,
            "username": "梁凤波1"
        },
        {
            "id": 3,
            "username": "梁凤波11"
        },
        {
            "id": 4,
            "username": "Bob"
        }
    ]
}
```

## 五、删除用户接口

```
/user/delete/:id
```

#### 请求方式

```
DELETE
```

参数 | 说明 | 必填 | 类型
---|---|---|---
id | 用户id | 是 | Number

#### 示例

```
http://localhost:3000/api/v1/user/delete/1
```

#### 删除成功返回数据

```
{
    "code": 200,
    "msg": "删除用户成功"
}
```

## 六、创建文章接口

```
/article/create
```

#### 请求方式

```
POST
```

#### 参数

参数 | 说明 | 必填 | 类型
---|---|---|---
title | 文章标题 | 是 | String
introduction | 文章简介 | 是 | String
author | 作者 | 是 | String
content | 文章内容 | 是 | String
tag | 文章标签 | 是 | String
category | 文章分类 | 是 | String
recommend | 是否为推荐 | 否 | Boolean
browser | 浏览次数 | 否 | Number

#### 返回成功结果

```
{
    "code": 200,
    "msg": "创建文章成功",
    "data": {
        "createdAt": "2018-08-27 21:52:11",
        "updatedAt": "2018-08-27 21:52:11",
        "id": 1,
        "title": "js创建对象的方法",
        "introduction": "原型模式",
        "author": "梁凤波",
        "tag": "原型链",
        "content": "我们创建的每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那么prototype就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。",
        "category": "javascript",
        "recommend": false,
        "browser": 0
    }
}
```


#### 如果返回401错误结果，需要从headers的Authorization带上Bearer + token

```
{
    "code": 401,
    "msg": "unauthorized，请求需要用户的身份认证！"
}
```

#### 传递token格式示范

```
Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvYiIsImlkIjo0LCJpYXQiOjE1MzUzNzczODksImV4cCI6MTUzNTM4MDk4OX0.1wM7Y7wDC-Ly9V5Vm-el_CW85IfcN41JrmcPPvipLEA
```

处理jwt验证时候，我添加了方法

```
// 过滤不用jwt验证
app.use(jwt({secret: secret.sign}).unless({
    path: [
        // 注册接口
        /^\/api\/v1\/user\/register/,
        // 登录接口
        /^\/api\/v1\/user\/login/
    ]
}))

```

登录注册都会返回token信息，除了这两个接口必须要发送header头

在header中加入token

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuaigeWHpOazomJvIiwiaWQiOjUsImlhdCI6MTUyNzczNjc2NSwiZXhwIjoxNTI3NzQwMzY1fQ.y5w4lEFRf8bpR4fFPNDms1m9WSX9mfQ3fo5dejG7y3A
```

才能获取到接口信息，而且token有效期是1个小时就失效。

## 七、获取文章列表

```
/article/list
```


#### 请求方式

```
GET
```

#### 参数

#### 参数

参数 | 说明 | 必填 | 类型 | 示例
---|---|---|---|---
page | 分页查询 | 否 | Number | http://localhost:3000/api/v1/article/list?page=2
category | 分类查询 | 否 | String | http://localhost:3000/api/v1/article/list?category=javascript

### 查询成功返回数据

```
{
    "code": 200,
    "msg": "查询文章列表成功！",
    "data": {
        "code": 200,
        "data": [
            {
                "createdAt": "2018-08-27 21:52:11",
                "updatedAt": "2018-08-27 21:52:11",
                "id": 1,
                "title": "js创建对象的方法",
                "introduction": "原型模式",
                "author": "梁凤波",
                "tag": "原型链",
                "content": "我们创建的每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那么prototype就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。",
                "category": "javascript",
                "recommend": false,
                "browser": 0
            }
        ],
        "meta": {
            "current_page": 1,
            "per_page": 10,
            "count": 1,
            "total": 1,
            "total_pages": 1
        }
    }
}
```

#### 文章列表分页说明


字段 | 说明
---|---
current_page | 当前页码
per_page | 一页代码有多少篇文章数据，默认10条
count | 全部文章总篇数
total_pages | 全部分页数



```
"meta": {
    "current_page": 1,
    "per_page": 10,
    "count": 1,
    "total": 1,
    "total_pages": 1
}
```


## 八、更新文章

```
/article/update/:id
```

#### 请求方式

```
PUT
```

#### 参数

参数 | 说明 | 必填 | 类型
---|---|---|---
id | 文章id | 必填 | Number
title | 文章标题 | 是 | String
introduction | 文章简介 | 是 | String
author | 作者 | 是 | String
content | 文章内容 | 是 | String
tag | 文章标签 | 是 | String
category | 文章分类 | 是 | String
recommend | 是否为推荐 | 否 | Boolean
browser | 浏览次数 | 否 | Number



#### 示例

```
http://localhost:3000/api/v1/article/update/1
```

#### 返回成功数据

```
{
    "code": 200,
    "msg": "更新文章成功！",
    "data": {
        "createdAt": "2018-08-27 21:52:11",
        "updatedAt": "2018-08-27 22:02:00",
        "id": 1,
        "title": "我们来学习创建js的对象方法",
        "introduction": "原型模式",
        "author": "梁凤波",
        "tag": "原型链",
        "content": "我们创建的每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那么prototype就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。",
        "category": "javascript",
        "recommend": false,
        "browser": 0
    }
}
```

## 九、删除文章

```
/article/delete/:id
```

#### 请求方式

```
DELETE
```

#### 参数

参数 | 说明 | 必填 | 类型
---|---|---|---
id | 文章id | 必填 | Number



#### 示例

```
http://localhost:3000/api/v1/article/delete/1
```

#### 返回成功数据

```
{
    "code": 200,
    "msg": "删除文章成功！"
}
```

学习参考链接：

[koa2 实现jwt认证 作者日暮途远_ https://www.jianshu.com/p/176198fbdb35](https://www.jianshu.com/p/176198fbdb35)

[基于 Egg.js 框架的 Node.js 服务构建之用户管理设计](https://zhaomenghuan.github.io/blog/nodejs-eggjs-usersytem.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%98%AF-egg-js-%EF%BC%9F)

如果对你学习nodejs有帮助，请给个星星star✨✨谢谢
