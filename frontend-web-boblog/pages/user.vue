<template>
  <div>
    <Header />
    <div v-if="userInfo" class="userinfo">
      <p>昵称：{{userInfo.username}}</p>
      <p>邮箱：{{userInfo.email}}</p>
      <p style="text-indent: 2em">—— 假如生活欺骗了你，请你不要放弃，坚持下去！天是不会给绝路你的！</p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/Header'

export default {
  name: "User",
  components: {
    Header
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  async fetch({ store }) {
    await store.dispatch('category/getCategoryData')
  },
}
</script>

<style scoped lang="scss">
.userinfo {
  width: 1024px;
  margin: 32px auto;
  font-size: 14px;
}
</style>
