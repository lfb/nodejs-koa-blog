<template>
  <section class="author">
    <article class="item">
      <h1 class="logo">
        <img src="../../assets/images/LOGO.png" alt="LOGO">
      </h1>
    </article>
    <article class="text">
      <p>
        我叫梁凤波，职业是一名前端工程师，这个博客属于我的个人博客网站，同时也在 <a href="https://github.com/liangfengbo/nodejs-koa-blog" target="_blank">
        Github </a>开源了此项目代码，
        我的名字后面有个“波”字，所以起名为：波博客 - <strong>boblog.com</strong>，我相信你肯定能很快记住这个域名，毕竟这个老域名是2001年注册的，那时我还没上学呢，我是从一个非常豪爽、耍酷、帅气的大叔购买得到的。
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

<script>
  export default {
    created() {
      document.title = `波博客 - boblog.com`
    }
  }
</script>

<style scoped lang="scss">
  .author {
    box-sizing: border-box;
    width: 70%;
    min-height: 80vh;
    margin: 24px auto;
    padding-bottom: 24px;
    background-color: white;
  }

  .item {
    width: 100%;
    padding: 48px 0;
    text-align: center;
    background: white;
  }

  .logo {
    width: 360px;
    margin: 0 auto;

    & img {
      width: 100%;
    }
  }

  a {
    color: #409EFF;
  }

  .text {
    padding: 0 24px 24px;
    line-height: 42px;
    font-size: 20px;
    color: #666;
    text-indent: 2em;
  }

  .content {
    padding-top: 24px;
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
