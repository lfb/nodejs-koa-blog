<template>
  <div>
    <div class="header">
      <div class="header-inner">
        <div class="logo" @click="goHome"></div>
        <form class="search-box" action="/">
          <input
            name="keyword"
            type="text"
            class="search"
            placeholder="搜索"
          />
        </form>
        <client-only>
          <div v-if="isLoginStatus">
            <el-dropdown class="avatar-container" trigger="click">
              <div class="avatar-wrapper">
                <el-avatar
                  size="small"
                  icon="el-icon-user-solid"
                ></el-avatar>
                <div class="username">{{ userInfo.username }}</div>
                <i class="el-icon-caret-bottom" />
              </div>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link to="/user">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                </router-link>
                <el-dropdown-item divided @click.native="logout">
                  <span style="display: block">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </client-only>
      </div>

      <div v-if="isCategory" class="category">
        <ul v-if="Array.isArray(categoryList)" class="category-box">
          <li v-for="item in categoryList" :key="item.id" class="category-item">
            <NuxtLink
              class="category-item-link"
              :to="'/?category_id=' + item.id"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {removeToken} from '@/lib/auth'

export default {
  name: 'Header',
  props: {
    isCategory: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      isLoginStatus: state => state.user.isLoginStatus,
      categoryList: (state) => state.category.categoryList
    }),
  },
  methods: {
    // 退出登录
    logout() {
      removeToken()
      this.$store.commit('user/SET_LOGIN_STATUS', false)
      this.$store.commit('user/SET_USERINFO', null)
      this.goHome()
    },
    // 返回首页
    goHome() {
      window.location.href = '/'
    }
  }
}
</script>

<style scoped lang="scss">
a{
  text-decoration: none;
}

.header {
  box-sizing: border-box;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
}

.header-inner {
  box-sizing: border-box;
  width: 1024px;
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 150px;
  height: 64px;
  background: url(https://cdn.boblog.com/boblog.png) -16px center no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  text-align: center;
}

.search-box {
  position: relative;
  height: 100%;
  width: 280px;
}

.search {
  box-sizing: border-box;
  width: 100%;
  padding: 0 12px;
  margin-top: 14px;
  height: 36px;
  line-height: 36px;
  color: #404040;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.avatar-wrapper {
  width: 100px;
  display: flex;
  align-items: center;
  margin-left: 32px;
  height: 64px;
}
.username {
  margin: 0 5px;
}

.category {
  border-top: 1px solid #e6e6e6;

  &-box {
    padding: 0;
    display: flex;
    align-items: center;
    width: 1024px;
    margin: 0 auto;
    height: 54px;
  }

  &-item {
    &-link {
      margin-right: 24px;
      height: 54px;
      line-height: 54px;
      font-size: 13px;
      color: #757575;
      text-decoration: none;
      display: inline-block;
    }
  }
}

</style>
