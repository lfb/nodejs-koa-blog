<template>
  <div>
    <div v-html="article.content"></div>
  </div>
</template>
<script>
import {getArticleDetail} from '@/request/api/article'
export default {
  async asyncData(context) {
    const [err, res] = await getArticleDetail({
      id: context.query.id,
      is_markdown: true
    })
    if(!err) {
      return {
        article: res.data.data
      }
    }
  },
  data() {
    return {
      article: null,
    }
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.1.0/styles/atom-one-dark.min.css'
      }
    ],
  },
  methods: {
   async fetchData() {
    const [err, data] = await getArticleDetail({
       id: this.$route.query.id
     })
     if(!err) {
       console.log('data', data)
       this.article = data.data.data
     }
    }
  }
};
</script>

<style scoped>

</style>
