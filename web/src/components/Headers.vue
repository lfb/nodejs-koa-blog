<template>
  <section :class="headerFixed ? 'header header-fixed' : 'header'">
    <header class="header-box">
      <div class="logo" @click="toPath('/')">
        <img src="http://images.boblog.com/BOBLOG-03.png?imageView2/1/w/400/h/200" alt="LOGO">
      </div>
      <div class="nav">
        <ul class="nav-box">
          <li>
            <router-link class="nav-item" :to="{path: '/'}">前端开发</router-link>
          </li>
          <li>
            <router-link class="nav-item" :to="{path: '/'}">小程序</router-link>
          </li>
          <li>
            <router-link class="nav-item" :to="{path: '/about'}">关于</router-link>
          </li>
        </ul>
      </div>
      <div class="search">
        <input class="search-input" placeholder="请输入想搜索的文章" type="text">
        <div class="iconfont iconicon-test4 search-icon"></div>
      </div>
    </header>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        headerFixed: false
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
      toPath(path) {
        this.$router.push(path)
      },
      // 处理滚动条
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let offsetTop = document.querySelector('#article').offsetTop;
        this.headerFixed = !!(scrollTop > offsetTop)
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

  .header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
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
    flex: 1;
    padding: 0 64px;

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
        &:hover{
          color: #2d8cf0;
        }
      }
    }
  }

  .search {
    position: relative;

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


</style>
