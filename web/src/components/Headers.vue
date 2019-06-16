<template>
  <section class="header">
    <header class="header-box">
      <div class="logo">
        <a href="/"><img src="../assets/images/LOGO.png" alt="LOGO"></a>
      </div>
      <div class="nav">
        <ul class="nav-box">
          <li v-for="(item, index) in nav"
              @click="changeNav(item.path, index)"
              :class="navIndex === index ? 'nav-item nav-item--active' : 'nav-item'"
              :key="index">
            <i :class="`icon ${item.icon}`"></i> {{item.name}}
          </li>
        </ul>
      </div>
      <div class="search">
        <el-input
          placeholder="请输入内容"
          size="small"
          clearable
          maxlength="32"
          prefix-icon="el-icon-search"
          @keyup.enter.native="getSearchArticle"
          v-model="keyword">
        </el-input>
      </div>
    </header>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import merge from 'webpack-merge'

  export default {
    data() {
      return {
        keyword: '',
        navIndex: 0,
        nav: [
          {name: '文章', path: '/', icon: 'el-icon-house'},
          // {name: '专栏', path: '/book', icon: 'el-icon-reading\n'},
          {name: '关于', path: '/about', icon: 'el-icon-chat-round'},
        ]
      }
    },
    mounted() {
    },
    computed: {
      ...mapState({})
    },
    methods: {
      ...mapActions({
        searchArticle: 'article/searchArticle',
        showUserManager: 'user/showUserManager',
        getArticleList: 'article/getArticleList'
      }),

      /**
       * 切换导航栏
       */
      changeNav(path, index) {
        this.$router.replace({
          query: merge({})
        });
        this.navIndex = index;
        this.toPath(path);
        this.getArticle();
      },
      /**
       * 搜索文章
       * @returns 文章列表
       */
      async getSearchArticle() {
        const keyword = this.keyword;
        if (!keyword) return false;

        const path = this.$route.path;
        let articlePath = '/';

        if (path !== articlePath) {
          articlePath += `?keyword=${keyword}`;
          this.toPath(articlePath)

        } else {
          this.$router.replace({
            query: merge(this.$route.query, {
              keyword
            })
          });
          this.getArticle();
        }
      },
      /**
       * 获取文章
       *
       * @returns 文章列表
       */
      async getArticle() {
        const {page, desc, category_id, keyword} = this.$route.query;

        await this.getArticleList({
          page,
          desc,
          keyword,
          category_id
        });
      },
      /**
       * 路由调整
       * @param path 路由地址
       */
      toPath(path) {
        this.$router.push(path);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 96px;
    z-index: 5000;
    background: #fff;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, .03);
    border-bottom: 1px solid #f0f0f0;
  }

  .header-box {
    width: 1280px;
    box-sizing: border-box;
    margin: 0 auto;
    height: 96px;
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    margin-left: -20px;

    & img {
      width: 100%;
    }
  }

  .nav {
    margin: 0 24px;

    & .nav-box {
      display: flex;
      width: 100%;

      & .nav-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-items: center;
        padding: 0 24px;
        height: 96px;
        line-height: 96px;
        color: #404040;
        font-size: 20px;
        text-decoration: none;

        &:hover {
          color: #409EFF;
        }
      }

      & .icon {
        margin-right: 8px;
      }

      & .nav-item--active {
        color: #409EFF;
      }
    }
  }

  .search {
    position: relative;
    width: 480px;

    .search-icon {
      position: absolute;
      right: 8px;
      top: 8px;
      color: #aaa;
    }

    & .search-input {
      box-sizing: border-box;
      color: #404040;
      height: 36px;
      line-height: 36px;
      width: 360px;
      font-size: 16px;
      padding-right: 32px;
      padding-left: 10px;
      outline: none;
      border: 1px solid #ccc;

      &:focus {
        border-color: #409EFF;
      }

      &::placeholder {
        color: #ccc;
        font-size: 16px;
      }

      &:focus .search-icon {
        color: #409EFF;
      }
    }
  }
</style>
