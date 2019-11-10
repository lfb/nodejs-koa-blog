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
            推荐
          </div>
        </div>
        <div class="articles-box-content">
          <ul>
            <li class="articles-box-content-item" v-for="(item, index) in 5" :key="index">
              <h1>数据结构与算法</h1>
              <span></span>
            </li>
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
            <li class="articles-box-content-item">
              <div>
                <Icon class="icon" type="logo-github"/>
                Github
              </div>
            </li>
            <li class="articles-box-content-item">
              慕课网
            </li>
            <li class="articles-box-content-item">
              coding.net
            </li>
          </ul>
        </div>
      </div>

    </article>

  </section>
</template>

<script>
  import VColumnItem from '../components/column-item'
  import VArticleItem from '../components/article-item'

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

  .articles-box-content-item {
    cursor: pointer;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #657180;

    &:hover {
      color: #2d8cf0;
    }
  }

  .articles-box-content-item h1 {
    font-size: 16px;
    font-weight: 400;
  }

  .articles-box-content-item span {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-top: 1px solid #D9D9D9;
    border-right: 1px solid #D9D9D9;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .recommend:last-child {
    margin-bottom: 0;
  }

  .icon {
    margin-right: 10px;
  }
</style>
