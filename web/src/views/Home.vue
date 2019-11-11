<template>
  <section class="home-wrap">

    <article class="column-articles-list">

      <!-- 专栏 -->
      <div class="column">
        <div class="sidebar-header">
          <div class="sidebar-header-title">
            <Icon class="icon" type="md-book" size="20"/>
            专栏
          </div>
          <div class="sidebar-header-more">
            更多
          </div>
        </div>
        <!-- 专栏组件 -->
        <v-column-item/>
      </div>

      <!-- 文章 -->
      <article class="articles">
        <div class="sidebar-header">
          <div class="sidebar-header-title">
            <Icon type="md-list-box" class="icon" size="20"/>
            文章
          </div>
          <div class="sidebar-header-more">
            更多
          </div>
        </div>
        <!-- 文章组件-->
        <v-article-item/>

        <div class="page">
          <Page :total="100" />
        </div>
      </article>
    </article>

    <!-- 侧边栏 -->
    <v-main-sidebar/>
  </section>
</template>

<script>
  import VColumnItem from '../components/column-item'
  import VArticleItem from '../components/article-item'
  import VMainSidebar from '../components/main-sidebar'

  export default {
    components: {
      VColumnItem,
      VArticleItem,
      VMainSidebar
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
    margin-right: 24px;
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

  .icon {
    margin-right: 10px;
  }
</style>
