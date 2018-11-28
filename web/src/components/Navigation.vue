<template>
  <!--Navigation-->
  <!--@author: 梁凤波-->
  <!--@date  2018/10/11 09:03-->
  <section class="navigation-wrap">
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        navList: [
          {title: "首页", path: '/'},
          {title: "关于", path: '/about'}
        ],
        form: {
          keyword: ''
        },
        navIndexActive: 0,
        keyword: ''
      }
    },
    methods: {
      ...mapActions({}),
      /**
       * 导航路由跳转
       * @param index 导航栏数组索引
       */
      navActive(index) {
        this.navIndexActive = index;
      },

      // 搜索
      async searchArticle() {
        let keyword = this.keyword;
        let query = Object.assign({}, this.$route.query);
        query.keyword = keyword;
        let path = '/';

        this.$router.push({path, query});
        this.$emit('on-search', {keyword});
      },

      // 点击LOGO触发
      onFetch() {
        this.$router.push("/");
        this.$emit("on-fetch", {});
      },

      /**
       * 路由跳转
       * @param path
       */
      routerLink(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="scss" scoped>
  ul, li {
    margin: 0;
    padding: 0;
  }

  .nav {
    padding: 0 32px;
    background: #fff;
  }
</style>
