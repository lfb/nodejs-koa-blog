<template>
  <header class="header-wrap">
    <section class="header-inner">

      <div class="logo">
        <img src="../assets/images/logo.png" alt="logo">
      </div>

      <div class="nav">
        <ul class="nav-box">
          <li v-for="(item, index) in nav"
              @click="changeNav(item.router)"
              :class="index === navIndex ? 'nav-item nav-item-active' : 'nav-item'"
              :key="index">
            {{item.name}}
          </li>
        </ul>
      </div>

      <div class="search">
        <Input size="default" suffix="ios-search" placeholder="搜索文章.." style="width: auto"/>
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
    data () {
      return {
        nav: [
          {
            name: '首页',
            router: '/'
          },
          {
            name: '文章',
            router: '/articles'
          },
          {
            name: '专栏',
            router: '/column'
          },
          {
            name: '关于',
            router: '/about'
          }
        ]
      }
    },
    methods: {
      changeNav (router) {
        try {
          this.$router.push(router)
        } catch (e) {
          console.log(e)
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
</style>
