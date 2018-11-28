<template>
  <div id="app">
    <router-view/>
    <!--页脚-->
    <!--<Footer/>-->
  </div>
</template>

<script>
  export default {
    computed: {
    },
  }
</script>

<style>
  body, html {
    margin: 0;
    padding: 0;
    font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
    background: #f0f0f0;
  }

  li {
    list-style: none;
  }

  div, article, section, ul, li, p, a, h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
</style>
