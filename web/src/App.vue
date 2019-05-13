<template>
  <div id="app">
    <v-loading :text="loadingText" v-if="isLoading"/>
    <v-headers/>
    <router-view/>
    <main-footer/>
  </div>
</template>

<script>
  import VLoading from './components/Loading'
  import VHeaders from './components/Headers'
  import MainFooter from './components/MainFooter'
  import {mapGetters} from 'vuex';

  export default {
    components: {
      VLoading,
      VHeaders,
      MainFooter
    },
    computed: {
      ...mapGetters('loading', [
        'isLoading',
        'loadingText'
      ]),
    },
  }
</script>

<style>
  @import "assets/fonts/iconfont.css";

  html, body {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  body {
    background: #f8f8f8;
  }

  #app {
    height: 100%;
  }

  section, article, header, nav, ul, li, h1, h2, h3, p {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }
</style>
