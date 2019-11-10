<template>
  <div id="app">
    <v-loading :text="loadingText" v-if="isLoading"/>
    <v-headers />
    <div class="app-inner">
      <router-view/>
    </div>
    <v-footer />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import VLoading from './components/Loading'
  import VHeaders from './components/Headers'
  import VFooter from './components/Footer'

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
    background: #f0f0f0!important;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  ul, li, h1, div, dl, dt, dd {
    margin: 0;
    padding: 0;
    list-style: none;
  }

</style>
