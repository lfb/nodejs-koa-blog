<template>
  <div id="app">
    <v-loading :text="loadingText" v-if="isLoading"/>
    <el-dialog
      width="40%"
      :visible="showUserManagerModel"
      :show-close=true
      @close="_showUserManager"
      center>
      <v-user-manager/>
    </el-dialog>
    <v-headers/>
    <router-view class="router-views"/>
    <main-footer/>
  </div>
</template>

<script>
  import VLoading from './components/Loading'
  import VHeaders from './components/Headers'
  import MainFooter from './components/MainFooter'
  import VUserManager from './components/UserManager'
  import {mapState, mapGetters, mapActions} from 'vuex';

  export default {
    components: {
      VLoading,
      VHeaders,
      MainFooter,
      VUserManager
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
      ]),
      ...mapState({
        showUserManagerModel: state => state.user.showUserManagerModel
      })
    },
    methods: {
      ...mapActions({
        showUserManager: 'user/showUserManager'
      }),
      _showUserManager() {
        const SHOW = false
        this.showUserManager(SHOW)
      }
    }
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

  body {
  }

  #app {
    margin-top: 128px;
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
