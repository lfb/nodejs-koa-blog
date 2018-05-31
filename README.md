
# nodejs-koa2-mysql 做后端接口

- 使用nodejs-koa2-mysql后台接口功能
- 已实现登录注册接口，文章增删改查接口
- jwt身份验证，中间件，参数处理
- 使用koa2 + mysql
- 操作mysql数据库ORM选择sequelize
- 身份验证使用jwt
- 异步处理async/await
- 喜欢或对你有帮助的话请点star✨✨，Thanks.

#### 学习使用

##### git clone
- git clone https://github.com/liangfengbo/nodejs-koa2-mysql.git

##### 安装包

```
npm install
```

#### 开启服务

```
npm start
```

#### 使用接口（在router/index.js），开启服务后，可以用postman软件测试接口

```js
const router = new Router({
    prefix: '/api/v1'
})

/**
 * 用户接口
 */
// 用户注册
router.post('/createUser', UserController.createUser);
// 获取用户信息
router.get('/userInfo', UserController.getUserName);
// 用户登录
router.post('/login', UserController.postLogin);

/**
 * 文章接口
 */
// 创建文章
router.post('/article', ArticleController.createArticle);
// 获取文章列表
router.get('/article', ArticleController.getArticleList);
// 获取文章详情
router.get('/article/:id', ArticleController.getArticleDetail);
// 删除文章
router.delete('/article/:id', ArticleController.deleteArticle);
// 更改文章
router.put('/article/:id', ArticleController.updateArticle);

/**
 * 导航接口
 */
// 创建导航
router.post('/nav', NavController.createNav);
// 获取导航列表
router.get('/nav', NavController.getNavlist);
// 获取导航详情
router.get('/nav/:id', NavController.getNavDetail);
// 删除导航
router.delete('/nav/:id', NavController.deleteNav);
// 更改导航
router.put('/nav/:id', NavController.updateNav);

```


#### 项目主要文件

schema文件
```
创建数据库表
```

modules文件

```
model层 - 主要处理参数
```

controllers文件

```
控制器 - 处理数据库增删改查
```

#### router 文件

```
路由
```

#### app.js

```
入口文件
```

#### 项目身份验证使用了jwt，就是说登录注册和获取用户信息不用jwt验证，其他接口都需要token验证

比如注册用户接口：在postman软件操作接口

#### 注册

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

#### 注册

```js
post 请求

http://localhost:3000/api/v1/login?username=梁凤波bo&password=bobo12345
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

