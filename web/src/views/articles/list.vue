<template>
  <section class="articles">

    <article class="article-list">
      <!-- 文章组件-->
      <v-article-item/>

      <div class="page">
        <Page :total="100" />
      </div>
    </article>

    <!-- 侧边栏 -->
    <v-main-sidebar/>
  </section>
</template>

<script>
  import VArticleItem from '../../components/article-item'
  import VMainSidebar from '../../components/main-sidebar'

  export default {
    components: {
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
  .articles {
    width: @window-Width;
    display: flex;
    min-height: 80vh;
    margin: 24px auto;
  }

  .article-list {
    flex: 1;
    margin-right: 32px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 1px 2px 3px #f0f0f0;
    background: #fff;
  }
</style>
