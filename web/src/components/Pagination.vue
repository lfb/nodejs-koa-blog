<template>
  <section v-if="pagination">
    <Page :total="pagination.total" :page-size="parseInt(pagination.per_page)" :current="pagination.current_page" size="small" show-total @on-change="handlePage"></Page>
  </section>
</template>

<script>
  export default {
    props: ['pagination'],
    data() {
      return {}
    },

    methods: {
      // 页码切换事件
      handlePage(page) {
        let query = Object.assign({}, this.$route.query);
        query.page = page;
        let path = this.$route.path;

        this.$router.push({path, query});

        this.$emit('on-change', {category})
      }
    }
  }
</script>
