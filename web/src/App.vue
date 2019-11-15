<template>
  <div id="app">
    <v-loading :text="loadingText" v-if="isLoading"/>
    <v-headers/>
    <router-view/>
    <BackTop/>
    <v-footer/>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import VLoading from './components/mian-loading'
  import VHeaders from './components/main-headers'
  import VFooter from './components/main-footer'

  export default {
    components: {
      VLoading,
      VHeaders,
      VFooter
    },
    computed: {
      ...mapGetters('loading', [
        'isLoading',
        'loadingText'
      ])
    }
  }
</script>
<style lang="less">
  html, body {
    margin: 0;
    padding: 0;
    background: #f0f0f0 !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  ul, li, h1, div, dl, dt, dd {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  #app {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
</style>
