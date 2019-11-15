<template>
  <div>
    <h1 style="text-align: center;margin-top: 100px">{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        msg: 'Welcome to Your Backstage'
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-weight: normal;
  }
</style>
