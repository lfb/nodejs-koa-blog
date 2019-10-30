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
  @import "./assets/fonts.css";
  
  html, body {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background: #f8f8f8;
  }

  #app * {
    font-family: 'Alibaba-PuHuiTi-Regular' !important;
  }

  #app [class*=" el-icon-"], #app [class^=el-icon-] {
    font-family: element-icons!important
  }
  section, article, header, nav, ul, li, h1, h2, h3, p {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

</style>
