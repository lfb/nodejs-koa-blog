<template>
  <!--indev-->
  <!--@author: 梁凤波-->
  <!--@date  2018/11/23 08:31-->
  <section class="index-wrap">
    <img src="http://images.boblog.com/BOBLOG-03.png" alt="">
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState({
        userInfo: state => state.users.userInfo
      })
    },
    created() {
    },
    mounted() {
    },
    methods: {
      ...mapActions({})
    }
  }
</script>

<style lang="scss" scoped>
  .index-wrap {
    text-align: center;
  }
</style>
