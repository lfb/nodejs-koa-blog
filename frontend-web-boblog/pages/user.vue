<template>
  <div>
    <Header />
    <div v-if="userInfo" class="userinfo">
      <p>昵称：{{userInfo.username}}</p>
      <p>邮箱：{{userInfo.email}}</p>
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
  }
}
</script>

<style scoped lang="scss">
.userinfo {
  width: 1024px;
  margin: 32px auto;
}
</style>
