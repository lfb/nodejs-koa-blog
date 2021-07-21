<template>
  <div>
    <div class="header">
      <div class="header-inner">
        <a href="/" class="logo"></a>
        <div class="navigator-fix">
          <div class="navigator-box">
            <div class="navigator-inner">
              <form class="search-box" action="/">
                <input
                  name="keyword"
                  type="text"
                  class="search"
                  placeholder="搜索"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

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

    <div class="copyright">
      &copy;
      <a href="http://www.boblog.com" class="copyright-item"
        >波波博客 - BoBlog.com</a
      >
      <span class="copyright-mark"></span>
      <a href="mailto:itbo@163.com" class="copyright-item">itbo@163.com</a>
      <span class="copyright-mark"></span>
      <a href="https://beian.miit.gov.cn" target="_blank" class="copyright-item"
        >粤ICP备2020120493号</a
      >
    </div>
  </div>
</template>
<script>
import { getArticleList } from '@/request/api/article'
export default {
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

body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.header {
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
}

.header-inner {
  height: 64px;
  width: 960px;
  margin: 0 auto;
}

.logo {
  position: relative;
  float: left;
  display: inline-block;
  box-sizing: border-box;
  width: 150px;
  height: 64px;
  background: url(https://img1.homary.com/common/2021/07/21/34a7ec704253d27043c9735d82245b22.png) -16px
    center no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  text-align: center;
}

.navigator-fix {
  width: 100%;
  height: 64px;
  float: right;
  margin-left: -150px;
}

.navigator-box {
  height: 56px;
  padding-left: 150px;
}

.navigator-inner {
  text-align: right;
  height: 64px;
  clear: both;
}

.search-box {
  position: relative;
  height: 100%;
  width: 100%;
}

.search {
  box-sizing: border-box;
  width: 320px;
  padding: 0 12px;
  margin-top: 14px;
  height: 36px;
  line-height: 36px;
  color: #404040;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.container {
  box-sizing: border-box;
  width: 960px;
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
  font-weight: bold;
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

.copyright {
  padding: 32px 0;
  color: #9199a1;
  font-size: 13px;
  text-align: center;
  background: #f8f8f8;
}

.copyright-item {
  color: #9199a1;
  text-decoration: none;
}
.copyright-item:hover {
  color: #0164da;
}
.copyright-mark {
  display: inline-block;
  margin: 0 10px;
  height: 10px;
  width: 1px;
  background: #ccc;
}
</style>
