<template>
  <div id="app">
    <loading-view
      :text="loadingText"
      v-if="isLoading">
    </loading-view>

    <headers/>

    <router-view/>

    <main-footer/>
  </div>
</template>

<script>
  import loadingView from './components/loading'
  import Headers from './components/Headers'
  import MainFooter from './components/MainFooter'
  import {mapGetters} from 'vuex';

  export default {
    components: {
      loadingView,
      Headers,
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
  html, body {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  #app {
    height: 100%;
  }

  li {
    list-style: none;
  }

  section, article, header, nav, ul, li, h1, h2, h3, p {
    margin: 0;
    padding: 0;
  }
</style>
