<template>
  <section class="articles">

    <article class="article-list">
      <!-- 专栏组件-->
      <v-column-item/>
    </article>

    <!-- 侧边栏 -->
    <v-main-sidebar/>
  </section>
</template>

<script>
  import VColumnItem from '../../components/column-item'
  import VMainSidebar from '../../components/main-sidebar'

  export default {
    components: {
      VColumnItem,
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
    margin: 24px auto;
    min-height: 80vh;
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
