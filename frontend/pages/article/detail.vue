<template>
  <div>
    <div class="header">
      <div class="header-inner">
        <a href="/" class="logo"></a>
        <div class="navigator-fix">
          <div class="navigator-box">
            <div class="navigator-inner">
              <form class="search-box" action="/search">
                <input type="text" class="search" placeholder="搜索"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="article">
        <h1 class="title">
          {{article.title}}
        </h1>
        <div class="info">
            <span class="category">
                {{article.category_info.name}}
            </span>
          <span class="created-at">
                2021-02-13 20:08:35
            </span>
        </div>
        <div v-html="article.content" >
        </div>
      </div>
    </div>
    <div class="copyright">
      &copy;本文原创发布于波波博客 - <a href="http://www.boblog.com">BoBlog.com</a>，转载请注明出处，谢谢合作！
    </div>
  </div>
</template>
<script>
import {getArticleDetail} from '@/request/api/article'
export default {
  name: "ArticleDetail",
  async asyncData(context) {
    const { id } = context.query
    const params = {
      id,
      is_markdown: true
    }
    const [err, res] = await getArticleDetail(params)
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
  }
};
</script>

<style scoped>
html, body, div, h1, h2, h3, h4, h5, h6, a, ul, li {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

a {
  color: #0164da;
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
  background: url(https://img1.homary.com/common/2021/07/21/34a7ec704253d27043c9735d82245b22.png) -16px center no-repeat;
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
  width: 960px;
  margin: 0 auto;
}

.title {
  font-weight: bold;
  font-size: 36px;
  margin: 24px 0;
  text-align: center;
}

.info {
  text-align: center;
  margin: 24px 0 32px;
}

.info span {
  color: #808080;
  font-size: 14px;
  display: inline-block;
  margin: 0 10px;
}

.copyright {
  padding: 32px 0;
  color: #9199a1;
  margin-top: 32px;
  font-size: 13px;
  text-align: center;
  background: #f8f8f8;
}

.text {
  color: #f0f0f0;
}

</style>

