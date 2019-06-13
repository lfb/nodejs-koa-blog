<template>
  <div class="category">
    <h1 class="category-title">
      <i class="icon el-icon-collection-tag"></i> 分类
    </h1>
    <ul class="category-box">
      <li class="category-item">全部文章</li>
      <li v-for="(cate, index) in list"
          @click="getArticle(cate.id)"
          class="category-item"
          :key="index">
        {{cate.name}}（ {{cate.Articles.length}} ）
      </li>
    </ul>
  </div>
</template>

<script>
  import merge from 'webpack-merge'
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        list: []
      }
    },
    computed: {
      ...mapState({})
    },
    created() {
      // this.getCategory();
    },
    methods: {
      ...mapActions({
        getCategoryList: 'category/getCategoryList',
        getCategoryArticle: 'category/getCategoryArticle'
      }),

      /**
       * 获取分类
       * @returns 分类列表
       */
      async getCategory() {
        const res = await this.getCategoryList();
        this.list = res.data;
      },

      /**
       * 获取分类下的文章
       * @param categoryId 分类ID
       * @returns 文章列表
       */
      async getArticle(categoryId) {

        if (this.$route.query.hasOwnProperty('keyword')) {
          this.$router.replace('/');
        }

        let res = await this.getCategoryArticle(categoryId);
        this.$store.commit('article/SET_ARTICLE_LIST', res.data.data);
      },

      // 路由跳转
      toPath(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped lang="scss">
  .category {
    padding: 0 24px;
    margin-bottom: 24px;
    background: #fff;
    border-radius: 5px;

    & .category-title {
      display: flex;
      align-items: center;
      color: #464c5b;
      font-size: 24px;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    & .icon {
      margin-right: 8px;
    }

    & .category-box {
      padding: 16px 0;
    }

    & .category-item {
      position: relative;
      cursor: pointer;
      margin-bottom: 16px;
      font-size: 16px;
      color: #657180;

      &:hover {
        color: #409EFF;
      }
    }
  }
</style>
