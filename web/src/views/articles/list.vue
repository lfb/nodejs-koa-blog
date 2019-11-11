<template>
  <section class="articles">

    <article class="article-list">
      <!-- 文章组件-->
      <v-article-item :list="list"/>

      <div class="page" v-if="page && page.total_pages.length > 1">
        <Page :total="page.total" :page-size="page.per_page" :current="page.current_page" show-total
              @on-change="handlePage"></Page>
      </div>
    </article>

    <!-- 侧边栏 -->
    <v-main-sidebar/>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'
  import merge from 'webpack-merge'
  import VArticleItem from '../../components/article-item'
  import VMainSidebar from '../../components/main-sidebar'

  export default {
    components: {
      VArticleItem,
      VMainSidebar
    },
    name: 'list',
    data() {
      return {
        list: [],
        page: null,
        currentPage: 1
      }
    },
    created() {
      this.getArticle()
    },
    methods: {
      ...mapActions({
        getArticleList: 'articles/getArticleList'
      }),
      async getArticle() {
        const params = {
          page: this.currentPage
        }
        const r = await this.getArticleList(params)
        this.list = r.data.data.data
        this.page = r.data.data.meta
      },
      // 切换分页
      handlePage(page) {
        this.$router.replace({
          query: merge(this.$route.query, {
            page
          })
        })
        this.currentPage = page
        this.getArticle()
      }
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
