<template>
  <section class="header">
    <header class="header-box">
      <div class="logo" @click="toPath('/')">
        <img src="http://images.boblog.com/BOBLOG-03.png?imageView2/1/w/400/h/200" alt="LOGO">
      </div>
      <div class="nav">
        <ul class="nav-box">
          <li v-for="(item, index) in nav" :key="index">
            <router-link
              :class="navIndex === index ? 'nav-item nav-item--active' : 'nav-item'"
              :to="{path: item.path}">
              {{item.name}}
            </router-link>
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
        <!--        <input-->
        <!--          class="search-input"-->
        <!--          v-model="keyword"-->
        <!--          @keyup.enter="getSearchArticle"-->
        <!--          placeholder="请输入想搜索的文章"-->
        <!--          type="text">-->
        <!--        <div class="iconfont iconicon-test4 search-icon"></div>-->
      </div>

      <div class="login-register">
        <el-button size="small" @click="showUserManagerModel" type="primary">登录/注册</el-button>
      </div>
    </header>
  </section>
</template>

<script>
  import {mapActions} from 'vuex'
  import merge from 'webpack-merge'

  export default {
    data() {
      return {
        keyword: '',
        navIndex: 0,
        nav: [
          {name: '首页', path: '/'},
          {name: '关于', path: '/about'},
        ]
      }
    },
    created() {
      this.checkRouter()
    },
    methods: {
      ...mapActions({
        searchArticle: 'article/searchArticle',
        showUserManager: 'user/showUserManager'
      }),
      /**
       * 检测路由
       */
      checkRouter() {
        const path = this.$route.path;
        this.navIndex = this.nav.findIndex(item => item.path === path)
      },

      // 显示用户登录注册
      showUserManagerModel() {
        const SHOW = true
        this.showUserManager(SHOW)
      },
      /**
       * 搜索文章
       * @returns 文章列表
       */
      async getSearchArticle() {
        console.log(11)
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

          await this.searchArticle({
            keyword
          });
        }

      },
      /**
       * 路由调整
       * @param path 路由地址
       */
      toPath(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    height: 96px;
    background: #fff;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, .03);
  }

  .header-box {
    width: 1280px;
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
    padding: 0 32px;

    & .nav-box {
      display: flex;
      width: 100%;

      & .nav-item {
        height: 96px;
        line-height: 96px;
        display: block;
        color: #404040;
        font-size: 20px;
        padding-right: 32px;
        text-decoration: none;

        &:hover {
          color: #2d8cf0;
        }
      }

      & .nav-item--active {
        color: #2d8cf0;
      }
    }
  }

  .search {
    position: relative;
    flex: 1;

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
        border-color: #2d8cf0;
      }

      &::placeholder {
        color: #ccc;
        font-size: 16px;
      }

      &:focus .search-icon {
        color: #2d8cf0;
      }
    }
  }

  .login-register {
    flex: 1;
    text-align: right;
  }
</style>
