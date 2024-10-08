const Router = require('koa-router')
const router = new Router()

router.get('/', async ctx => {
    ctx.body = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Hello Node.js</title>
    <style>
        body {
            line-height: 1em;
        }
        .container {
            width: 66%;
            margin: 32px auto;
        }

        li {
            margin: 24px 0;
        }
        h1 {
            font-size: 30px;
        }
        h2 {
            font-size: 20px;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>欢迎您， 来到 Koa.js 世界！</h1>
    <h2>使用手册</h2>
    <ul>
        <li>可以先看看接口问题：<a target="_blank" href="https://github.com/lfb/nodejs-koa-blog/tree/master/doc">Documents</a>
        </li>
        <li>本地下载好 Postman API 调试工具：<a target="_blank" href="https://www.postman.com/downloads/">Download Postman</a>
        </li>
    </ul>
    <h2>接口说明</h2>
    <ul>
        <li>按模块进行拆解，前缀是 <strong>/api/v1</strong> 开头，比如获取文章列表，整个API请求是：<a target="_blank" href="/api/v1/article">/api/v1/article</a>
        </li>
        <li>比如获取分类列表，整个API请求是：<a target="_blank" href="/api/v1/category">/api/v1/category</a>，其他模块一样，建议在 Postman 工具进行调试</li>

    </ul>
    <h2>特别说明</h2>
    <div>有些接口需要登录token权限才能操作，如何获取 token 呢？</div>
    <ul>
        <li>
            首先，在管理员的文档中：<a target="_blank" href="https://github.com/lfb/nodejs-koa-blog/blob/master/doc/admin.md">管理员接口文档</a>
            我们找到注册管理员的接口，在 postman 进行注册一个账号
        </li>
        <li>
            注册成功后，进行登录会返回 token，然后把 token 复制一下
        </li>
        <li>
            最后配置一下 POSTMAN，请看图
        </li>
        <li>
            <img width="100%" src="https://cdn.boblog.com/18711670210885_.pic.jpg" alt="nodejs-koa-blog">
        </li>
    </ul>
</div>
</body>
</html>
`
})

module.exports = router
