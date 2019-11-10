<template>
  <section class="articles">

    <article class="articles-list">
      <ul class="articles-inner">
        <li class="box-header">
          <div class="box-header-title">
            <Icon type="md-list-box" class="icon" size="20"/>
            文章列表
          </div>
          <div class="box-header-more">
            更多
          </div>
        </li>
        <li class="articles-item" v-for="(item, index) in 10" :key="index" @click="toArticle(index)">
          <div class="articles-item-info">
            <h1 class="articles-item-title">今晚学习 Node.js 吗？</h1>
            <div class="articles-item-description">
              CMU 中国社区希望输出 CMU 在 AI 领域的影响力，关注 AI 领域的技术创新、产业应用，知识传播、创投趋势。
            </div>
            <ul class="articles-item-intro">
              <li class="articles-item-category">node.js</li>
              <li class="articles-item-author">
                <Icon size="16" type="ios-person-outline"/>
                梁凤波
              </li>
              <li class="articles-item-browse">
                <Icon size="16" type="ios-eye-outline"/>
                100
              </li>
              <li class="articles-item-comment">
                <Icon size="16" type="ios-text-outline"/>
                100
              </li>
            </ul>
          </div>
          <div class="articles-images">
            <img src="http://cdn.boblog.com/FmdNNoR1MRtgvmQD1KwaKzbkL_i7?imageView2/1/w/100/h/100" alt="articles">
          </div>
        </li>
      </ul>
    </article>

    <article class="articles-category">
      <div class="articles-box">
        <div class="box-header">
          <div class="box-header-title">
            <Icon type="ios-apps" class="icon" size="20"/>
            分类
          </div>
        </div>
        <div class="articles-box-content">
          <ul>
            <li>
              <Icon class="icon" style="color: #e34c24;" type="logo-html5"/>
              html（ 10 ）
            </li>
            <li>
              <Icon class="icon" style="color: #006fba;" type="logo-css3"/>
              css（ 15 ）
            </li>
            <li>
              <Icon class="icon" style="color: #f0da4e;" type="logo-javascript"/>
              javascript（ 32 ）
            </li>
            <li>
              <Icon class="icon" style="color: #8cc84b" type="logo-nodejs"/>
              Node.js（ 93 ）
            </li>
            <li>Vue.js（ 1 ）</li>
            <li>HTTP（ 1 ）</li>
            <li>数据结构与算法</li>
          </ul>
        </div>
      </div>
      <div class="articles-box">
        <div class="box-header">
          <div class="box-header-title">
            <Icon class="icon" type="ios-link" size="20"/>
            链接
          </div>
        </div>
        <div class="articles-box-content">
          <ul>
            <li>
              <Icon class="icon" type="logo-github"/>
              Github
            </li>
            <li>
              慕课网
            </li>
            <li>
              coding.net
            </li>
          </ul>
        </div>
      </div>

    </article>

  </section>
</template>

<script>
  export default {
    name: 'list',
    methods: {
      /**
       * 路由跳转
       * @param id
       */
      // toArticle(id) {
      //   this.$router.push(`/article/detail?id=${id}`)
      // }
    }
  }
</script>

<style scoped lang="less">
  .articles {
    width: @window-Width;
    display: flex;
    margin: 24px auto;
  }

  .articles-list {
    flex: 1;
    margin-right: 24px;
  }

  .articles-inner {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 1px 2px 3px #f0f0f0;
    background: #fff;
  }

  .articles-item {
    cursor: pointer;
    padding: 24px;
    display: flex;
    border-bottom: 1px solid #f6f6f6;
    transition: 0.12s ease-in;

    &:hover {
      background: #f6f6f6;
    }

    &:hover .articles-item-title {
      color: #2d8cf0;
    }
  }

  .articles-item-info {
    flex: 1;
  }

  .articles-item-title {
    color: #17233d;
    font-size: 22px;
    font-weight: 500;
  }

  .articles-item-description {
    color: #808695;
    padding: 24px 0;
  }

  .articles-item-intro {
    display: flex;
    align-items: center;
  }

  .articles-item-intro li {
    display: inline-block;
    margin-right: 24px;
    font-size: 16px;
    color: #9ea7b4;
    white-space: nowrap;
  }

  .articles-item-intro .articles-item-category {
    height: 28px;
    line-height: 28px;
    padding: 0 24px;
    font-size: 16px;
    color: #409EFF;
    border-radius: 64px;
    background: rgba(51, 119, 255, .1);
  }

  .articles-images {
    width: 100px;
    margin-left: 24px;

    & img {
      width: 100%;
      border-radius: 6px;
    }
  }

  .articles-category {
    width: 350px;
  }

  .articles-box {
    margin-bottom: 24px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 1px 2px 3px #f0f0f0;
    background: #fff;
  }

  .box-header {
    display: flex;
    justify-content: space-between;
    padding: 16px 24px;
    align-items: center;
    border-bottom: 1px solid #f8f8f8;
  }

  .box-header .icon {
    color: #2f8cf0;
  }

  .box-header-title {
    color: #515a6e;
    font-size: 26px;
    font-weight: 500;
  }

  .box-header-more {
    font-size: 18px;
    color: #989898;
    cursor: pointer;

    &::after {
      content: "";
      display: inline-block;
      width: 12px;
      height: 12px;
      border-top: 1px solid #D9D9D9;
      border-right: 1px solid #D9D9D9;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }

    &:hover {
      color: #2d8cf0;
      text-decoration: underline;
    }
  }

  .articles-box-content {
    padding: 24px;
  }

  .articles-box-content ul li {
    cursor: pointer;
    margin-bottom: 24px;
    font-size: 16px;
    color: #657180;
    display: flex;
    align-items: center;

    &:hover {
      color: #409EFF;
    }
  }

  .articles-box-content ul li:last-child {
    margin-bottom: 0;
  }

  .icon {
    margin-right: 10px;
  }
</style>
