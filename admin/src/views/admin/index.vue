<template>
  <section v-if="adminAuth">
    <h1 style="text-align: center;margin-top: 100px">{{adminAuth.nickname}}，欢迎您！</h1>
  </section>

</template>

<script>
  import {mapState, mapActions} from "vuex"

  export default {
    components: {},

    data() {

      return {}
    },

    computed: {
      ...mapState({
        adminAuth: state => state.admin.adminAuth
      }),
    },

    methods: {}
  }
</script>

<style scoped>
  h1 {
    font-weight: normal;
  }
</style>
