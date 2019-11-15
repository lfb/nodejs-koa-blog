<template>
  <section class="home-wrap">

    <article class="column-articles-list">
      <!-- 专栏 -->
      <div class="column" v-if="column.length > 0">
        <div class="sidebar-header">
          <div class="sidebar-header-title">
            <Icon class="icon" type="md-book" size="18"/>
            专栏
          </div>
          <div class="sidebar-header-more" @click="goLink('/column')">
            更多
          </div>
        </div>
        <!-- 专栏组件 -->
        <v-column-item :list="column"/>
      </div>

      <!-- 文章 -->
      <article class="articles" v-if="article.length > 0">
        <div class="sidebar-header">
          <div class="sidebar-header-title">
            <Icon type="md-list-box" class="icon" size="18"/>
            文章
          </div>
          <div class="sidebar-header-more" @click="goLink('/articles')">
            更多
          </div>
        </div>
        <!-- 文章组件-->
        <v-article-item :list="article"/>
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
  import home from '../api/home'

  export default {
    components: {
      VColumnItem,
      VArticleItem,
      VMainSidebar
    },
    name: 'list',
    created() {
      this.fetchData()
    },
    data() {
      return {
        article: [],
        column: []
      }
    },
    methods: {
      async fetchData() {
        const r = await home.data()
        this.article = r.data.data.article
        this.column = r.data.data.column
      },
      /**
       * 路由跳转
       * @param path
       */
      goLink(path) {
        this.$router.push(path)
      }
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

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .home-wrap {
      width: 100%;
    }

    .column-articles-list {
      margin-right: 0;
    }
  }
</style>
