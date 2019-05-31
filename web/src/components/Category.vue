<template>
  <div class="category">
    <h1 class="category-title">分类</h1>
    <ul class="category-box">
      <li v-for="(cate, index) in list"
          @click="getArticle(cate.id)"
          class="category-item"
          :key="index">
        {{cate.name}}（{{cate.Articles.length}}）
      </li>
    </ul>
  </div>
</template>

<script>
  import merge from 'webpack-merge'
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState({
        list: state => state.category.categoryList
      })
    },
    created() {
      this.getCategory();
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
        await this.getCategoryList();
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
    background: #fff;

    & .category-title {
      display: flex;
      align-items: center;
      color: #464c5b;
      font-size: 26px;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    & .category-box {
      padding: 10px 0;

    }

    & .category-item {
      cursor: pointer;
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      color: #657180;
      transition: left 1s ease-in;

      &:hover {
        color: #2d8cf0;
      }
    }
  }
</style>
