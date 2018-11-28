<template>
  <!--sidebar-->
  <!--@author: 梁凤波-->
  <!--@date  2018/11/22 11:52-->
  <section class="column">
    <nav class="nav">
      <ul class="nav-box">
        <li class="logo">
          <div class="logo-img">
            <router-link :to="{path: '/'}">
              <img v-lazy="logoUrl" alt="LOGO">
            </router-link>
          </div>
        </li>
        <!--<li class="nav-item" @click="refresh">文章</li>-->
      </ul>
    </nav>

    <!--search-->
    <div class="search">
      <input type="text" @keyup.enter="searchArticle" v-model="keyword" class="search-input" placeholder="文章搜索">
    </div>

    <!--category-->
    <div class="category">
      <h1 class="category-title">心情惬意，来点一个吧！</h1>
      <ul class="category-box" v-if="category">
        <li v-for="(item, index) in category"
            :class="categoryIndex === index ? 'category-item category-active' : 'category-item'"
            @click="handleCategoryArticle(item.key, index)"
            :key="index">
          {{item.name}}
        </li>
      </ul>
    </div>

    <!--copy-->
    <div class="copy">
      <p>&copy;www.boblog.com 梁凤波 <a href="http://www.miit.gov.cn/" target="_blank">粤ICP备18001135号-3</a></p>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        logoUrl: "http://images.boblog.com/BOBLOG-03.png",
        keyword: '',
        categoryIndex: 0,
        category: [
          {name: '全部', key: ''},
          {name: 'HTML', key: 'html'},
          {name: 'CSS', key: 'css'},
          {name: 'JavaScript', key: 'JavaScript'},
          {name: 'ES6', key: 'es6'},
          {name: 'Vue.js', key: 'vuejs'},
          {name: 'Node.js', key: 'nodejs'},
          {name: 'webpack', key: 'webpack'},
          {name: 'JAVA', key: 'java'},
          {name: 'MySQL', key: 'mysql'},
          {name: 'HTTP', key: 'http'},
          {name: '生活', key: 'life'}
        ]
      }
    },
    computed: {
      ...mapState({
        categoryList: state => state.category.categoryList,
        recommendArticleList: state => state.article.recommendArticleList
      })
    },
    created() {
      if (this.$route.query.category) {
        this.categoryIndex = this.category.findIndex(item => item.key === this.$route.query.category);
      }
      // 获取分类
      // this.getCategory();
      // 获取推荐文章列表
      // this.getRecommendArticleList();
    },
    mounted() {
    },
    methods: {
      ...mapActions({
        getCategoryList: 'category/getCategoryList',
        getRecommendArticle: 'article/recommendArticle'
      }),

      /**
       * 触发分类获取文章
       * @param category 分类名称
       * @param index 分类索引
       */
      handleCategoryArticle(category, index) {
        this.categoryIndex = index;
        let query = Object.assign({}, this.$route.query);
        query.category = category;
        let path = '/';

        this.$router.push({path, query});
        this.$emit('on-change', {category})
      },

      // 刷新
      refresh() {
        this.$router.push('/');
        this.$emit('on-change', {})
      },
      // 获取分类
      async getCategory() {
        try {
          await this.getCategoryList();

        } catch (e) {
        }
      },

      // 搜索
      async searchArticle() {
        let keyword = this.keyword;
        let query = Object.assign({}, this.$route.query);
        query.keyword = keyword;
        let path = '/';

        this.$router.push({path, query});
        this.$emit('on-search', {keyword});
      },

      // 获取推荐文章列表
      async getRecommendArticleList() {
        try {
          await this.getRecommendArticle({recommend: 1});
        } catch (e) {

        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .column {
    position: fixed;
    width: 560px;
    height: 100vh;
    left: 0;
    top: 0;
    background: #fff;
    transition: width linear 0.2s;
  }

  .nav-box {
    width: 100%;
    display: flex;
    padding: 0 16px;
    height: 100px;
    border-bottom: 1px solid #f0f0f0;
  }

  .nav-item {
    cursor: pointer;
    color: #262626;
    font-size: 22px;
    font-weight: 800;
    padding: 0 32px;
    height: 100px;
    line-height: 100px;
  }

  .logo {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 234px;
    height: 100px;
    & .logo-img {
      width: 234px;
      & img {
        width: 100%;
      }
    }
  }

  .search {
    padding: 0 32px;
    margin: 32px auto;
    &-input {
      box-sizing: border-box;
      height: 48px;
      line-height: 48px;
      width: 100%;
      padding: 0 32px;
      font-size: 18px;
      outline: none;
      color: #262626;
      border-radius: 32px;
      background: #f0f0f0;
      border: 1px solid #fff;
      transition: linear 0.2s;
      &:focus {
        border-color: #2d8cf0;
        background: #fff;
        box-shadow: 4px 4px 4px #f8f8f8;
      }
    }
  }

  .category {
    padding: 32px;
    text-align: center;
    margin-top: 96px;
    &-title {
      font-size: 28px;
      color: #262626;
      margin-bottom: 48px;
    }
    &-item {
      color: #404040;
      cursor: pointer;
      display: inline-block;
      width: 140px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      border-radius: 32px;
      margin-right: 16px;
      margin-bottom: 16px;
      border: 1px solid #f0f0f0;
      transition: linear 0.2s;
      &:hover {
        color: #fff;
        border-color: #fff;
        background: #2f8cf0;
      }
    }
    &-active {
      color: #fff;
      border-color: #fff;
      background: #2f8cf0;
    }
  }

  .copy {
    position: absolute;
    text-align: center;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 16px;
    & p {
      color: #989898;
      font-size: 14px;
      & a {
        color: #989898;
        font-size: 12px;
        text-decoration: none;
      }
    }
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .column {
      position: relative;
      width: 100%;
      text-align: center;
      height: auto;
      transition: width linear 0.2s;
    }
    .copy {
      display: none;
    }
    .search {
      &-input {
        height: 56px;
        line-height: 56px;
      }
    }
    .category {
      margin-top: 32px;
      &-item {
        height: 56px;
        line-height: 56px;
        width: 180px;
      }
    }
    .nav-box {
      padding: 0 32px;
      justify-content: center;
    }
    .nav-item {
      display: none;

    }
  }
</style>
