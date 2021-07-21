<template>
  <div>
    <div class="header">
      <div class="header-inner">
        <a href="/" class="logo"></a>
        <div class="navigator-fix">
          <div class="navigator-box">
            <div class="navigator-inner">
              <form class="search-box" action="/search">
                <input type="text" class="search" placeholder="搜索" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="article">
        <h1 class="title">
          {{ article.title }}
        </h1>
        <div class="info">
          <span class="category">
            {{ article.category_info.name }}
          </span>
          <span class="created-at"> 2021-02-13 20:08:35 </span>
        </div>
        <div v-html="article.content"></div>
      </div>
    </div>

    <div class="comment">
      <el-button type="primary" icon="el-icon-view" @click="onPreComment"
        >预览评论</el-button
      >

      <div>请输入内容，支持Markdown语法</div>
      <el-input
        v-model="comment"
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
      >
      </el-input>
      <el-button type="primary" @click="submitComment">提交</el-button>
    </div>

    <div class="comment" v-html="preCommentContent"></div>

    <div class="comment-list">
      <ul class="comment-box">
        <li
          v-for="item in commentList.data"
          :key="item.id"
          class="comment-item"
        >
          {{ item.user_info || '匿名哥哥' }}：
          <div v-html="mdRender(item.content)"></div>
          （{{ item.created_at }}）

          <div class="comment">
            <el-button type="primary" icon="el-icon-view" @click="onPreReply"
              >预览回复</el-button
            >

            <div>请输入内容，支持Markdown语法</div>
            <el-input
              v-model="reply"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            >
            </el-input>
            <el-button type="primary" @click="submitReply(item.id)"
              >回复</el-button
            >
            <div v-html="preReplyContent"></div>
          </div>
        </li>
      </ul>
    </div>

    <div class="copyright">
      &copy;本文原创发布于波波博客 -
      <a href="http://www.boblog.com">BoBlog.com</a>，转载请注明出处，谢谢合作！
    </div>
  </div>
</template>
<script>
import { getArticleDetail } from '@/request/api/article'
import { createReply } from '@/request/api/reply'
import { getCommentTarget, createComment } from '@/request/api/comment'

const hljs = require('highlight.js')
const md = require('markdown-it')({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, {
            language: lang,
            ignoreIllegals: true,
          }).value +
          '</code></pre>'
        )
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    )
  },
})

export default {
  name: 'ArticleDetail',
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
        commentList: [],
        article: res.data.data,
      }
    }
  },
  data() {
    return {
      reply: '',
      preReplyContent: '',
      comment: '',
      preCommentContent: '',
      article: null,
    }
  },
  mounted() {
    this.getComment()
  },
  methods: {
    async submitReply(commentId) {
      const [err, data] = await createReply({
        article_id: this.id,
        user_id: 0,
        reply_user_id: 0,
        comment_id: commentId,
        content: this.reply,
      })
      if (!err) {
        console.log('data', data)
        this.content = ''
        this.$message.success('回复成功，审核通过后展示！')
      }
    },
    onPreReply() {
      this.preReplyContent = this.mdRender(this.reply)
    },
    onPreComment() {
      this.preCommentContent = this.mdRender(this.comment)
    },
    mdRender(content) {
      return md.render(content)
    },
    async submitComment() {
      const [err, data] = await createComment({
        user_id: 0,
        article_id: this.id,
        content: this.comment,
      })
      if (!err) {
        console.log('data', data)
        this.content = ''
        this.$message.success('评论成功，审核通过后展示！')
      }
    },
    async getComment() {
      const [err, res] = await getCommentTarget({
        article_id: this.id,
        is_replay: 1,
        is_user: 1,
      })
      if (!err) {
        console.log('res.data.data', res.data.data)
        this.commentList = res.data.data
      }
    },
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

