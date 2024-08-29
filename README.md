## 一、简介

这里是一个基于 Node.js 开发的博客项目，采用了轻量级的 Koa 框架来构建 API 接口。

通过这个项目，你可以轻松搭建一个简洁高效的博客系统，亲身体验 Node.js 的开发便捷性，深入了解功能强大的 Koa2 中间件，掌握数据如何在前后端之间流转并存储
到 MySQL 数据库中。

这个项目非常适合想学习 Node.js 的朋友，以及希望使用 Node.js 构建个人博客的人，也可以作为计算机专业毕业论文的理想实践项目。

**项目功能包括：**

-   基于 Node.js + Koa.js 的服务端 API 接口：[nodejs-koa-blog](https://github.com/lfb/nodejs-koa-blog)
-   管理后台（Vue.js / React.js）：[vue-blog-admin](https://github.com/lfb/vue-blog-admin),
    [react-blog-admin](https://github.com/lfb/react-blog-admin)
-   前端网站（Vue.js / Nuxt.js）：[nextjs-blog](https://github.com/lfb/nextjs-blog)，[nuxtjs-blog-web](https://github.com/lfb/nuxtjs-blog-web)
-   使用 PM2 进行部署

### 二、技术优点

#### 2.1 项目架构

设计了清晰的分层架构，使项目结构一目了然，便于维护和扩展。

#### 2.2 项目工程化

采用了完整的工程化配置，提高开发效率。包括 eslint 代码规范、环境变量管理、参数自动校验、中间件错误处理等，确保项目开发和运行的高效性和稳定性。

#### 2.3 功能简洁且完善

项目实现了功能全面的博客系统，设计简洁但功能完备，涵盖以下模块：

**核心功能**：

-   管理员权限管理
-   文章分类管理
-   文章内容管理

**重要功能**：

-   数据库操作
-   图片上传与存储
-   Markdown 支持与存储
-   日志记录
-   API 文档生成
-   单元测试

## 三、使用

**3.1.克隆项目代码**

```
https://github.com/lfb/nodejs-koa-blog.git
```

**3.2.创建数据库**

启动项目前一定要在创建好 boblog 数据库，如果你还没安装上数据库，请点击[MySQL 下载](https://dev.mysql.com/downloads/mysql/)，请在根目录下
的`.env.development `文件下修改您本地的数据库名字（DB_NAME）和数据库密码 ( DB_PASSWORD )。

```
# env.development / env.production 文件
# 数据库

DB_NAME = 'boblog'
DB_HOST =  'localhost'
DB_PORT = 3306
DB_USER = 'root'
DB_PASSWORD = 'bobo1024.'
```

以下是执行数据库命令：

```
# 登录数据库

mysql -uroot -p密码

# 创建 boblog 数据库

CREATE DATABASE IF NOT EXISTS boblog2
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**3.3.启动项目**

-   Node.js：v14.15.0（建议v14版本及以上\~）

```
# 进入项目根目录

cd nodejs-koa-blog

# 安装依赖包

npm install 或者 yarn install

# 启动 Node.js Koa2 项目

npm run dev 或者 yarn dev
```

你会看到控制台输出启动地址：`http://localhost:5000 `，就成功了！

## 四、FAQ

4.1. 没有yarn环境，npm 可以吗？

> 答：可以的，建议使用 yarn，yarn 比 npm 速度快，主要是安装版本统一。

4.2. 启动 Koa2 项目报错，请问原因？

> 答：首先，请检查一下使用 npm 或 yarn 安装依赖包没。然后，再请检查一下确保安装好数据库，新建好数据库：boblog，请看上面的数据库配置。最后看下启动 \>
> 打印日志是否有报错的信息。

4.3. ... 更多问题请到 [Issues](https://github.com/lfb/nodejs-koa-blog/issues) 查阅，或者有问题请到
[Issues 提问](https://github.com/lfb/nodejs-koa-blog/issues/new)。

## License

[MIT](https://github.com/lfb/nodejs-koa-blog/blob/master/LICENSE), by LFB

喜欢或对你有帮助的话，请你点一个星星 <strong style="color:red;">star</strong> 鼓励我，或者您有更好的建议和意见，请提出来告知我，可以留言
[Issues](https://github.com/lfb/nodejs-koa-blog/issues/new)。希望能够帮助到你学习！Thanks！共勉！
