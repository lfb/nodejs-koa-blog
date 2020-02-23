<!--文章列表-->
<template>
  <section class="articles">
    <article class="article-list">
      <ul class="category" v-if="category && category.length > 0">
        <li class="category-item" @click="getAllArticle">
          全部
        </li>
        <li v-for="(item, index) in category"
            :class="categoryIndex === index ? 'category-item category-item-active' : 'category-item'"
            @click="changCategory(item.id, index)"
            :key="item.id">
          <Icon v-if="item.type" class="icon" :style="{color: item.color}" :type="item.type"/>
          {{item.name}}
        </li>
      </ul>
      <!-- 文章组件-->
      <v-article-item :list="list"/>

      <div class="page" v-if="page && page.total_pages.length > 1">
        <Page :total="page.total"
              :page-size="page.per_page"
              :current="page.current_page" show-total
              @on-change="handlePage" />
      </div>
    </article>

    <!-- 侧边栏 -->
    <v-main-sidebar/>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import merge from 'webpack-merge'
  import VArticleItem from '../../components/article-item'

  export default {
    components: {
      VArticleItem,
      VMainSidebar: () => import('../../components/main-sidebar')
    },
    name: 'list',
    data() {
      return {
        list: [],
        page: null,
        currentPage: 1,
        categoryIndex: -1
      }
    },
    computed: {
      ...mapState({
        category: state => state.category.categoryList
      })
    },
    watch: {
      'keyword': (val, oldVal) => {
        console.log('val, oldVal')
        console.log(val, oldVal)
      }
    },
    created() {
      this.getArticle()
    },
    methods: {
      ...mapActions({
        getArticleList: 'articles/list',
        getCategoryList: 'category/list'
      }),
      async getArticle() {
        const params = {
          page: this.currentPage,
          category_id: this.$route.query.category_id,
          keyword: this.$route.query.keyword
        }
        const r = await this.getArticleList(params)
        await this.getCategoryList()
        this.list = r.data.data.data
        this.page = r.data.data.meta
      },
      // 切换分类下的文章
      changCategory(id, index) {
        if (this.categoryIndex !== index) {
          this.$router.replace({
            query: merge(this.$route.query, {
              category_id: id
            })
          })
          this.categoryIndex = index
          this.getArticle()
        }
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
      },
      // 获取所有文章
      getAllArticle() {
        this.$router.replace('/articles')
        this.getArticle()
        this.categoryIndex = -1
      }
    }
  }
</script>

<style scoped lang="less">
  .category {
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
    height: 64px;
    line-height: 64px;
    display: flex;
    border-bottom: 1px solid #f0f0f0;
  }

  .category-item {
    margin-left: 32px;
    cursor: pointer;
    color: #515a6e;
    font-size: 16px;
    font-weight: normal;

    &:hover {
      color: #2d8cf0;
    }
  }

  .category-item-active {
    color: #2d8cf0;
  }

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

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .articles {
      width: 100%;
    }

    .article-list {
      margin-right: 0;
    }
  }
</style>
