<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
export default {
  components: {
    Header,
    Footer
  },
}
</script>
<style lang="scss" scoped>
</style>
