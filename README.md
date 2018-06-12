
# nodejs-koa2-mysql-sequelize-jwt

- 技术栈：nodejs, koa2, mysql, sequelize, jwt
- 项目数据层和操作层分明
- 使用koa2框架中间件，参数处理
- jwt做权限接口验证
- sequelize管理mysql数据库
- 异步处理async/await
- 已实现登录注册接口，文章增删改查接口
- 喜欢或对你有帮助的话请点star✨✨，或有您有更好的建议和意见，请提出来告知我，可以留言issues，可以加我QQ: 841053515, Thanks.

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
router.post('/user', UserController.create);
// 用户登录
router.post('/user/login', UserController.login);
// 获取用户信息
router.get('/user', UserController.getUserInfo);
// 获取用户列表
router.get('/user/list', UserController.getUserList);
// 删除用户
router.delete('/user/:id', UserController.delete);

/**
 * 文章接口
 */
// 创建文章
router.post('/article', ArticleController.create);
// 获取文章列表
router.get('/article', ArticleController.getArticleList);
// 获取文章详情
router.get('/article/:id', ArticleController.detail);
// 删除文章
router.delete('/article/:id', ArticleController.delete);
// 更改文章
router.put('/article/:id', ArticleController.update);

```

#### 三、接口说明（用户接口）

##### 创建用户接口

```
/user
```
3.1.请求方式

```
post
```
3.2.请求参数


参数 | 说明 | 需求
---|--- |---
username | 用户名 | 必填
password | 密码 | 必填

3.3.返回数据

```
{
    "code": 200,
    "msg": "创建用户成功",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvYiIsImlkIjozLCJpYXQiOjE1Mjg3NzUzOTMsImV4cCI6MTUyODc3ODk5M30.cnWcgJQF1z7adgKp49AgP4UvpqIXUNjGfjWLMq-rMeA"
}
```

##### 登录接口

```
/user/login
```
3.4.请求方式

```
post
```
3.5.请求参数


参数 | 说明 | 需求
---|--- |---
username | 用户名 | 必填
password | 密码 | 必填

3.6.返回数据

```
{
    "code": 200,
    "msg": "登录成功",
    "data": {
        "id": 3,
        "username": "Bob",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvYiIsImlkIjozLCJpYXQiOjE1Mjg3NzU0NTIsImV4cCI6MTUyODc3OTA1Mn0.v_B_EXvzYTk7Wz-jl4D8F5n5kn2iah8oht0s6S72Zsc"
    }
}
```

##### 获取用户信息

```
/user
```
3.7.请求方式

```
get
```
3.8.说明

token 一定要传

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuaigeWHpOazomJvIiwiaWQiOjUsImlhdCI6MTUyNzczNjc2NSwiZXhwIjoxNTI3NzQwMzY1fQ.y5w4lEFRf8bpR4fFPNDms1m9WSX9mfQ3fo5dejG7y3A
```





3.9.返回数据

```
{
    "code": 200,
    "msg": "查询成功",
    "data": {
        "id": 3,
        "username": "Bob"
    }
}
```

##### 删除用户接口

```
/user/:id
```
3.10.请求方式

```
delete
```
3.11.请求参数


参数 | 说明 | 需求
---|--- |---
id | 用户ID | 必填

3.12.返回数据

```
{
    "code": 200,
    "msg": "删除用户成功"
}
```



#### 四、项目主要文件

4.1.1schema文件
```
创建数据库表
```

4.2.1modules文件

```
model层 - 主要处理参数
```

4.3.1controllers文件

```
控制器 - 处理数据库增删改查
```

4.4.1router 文件

```
路由
```

4.5.1app.js

```
入口文件
```

项目身份验证使用了jwt，就是说登录注册和获取用户信息不用jwt验证，其他接口都需要token验证

比如注册用户接口：在postman软件操作接口，例注册接口：

```
post 请求

http://localhost:3000/api/v1/createUser?username=梁凤波bo&password=bobo12345
```

创建成功后返回信息：

```js
{
    "code": 200,
    "message": "创建成功",
    "bean": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuaigeWHpOazomJvIiwiaWQiOjUsImlhdCI6MTUyNzczNjUzMSwiZXhwIjoxNTI3NzQwMTMxfQ.GAQg-hZm3rDYq70-16sgfNHvD64gmrWSFzQCZQs7bl4"
    }
}
```

注册

```js
post 请求

http://localhost:3000/api/v1/user/login?username=梁凤波bo&password=bobo12345
```
成功返回信息：

```js
{
    "message": "登录成功！",
    "data": {
        "id": 5,
        "username": "梁凤波bo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuaigeWHpOazomJvIiwiaWQiOjUsImlhdCI6MTUyNzczNjc2NSwiZXhwIjoxNTI3NzQwMzY1fQ.y5w4lEFRf8bpR4fFPNDms1m9WSX9mfQ3fo5dejG7y3A"
    },
    "code": 200
}
```


处理jwt验证时候，我添加了方法

```
app.use(jwt({secret: secret.sign}).unless({path: [/^\/api\/v1\/login/, /^\/api\/v1\/createUser/]}))

```

登录注册都会返回token信息，除了这两个接口必须要发送header头

在header中加入token

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuaigeWHpOazomJvIiwiaWQiOjUsImlhdCI6MTUyNzczNjc2NSwiZXhwIjoxNTI3NzQwMzY1fQ.y5w4lEFRf8bpR4fFPNDms1m9WSX9mfQ3fo5dejG7y3A
```

才能获取到接口信息，而且token有效期是1个小时就失效。

具体可以看项目主要几个文件代码，一起学习进步，如果你有什么好的建议或意见，或如有错误恳请指导，请留言，谢谢



学习推荐链接：

[koa2 实现jwt认证 作者日暮途远_ https://www.jianshu.com/p/176198fbdb35](https://www.jianshu.com/p/176198fbdb35)

[基于 Egg.js 框架的 Node.js 服务构建之用户管理设计](https://zhaomenghuan.github.io/blog/nodejs-eggjs-usersytem.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%98%AF-egg-js-%EF%BC%9F)

如果对你学习nodejs有帮助，请给个星星star✨✨谢谢

