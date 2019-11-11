<template>
  <section class="articles">

    <article class="article-list">
      <!-- 专栏组件-->
      <v-column-item :isButton="isButton"/>
      <div class="chapter">
        <v-column-chapter/>
      </div>
    </article>

    <!-- 侧边栏 -->
    <v-main-sidebar/>
  </section>
</template>

<script>
  import VColumnItem from '../../components/column-item'
  import VColumnChapter from '../../components/column-chapter'
  import VMainSidebar from '../../components/main-sidebar'

  export default {
    components: {
      VColumnItem,
      VColumnChapter,
      VMainSidebar
    },
    name: 'list',
    data () {
      return {
        isButton: false,
        list: []
      }
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  .articles {
    width: @window-Width;
    display: flex;
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

  .chapter {
    padding: 24px;
  }
</style>
