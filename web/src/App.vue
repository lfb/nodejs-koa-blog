<template>
  <div id="app">
    <v-loading :text="loadingText" v-if="isLoading"/>
    <v-headers/>
    <router-view class="router-views"/>
    <main-footer/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import VLoading from './components/Loading'
  import VHeaders from './components/Headers'
  import MainFooter from './components/MainFooter'

  export default {
    components: {
      VLoading,
      VHeaders,
      MainFooter
    },
    data() {
      return {
        centerDialogVisible: true,
        showClose: true
      }
    },
    computed: {
      ...mapGetters('loading', [
        'isLoading',
        'loadingText'
      ])
    },
    methods: {}
  }
</script>

<style>

  html, body {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    background: #f8f8f8;
  }

  #app {
  }

  section, article, header, nav, ul, li, h1, h2, h3, p {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

</style>
