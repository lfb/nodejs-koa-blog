<template>
  <section class="header-wrap">

    <header :class="headerFixed ? 'header header-fixed' : 'header'" id="header">
      <section class="header-inner">
        <div class="logo" @click="goHome"></div>
        <div class="search" id="search">
          <input type="text" v-model="keyword" @keyup.enter="search" placeholder="请输入您想要的.." class="search-input">
          <button class="search-submit" @click="search">搜索</button>
        </div>
        <!--<div class="login-register">-->
        <!--<button>登陆/注册</button>-->
        <!--</div>-->
      </section>
    </header>

    <nav class="nav" id="nav">
      <ul class="nav-box">
        <li class="nav-item" v-for="(item, index) in nav" @click="navActiveIndex = index" :key="index">
          <router-link :class="{ 'active' : navActiveIndex === index }" :to="{path: item.path}">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </nav>

  </section>
</template>

<script>
  import {mapActions} from 'vuex'
  import merge from 'webpack-merge'

  export default {
    name: "Header",
    data() {
      return {
        // 导航
        nav: [
          {title: '技术文章', key: 'article', path: '/'},
          // {title: '学习资源', key: 'source', path: '/source'},
          // {title: '收藏域名', key: 'domain', path: '/domain'},
          {title: '关于我', key: 'about', path: '/about'},
        ],
        // 导航高亮索引
        navActiveIndex: 0,
        // 是否固定头部
        headerFixed: false,
        keyword: ''
      }
    },
    mounted() {
      // 监听滚动条
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      // 移除滚动条
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      ...mapActions({
        searchArticle: 'article/searchArticle'
      }),
      // 处理滚动条
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let offsetTop = document.querySelector('#nav').offsetTop;
        this.headerFixed = !!(scrollTop > offsetTop)
      },

      // 搜索
      async search() {
        if (this.$route.path !== '/') {
          this.toPathLink('/?keyword=' + this.keyword);
        }

        try {
          // 动态改变路由订单状态参数orderStatus
          this.$router.push({
            query: merge(this.$route.query, {'keyword': this.keyword})
          })
          await this.searchArticle({
            keyword: this.keyword
          });
        } catch (e) {
          console.log(e);

        }
      },
      // 回到首页
      goHome() {
        window.location.href = "/"
      },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    height: 150px;
    width: 100%;
    background: #fff;
  }

  .header-inner {
    box-sizing: content-box;
    max-width: 1264px;
    height: 100%;
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    align-items: center;
  }

  .header-fixed {
    width: 100%;
    height: 96px;
    position: fixed;
    z-index: 8888;
    background: #fff;
    border-bottom: 1px solid #dcdee2;
    animation: showAnimate 0.36s both;
  }

  @keyframes showAnimate {
    0% {
      opacity: 0;
      top: -128px;
      filter: alpha(opacity=0);
    }
    25% {
      top: -96px;
      opacity: 0.25;
      filter: alpha(opacity=30);
    }

    50% {
      top: -64px;
      opacity: 0.5;
      filter: alpha(opacity=30);
    }
    75% {
      top: -32px;
      opacity: 0.75;
      filter: alpha(opacity=30);
    }
    100% {
      top: 0;
      opacity: 1;
      filter: alpha(opacity=100);
    }
  }

  .logo {
    width: 220px;
    height: 90px;
    text-align: left;
    cursor: pointer;
    background: url("http://images.boblog.com/BOBLOG-03.png?imageView2/1/w/220/h/90") -24px 0 no-repeat;
    background-size: 100% 100%;
  }

  .search {
    position: relative;
    flex: 1px;
    /*margin-right: 48px;*/

    & .search-input {
      height: 48px;
      width: 100%;
      font-size: 18px;
      box-sizing: border-box;
      padding: 0 112px 0 16px;
      border: 3px solid #5cadff;
    }

    & .search-submit {
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 96px;
      color: #fff;
      border: none;
      font-size: 18px;
      background-image: linear-gradient(to right, #5cadff 0, #2d8cf0 100%);
      background-repeat: repeat-x;

      &:hover {
        background-image: linear-gradient(to right, #2d8cf0 0, #2b85e4 100%);
        background-repeat: repeat-x;
      }
    }
  }

  .login-register {
    margin-left: 16px;

    & button {
      cursor: pointer;
      width: 112px;
      height: 48px;
      line-height: 46px;
      text-align: center;
      font-size: 16px;
      color: #657180;
      background-color: #fff;
      border: 1px solid #657180;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        color: #fff;
        background-color: #2d8cf0;
        border-color: #2d8cf0;
      }
    }
  }

  .nav {
    width: 100%;
    background: #2f8cf0;
    /*background-image: linear-gradient(to right, #5cadff 0, #2d8cf0 100%);*/
    /*background-repeat: repeat-x;*/

    & .nav-box {
      box-sizing: content-box;
      padding: 0 32px;
      max-width: 1264px;
      margin: 0 auto;
      display: flex;
      height: 64px;
      align-items: center;
    }

    & .nav-item {
      width: 220px;

      & a {
        display: block;
        color: #fff;
        font-size: 20px;
        font-weight: 400;
        text-decoration: none;

        &.active {
          text-decoration: underline;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .nav {
      & .nav-item {
        width: 150px;
      }
    }
  }
</style>
