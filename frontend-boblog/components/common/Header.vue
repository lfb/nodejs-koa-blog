<template>
  <div>
    <div class="header">
      <div class="response-wrap header-inner">
        <a class="logo" href="/"></a>
        <div class="nav">
          <div
            v-for="(item, index) in nav"
            :key="index"
            :class="[
              'nav-item',
              {
                'nav-item-active': navIndex === index,
              },
            ]"
            @click="jumpURL(item.router)"
          >
            {{ item.title }}
          </div>
          <div v-if="Array.isArray(categoryList) && categoryList.length">
            <el-dropdown>
              <span class="el-dropdown-link" >
                分类<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in categoryList" :key="item.id">
                  <a class="category-links" :href="'/?category_id=' + item.id">{{ item.name }}</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <a href="https://github.com/lfb/nodejs-koa-blog" target="_blank" class="nav-item">
            Github
          </a>
        </div>
        <div class="search">
          <el-input
            v-model="keyword"
            size="small"
            :clearable="true"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            @keyup.enter.native="onSearch"
          >
          </el-input>
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
      keyword: '',
      navIndex: 0,
      nav: [
        {
          title: '首页',
          router: '/',
        }
      ],
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLoginStatus: (state) => state.user.isLoginStatus,
      categoryList: (state) => state.category.categoryList
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
    this.getCategory()
  },
  methods: {
    getCategory() {
      this.$store.dispatch('category/getCategoryData')
    },
    onSearch() {
      if (!this.keyword) return false
      window.location.href = `/?keyword=${this.keyword}`
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
      const { category_id, keyword } = this.$route.query
      if (category_id || keyword) {
        window.location.href = router
      } else {
        this.$router.push(router)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid #f0f0f0;
}
.header-inner {
  box-sizing: border-box;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  cursor: pointer;
  box-sizing: border-box;
  display: block;
  width: 100px;
  height: 56px;
  background: url('https://cdn.boblog.com/logo.png') center center no-repeat;
  background-size: 100px;
}
.nav {
  box-sizing: border-box;
  flex: 1;
  height: 56px;
  display: flex;
  margin: 0 64px;
  align-items: center;
}
.nav-item {
  box-sizing: border-box;
  height: 56px;
  line-height: 56px;
  padding: 0 32px;
  white-space: nowrap;
  cursor: pointer;
  display: block;
  text-align: center;
  font-size: 16px;
  color: #222222;
  text-decoration: none;
  &-active {
    color: #2d8cf0;
  }

  &:hover {
    color: #2d8cf0;
    text-decoration: underline;
  }
}

.el-dropdown-link {
  cursor: pointer;
  font-size: 16px;
  padding: 0 32px;
  color: #222222;
  white-space: nowrap;

  &:hover {
    color: #2d8cf0;
    text-decoration: underline;
  }

  &:hover .el-icon-arrow-down {
    color: #2d8cf0;
  }
}
.el-icon-arrow-down {
  font-size: 16px;
  color: #222222;
}

.category-links {
  box-sizing: border-box;
  display: block;
  height: 100%;
  width: 100%;
  color: #222222;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: #2d8cf0;
  }
}

.search {
  cursor: pointer;
}

@media screen and (max-width: 540px) {
  .nav {
    display: none;
  }
  .search {
    flex: 1;
    margin-left: 24px;
  }
}
</style>
