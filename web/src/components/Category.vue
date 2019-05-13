<template>
  <div class="category">
    <h1 class="category-title">分类</h1>
    <ul class="category-box">
      <li v-for="(cate, index) in category"
          @click="toPath(`/article?category=${cate.key}`, index)"
          :class="categoryIndex === index ? 'category-item category-item--active' : 'category-item'"
          :key="index">
        {{cate.name}}（{{cate.article_num}}）
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        categoryIndex: 0,
        category: [
          {name: 'JavaScript', article_num: 32, key: 'JavaScript'},
          {name: 'HTML/CSS', article_num: 2, key: 'html-css'},
          {name: 'Vue.js', article_num: 12, key: 'vuejs'},
          {name: 'Node.js', article_num: 12, key: 'nodejs'},
          {name: 'HTTP', article_num: 2, key: 'http'},
          {name: 'Webpack', article_num: 23, key: 'webpack'},
          {name: '数据结构', article_num: 3, key: 'data-structure'},
          {name: '算法', article_num: 3, key: 'arithmetic'}
        ]
      }
    },
    created() {
      this.checkCategoryParams()
    },
    methods: {
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
