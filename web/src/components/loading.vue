<template>
  <section :class="loadingClass">
    <div class="loading-box"></div>
    <div class="loading-text">{{ text }}</div>
  </section>
</template>
<script>
  export default {
    props: ['text'],
    data() {
      return {
        // 是否置顶
        isFixed: false
      }
    },
    computed: {
      loadingClass() {
        return this.isFixed ? 'loading-wrap loading-wrap-fixed-top' : 'loading-wrap'
      }

    },
    mounted() {
      // 监听滚动条
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      // 移除滚动条
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      // 处理滚动条
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let offsetTop = document.querySelector('#nav').offsetTop;
        this.isFixed = !!(scrollTop > offsetTop)
      }
    }
  }
</script>
<style scoped>
  .loading-wrap {
    position: fixed;
    left: 0;
    top: 214px;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    transition: 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 1);
  }

  .loading-wrap-fixed-top {
    top: 0;
  }

  .loading-box {
    background: no-repeat center/40px url('../assets/spinner.svg');
    margin-top: -20px;
    margin-left: -20px;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    -webkit-animation: loader 1s linear infinite;
    animation: loader 1s linear infinite;
  }

  .loading-text {
    position: relative;
    top: 48px;
    font-size: 16px;
    color: #2d8cf0;
  }

  @keyframes loader {
    0% {
      -webkit-transform: rotate(0deg) translateZ(0);
      transform: rotate(0deg) translateZ(0);
    }
    100% {
      -webkit-transform: rotate(360deg) translateZ(0);
      transform: rotate(360deg) translateZ(0);
    }
  }
</style>
