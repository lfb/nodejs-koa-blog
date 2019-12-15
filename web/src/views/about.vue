<template>
  <section class="author">
    <article class="item">
      <h1 class="logo">
        <img src="../assets/images/logo.png" alt="LOGO">
      </h1>
    </article>
    <article class="text">
      <p>
        Hello，欢迎您的来到这里，您可以叫我波波，这个网站属于我的个人博客网站，同时也在 <a href="https://github.com/liangfengbo/nodejs-koa-blog"
                                                      target="_blank">
        Github </a>开源了此项目代码，
        我帮这个博客网站起了个名字：波波博客 - <strong>boblog.com</strong>，而且我相信你肯定能很快记住这个域名，毕竟这个老域名是2001年注册的，那时我还没上学呢，我是从一个非常豪爽、耍酷、帅气的大叔购买得到的。
      </p>
      <p class="content">博客的内容：积极向上的文章。</p>
      <p>博客的愿景：和更多的朋友一起学习进步。</p>
      <p>博客的风格：简约至上。</p>
    </article>
    <article class="end">
      <p>最后，祝大家每天开心，每天幸福！</p>
    </article>
  </section>
</template>

<style scoped lang="less">
  .author {
    box-sizing: border-box;
    width: @window-Width;
    min-height: 80vh;
    margin: 24px auto;
    overflow: hidden;
    padding-bottom: 24px;
    background-color: #fff;
    border-radius: 6px;
  }

  .item {
    width: 100%;
    padding: 48px 0;
    text-align: center;
    background: white;
  }

  .logo {
    width: 320px;
    margin: 32px auto 0;

    & img {
      width: 100%;
    }
  }

  a {
    color: #409EFF;
  }

  .text {
    padding: 0 32px 32px;
    line-height: 42px;
    font-size: 20px;
    color: #666;
    text-indent: 2em;
  }

  .content {
    padding-top: 32px;
  }

  .end {
    line-height: 42px;
    font-size: 20px;
    color: #666;
    text-indent: 2em;
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .author {
      width: 100%;
    }
  }
</style>
