<template>
  <div>
    <div class="container">
      <div class="article">
        <h1 class="title">
          {{ article.title }}
        </h1>
        <div class="info">
          <span class="author"> By {{ article.admin_info.nickname }} </span>
          <span class="created-at">{{ article.created_at }}</span>
          <span v-if="article.category_info" class="category">
            文章分类：{{ article.category_info.name }}
          </span>
        </div>
        <div class="article-content" v-html="article.content"></div>
      </div>
      <div class="fixed-sidebar">
        <div class="fixed-comment">
          <i class="el-icon-chat-round" @click="onShowComment"></i>
        </div>
        <div class="fixed-scroll-top">
          <i class="el-icon-top" @click="scrollTop"></i>
        </div>
      </div>
    </div>

    <vue-lazy-component>
      <ArticleComment class="container" />
      <img
        width="0"
        height="0"
        style="display: none"
        src="https://cdn.boblog.com/login-bg.png"
        alt="preload"
      />
    </vue-lazy-component>
  </div>
</template>
<script>
import { getArticleDetail } from '@/request/api/article'
import ArticleComment from '@/components/article/ArticleComment'
import { mapState } from 'vuex'
import { component as VueLazyComponent } from '@xunlei/vue-lazy-component'

export default {
  name: 'ArticleDetail',
  components: {
    ArticleComment,
    VueLazyComponent,
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
        article: res.data.data,
      }
    }
  },
  data() {
    return {
      isLogin: false,
    }
  },
  async fetch({ store }) {
    await store.dispatch('category/getCategoryData')
  },
  head() {
    const article = this.article || {}
    return {
      title: article.title,
      meta: [
        { name: 'keywords', content: article.seo_keyword },
        { name: 'description', content: article.description },
      ],
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLoginStatus: (state) => state.user.isLoginStatus,
    }),
  },
  mounted() {
    console.log(this.article)
  },
  methods: {
    // 回到顶部
    scrollTop() {
      this.$scrollTo(0)
    },
    // 点击展开评论
    onShowComment() {
      this.$refs.comment && this.$refs.comment.onShowComment()
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  box-sizing: border-box;
  width: 880px;
  margin: 0 auto;
}
.article {
  box-sizing: border-box;
  width: 100%;
  margin: 80px auto 0;
  padding-bottom: 80px;
  border-bottom: 1px solid #e8e8e8;
}

.title {
  height: 42px;
  font-size: 36px;
  font-weight: 600;
  color: #222222;
  line-height: 42px;
  text-align: center;
}

.info {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 22px 0 48px;
}

.info span {
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
  margin-right: 65px;

  &:last-child {
    margin-right: 0;
  }
}
.fixed-sidebar {
  cursor: pointer;
  position: fixed;
  bottom: 32px;
  right: 32px;
}
</style>

