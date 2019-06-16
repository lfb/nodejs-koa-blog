<template>
  <div class="list-pager-box">
    <Page :total="page.total" :page-size="page.per_page" :current="page.current_page" size="small" show-total @on-change="handlePage"></Page>
  </div>
</template>

<script>

  export default {
    props: ['page', 'changeRouter'],

    methods: {
      handlePage(page) {
        if (!this.changeRouter) {
          let query = Object.assign({}, this.$route.query)
          query.page = page
          let path = this.$route.path
          this.$router.push({path, query})
        }
        this.$emit('on-change', page)
      }
    }

  }

</script>
