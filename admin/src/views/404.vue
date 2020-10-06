<template>
  <div class="container">
    <div class="title">404</div>
    <p style="font-size:24px">页面不存在</p>
    <p><Button type="text" icon="arrow-return-left" @click.native="$router.go(-1)">返 回</Button></p>
  </div>
</template>
<style scoped>
  .container {
    text-align: center;
    vertical-align: middle;
    width: 100%;
    height: 100%;
  }
  .title {
    font-size: 100px;
    padding-top: 100px;
  }
</style>

<script>

  export default {
    created() {
      this.$Loading.finish();
    }
  }
</script>
