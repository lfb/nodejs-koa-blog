<template>
  <div>
    <div class="header">
      <div class="logo" @click="jumpURL('/')">
        <img src="https://cdn.boblog.com/logo.png" alt="logo" />
      </div>
      <div class="nav">
        <div
          v-for="(item, index) in nav"
          :key="index"
          class="nav-item"
          @click="jumpURL(item.router)"
        >
          {{ item.title }}
        </div>
        <a href="https://github.com/lfb" target="_blank" class="nav-item">
          Github
        </a>
      </div>
      <div class="search" @click="showSearch = true">
        <img src="https://cdn.boblog.com/search.png" alt="search" />
      </div>
    </div>
    <div v-if="showSearch" class="search-fixed">
      <div class="search-fixed-inner">
        <form class="search-fixed-form" action="/">
          <input
            name="keyword"
            type="text"
            class="search-fixed-search"
            placeholder="搜索"
          />
        </form>
        <div class="search-fixed-search-icon" @click="closeSearch">
          <img
            width="20px"
            src="https://cdn.boblog.com/Fr4xC9m-uaWaALnwLp7mtEs9nGpM"
            alt="search"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'VHeader',
  props: {
    isCategory: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showSearch: false,
      nav: [
        {
          title: '首页',
          router: '/',
        },
        // {
        //   title: '分类',
        //   router: '/category',
        // },
        // {
        //   title: '关于',
        //   router: '/about',
        // },
      ],
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLoginStatus: (state) => state.user.isLoginStatus,
    }),
  },
  watch: {
    isLoginStatus: {
      handler() {
        this.handleNav()
      },
    },
  },
  mounted() {
    this.handleNav()
  },
  methods: {
    closeSearch() {
      this.keyword = ''
      this.showSearch = false
    },
    handleNav() {
      if (this.isLoginStatus) {
        this.nav.splice(2, 0, {
          title: '个人中心',
          router: '/usercenter',
        })
      } else {
        const index = this.nav.findIndex(
          (item) => item.router === '/usercenter'
        )
        if (index !== -1) {
          this.nav.splice(index, 1)
        }
      }
    },
    // 返回首页
    goHome() {
      window.location.href = '/'
    },
    // 跳转URL
    jumpURL(router) {
      this.$router.push(router)
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  margin: 0 auto;
  width: 1280px;
  height: 120px;
  display: flex;
  align-items: center;
}
.logo {
  width: 154px;
}
.logo img {
  width: 100%;
}
.nav {
  flex: 1;
  margin-left: 102px;
  display: flex;
  align-items: center;
}
.nav-item {
  cursor: pointer;
  display: block;
  text-align: center;
  margin-left: 120px;
  font-size: 16px;
  color: #222222;
  text-decoration: none;

  &:hover {
    color: #2d8cf0;
    text-decoration: underline;
  }
}

.search {
  width: 28px;
  cursor: pointer;
}
.search img {
  width: 100%;
}

.search-fixed {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
}
.search-fixed-inner {
  position: fixed;
  width: 1280px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-fixed-form {
  flex: 1;
}
.search-fixed-search {
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 1px solid #ccc;
  height: 36px;
  line-height: 36px;
  font-size: 26px;
  font-weight: 600;
  color: #404040;
  text-align: center;

  &::placeholder {
    color: #999999;
  }
}
.search-fixed-search-icon {
  cursor: pointer;
  width: 20px;
}
</style>
