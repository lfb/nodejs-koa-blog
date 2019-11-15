<template>
  <section class="column">

    <article class="column-list">
      <!-- 专栏组件-->
      <v-column-item :list="list"/>

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
  import merge from 'webpack-merge'
  import { mapActions } from 'vuex'
  import VColumnItem from '../../components/column-item'
  import VMainSidebar from '../../components/main-sidebar'

  export default {
    components: {
      VColumnItem,
      VMainSidebar
    },
    name: 'list',
    created() {
      this.fetchData()
    },
    data() {
      return {
        list: [],
        page: null,
        currentPage: 1
      }
    },
    methods: {
      ...mapActions({
        getColumnList: 'column/list'
      }),
      async fetchData() {
        const params = {
          page: this.currentPage
        }
        const r = await this.getColumnList(params)
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
        this.fetchData()
      }
    }
  }
</script>

<style scoped lang="less">
  .column {
    width: @window-Width;
    display: flex;
    margin: 24px auto;
    min-height: 80vh;
  }

  .column-list {
    flex: 1;
    margin-right: 32px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 1px 2px 3px #f0f0f0;
    background: #fff;
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .column {
      width: 100%;
    }

    .column-list {
      margin-right: 0;
    }
  }
</style>
