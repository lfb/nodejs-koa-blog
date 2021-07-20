<template>
  <div v-if="article" class="mavonEditor">
    <no-ssr>
      <mavon-editor
        v-model="article.content"
        style="height: 100%"
        :ishljs="true"
        code-style="atom-one-dark"
        :default-open="'preview'"
        :editable="false"
        :subfield="false"
        :toolbars-flag="false"/>
<!--      <mavon-editor v-model="article.content" :toolbars="markdownOption"/>-->
    </no-ssr>
  </div>
</template>
<script>
import {getArticleDetail} from '@/request/api/article'
export default {
  data() {
    return {
      article: null,
      markdownOption: {
        bold: true, // 粗体
      },
      handbook: "#### how to use mavonEditor in nuxt.js"
    }
  },
  mounted() {
    this.fetchData()
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
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>
