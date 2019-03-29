<template>
  <section class="Footer-wrap">
    <footer class="footer-inner">
      <p>www.boblog.com - 波博客 Copyright&copy; Author梁凤波 itbo@163.com</p>
      <p><a href="http://www.miit.gov.cn" target="_blank">粤ICP备18001135号-3</a></p>
    </footer>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {}
    },
  }
</script>

<style lang="scss" scoped>
  .footer-inner {
    padding: 64px 32px;
    line-height: 36px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    background: #262626;
  }

  .footer-inner a {
    color: #fff;
    text-decoration: none;
  }
</style>
