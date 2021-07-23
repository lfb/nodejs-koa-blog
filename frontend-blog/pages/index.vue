<template>
  <div>
    <Header />

    <div class="container">
      <ul class="article">
        <li v-for="item in article.data" :key="item.id" class="article-list">
          <a :href="'/article/detail?id=' + item.id" class="article-item">
            <div class="article-image">
              <img :src="item.img_url" alt="title" />
            </div>

            <div class="article-item-content">
              <h1 class="article-title">
                {{ item.title }}
              </h1>
              <div class="article-description">
                {{ item.description }}
              </div>

              <div class="article-category">
                {{ item.category_info.name }}
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <Footer />
  </div>
</template>
<script>
import { getArticleList } from '@/request/api/article'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Footer
  },
  async asyncData(context) {
    const { id, keyword } = context.query

    const [err, res] = await getArticleList({
      id,
      keyword,
      is_category: 1,
      is_admin: 1,
    })
    if (!err) {
      return {
        article: res.data.data,
      }
    }
  },
  data() {
    return {
      article: null,
    }
  },
  mounted() {
    console.log(this.article)
  },
}
</script>

<style scoped>
html,
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
a,
ul,
li {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

a {
  color: #0164da;
}

.container {
  box-sizing: border-box;
  width: 750px;
  margin: 0 auto;
}

/*文章*/
.article-list {
  box-sizing: border-box;
  display: block;
  clear: both;
  height: 148px;
  padding-top: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.article-list:last-child {
  border: none;
}

.article-list:hover .article-title {
  color: #0164da;
  text-decoration: underline;
}

.article-item {
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
  -webkit-transition: background-color 0.35s, color 0.35s, margin 0.45s,
    -webkit-transform 0.5s;
  transition: background-color 0.35s, color 0.35s, margin 0.45s, transform 0.5s;
}

.article-image {
  float: left;
  width: 100px;
}

.article-image img {
  width: 100%;
  border-radius: 4px;
}

.article-item-content {
  overflow: hidden;
  padding-left: 24px;
  height: 124px;
}

.article-title {
  font-weight: 600;
  font-size: 18px;
  color: #404040;
}

.article-description {
  font-size: 14px;
  color: #404040;
  margin: 12px 0 24px;
}

.article-category {
  font-size: 14px;
  color: #808080;
}
</style>
