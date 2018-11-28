<template>
  <!--Footer-->
  <!--@author: 梁凤波-->
  <!--@date  2018/10/11 10:29-->
  <section class="Footer-wrap">
    <footer class="footer-inner">
      <div class="footer-logo">
        <p class="footer-logo-img">
          <img src="http://images.boblog.com/BOBLOG-02.png" alt="BOBLOG">
        </p>
      </div>
      <p>www.boblog.com - 波部落格，&copy;Copyright 梁凤波个人博客 itbo@163.com</p>
      <p><a href="http://www.miit.gov.cn/" target="_blank">粤ICP备18001135号-3</a></p>
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
    padding: 32px;
    line-height: 36px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    font-weight: 800;
    background: #262626;
    & a {
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      text-decoration: none;
    }
  }

  .footer-logo {
    height: 100px;
    width: 100%;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
  }

  .footer-logo-img {
    width: 25%;
    & img {
      width: 100%;
    }
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .footer-logo-img {
      width: 50%;
    }
  }
</style>
