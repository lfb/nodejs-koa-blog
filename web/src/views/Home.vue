<template>
  <section class="home-wrap">

    <article class="column-articles-list">

      <!-- 专栏 -->
      <div class="column">
        <div class="box-header">
          <div class="box-header-title">
            <Icon class="icon" type="md-book" size="20"/>
            专栏
          </div>
          <div class="box-header-more">
            更多
          </div>
        </div>
        <!-- 专栏组件 -->
        <v-column-item/>
      </div>

      <!-- 文章 -->
      <article class="articles">
        <div class="box-header">
          <div class="box-header-title">
            <Icon type="md-list-box" class="icon" size="20"/>
            文章
          </div>
          <div class="box-header-more">
            更多
          </div>
        </div>
        <!-- 文章组件-->
        <v-article-item/>
      </article>
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
  import VColumnItem from '@/components/ColumnItem'
  import VArticleItem from '@/components/ArticleItem'

  export default {
    components: {
      VColumnItem,
      VArticleItem
    },
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
  .home-wrap {
    width: @window-Width;
    display: flex;
    margin: 24px auto;
  }

  .column-articles-list {
    flex: 1;
    margin-right: 32px;
  }

  .column {
    background: #fff;
    margin-bottom: 32px;
    border-radius: 10px;
    overflow: hidden;
  }

  .articles {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 1px 2px 3px #f0f0f0;
    background: #fff;
  }

  .articles-category {
    width: 350px;
  }

  .articles-box {
    margin-bottom: 32px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 1px 2px 3px #f0f0f0;
    background: #fff;
  }

  .articles-box-content {
    padding: 24px 32px;
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
