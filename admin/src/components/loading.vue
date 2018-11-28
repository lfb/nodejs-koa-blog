<template>
  <section class="wrap">
    <div class="loading-icon">
      <p class="loading-text">
        {{ text }}q111
      </p>
    </div>
  </section>
</template>
<script>
  export default {
    props: ['text'],
    data() {
      return {}
    }
  }
</script>
<style scoped>
  .wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    transition: 0.3s ease-in-out;
    background-color: #fff;
  }

  .loading-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    width: 100%;
    font-size: 28px;
  }

  .van-loading-icon {
    display: inline-block;
  }

  .loading-text {
    margin-top: 32px;
    animation: colorAnimates 3s infinite;
  }

  .loading-text span {
    display: inline-block;
  }

  @keyframes colorAnimates {
    0% {
      color: #2d8cf0;
    }
    25% {
      color: #19be6b;
    }
    50% {
      color: #ff9900;
    }
    75% {
      color: #2b85e4;
    }
    100% {
      color: #ed3f14;
    }
  }
</style>
