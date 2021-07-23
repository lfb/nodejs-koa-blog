<template>
  <div>
    <Header />
    <div class="container">
      <div class="article">
        <h1 class="title">
          {{ article.title }}
        </h1>
        <div class="description">
          {{ article.description }}
        </div>
        <div class="info">
          <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
          <span class="category">
            {{ article.category_info.name }}
          </span>
          <span class="created-at">{{article.created_at}}</span>
        </div>
        <div v-html="article.content"></div>
      </div>
    </div>

    <Comment :id="id"/>
    <Footer/>
  </div>
</template>
<script>
import { getArticleDetail } from '@/request/api/article'

import Comment from '@/components/Comment'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'ArticleDetail',
  components: {
    Comment,
    Header,
    Footer,
  },
  async asyncData(context) {
    const { id } = context.query
    const params = {
      id,
      is_markdown: true,
    }
    const [err, res] = await getArticleDetail(params)
    if (!err) {
      return {
        id,
        article: res.data.data,
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 750px;
  margin: 0 auto;
}

.title {
  font-weight: 600;
  font-size: 46px;
  margin: 28px 0;
  line-height: 56px;
}
.description {
  color: #757575;
  margin: 20px 0;
  font-size: 22px;
}
.info {
  display: flex;
  align-items: center;
  margin: 32px 0;
}

.info span {
  color: #757575;
  font-size: 14px;
  display: inline-block;
  margin-right: 10px;
}
</style>

