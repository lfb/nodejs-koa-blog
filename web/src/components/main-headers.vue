<template>
  <header class="header-wrap">
    <section class="header-inner">

      <div class="logo">
        <div class="logo-box" @click="toLink('/')">
          <img src="../assets/images/logo.png" alt="logo">
        </div>
      </div>

      <div class="nav">
        <ul class="nav-box">
          <li v-for="(item, index) in nav"
              @click="toLink(item.router, index === navIndex)"
              :class="index === navIndex ? 'nav-item nav-item-active' : 'nav-item'"
              :key="item.id">
            {{item.name}}
          </li>
        </ul>
      </div>

      <div class="search">
        <Input size="default"
               @keyup.enter.native="search"
               suffix="ios-search"
               v-model="keyword"
               placeholder="搜索文章.."
               style="width: auto"/>
      </div>

    </section>
  </header>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: '',
    computed: {
      ...mapState({
        navIndex: state => state.headers.navIndex
      })
    },
    data() {
      return {
        keyword: '',
        nav: [
          {
            name: '文章',
            router: '/'
          },
          {
            name: '关于',
            router: '/about'
          }
        ]
      }
    },
    methods: {
      // 路由跳转
      toLink(router, isActiveIndex) {
        if (!isActiveIndex) {
          this.$router.push(router)
        }
      },
      // 搜索
      search() {
        const keyword = '/articles?keyword=' + this.keyword
        if (this.$route.name !== 'article-list') {
          this.$router.push(keyword)
        } else {
          window.location.replace(keyword)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .header-wrap {
    width: 100%;
    height: 96px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .03);
    border-bottom: 1px solid #f0f0f0;
    background: #fff;
  }

  .header-inner {
    margin: 0 auto;
    width: @window-Width;
    display: flex;
    align-items: center;
  }

  .logo {
  }

  .logo-box {
    width: 168px;
    display: flex;
    align-items: center;

    & img {
      width: 100%;
    }
  }

  .nav {
    flex: 1;
  }

  .nav-box {
    display: flex;
    align-items: stretch;
    padding: 0 32px;
  }

  .nav-item {
    cursor: pointer;
    color: #17233d;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    padding: 0 32px;
    white-space: nowrap;

    &:hover {
      color: #2d8cf0;
    }
  }

  .nav-item-active {
    color: #2d8cf0;
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .search {
      display: none;
    }

    .header-inner {
      box-sizing: border-box;
      width: 100%;
      padding: 0 32px;
    }
  }
</style>
