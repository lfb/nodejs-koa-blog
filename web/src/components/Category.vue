<template>
  <div class="category">
    <h1 class="category-title">分类</h1>
    <ul class="category-box">
      <li v-for="(cate, index) in category"
          @click="getCategoryArticle(cate.id)"
          :class="categoryIndex === index ? 'category-item category-item--active' : 'category-item'"
          :key="index">
        {{cate.name}}（{{cate.Articles.length}}）
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        categoryIndex: 0,
        category: []
      }
    },
    created() {
      this.checkCategoryParams()
      this.getCategory();
    },
    methods: {
      ...mapActions({
        getCategoryList: 'category/getCategoryList',
        getCategoryArticle: 'category/getCategoryArticle'
      }),
      async getCategory() {
        const res = await this.getCategoryList();
        this.category = res.data.data;
      },
      // 检测分类
      checkCategoryParams() {
        const category = this.$route.query.category
        this.categoryIndex = this.category.findIndex(item => item.key === category)
      },
      // 路由跳转
      toPath(path, index) {
        this.categoryIndex = index
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
      font-size: 24px;
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

    & .category-item--active {
      color: #2d8cf0;
    }
  }
</style>
