<!--文章详情-->
<template>
  <section class="article-detail" v-if="article">
    <div class="article-container">
      <h1 class="article-title">
        {{article.title}}
      </h1>
      <ul class="article-intro">
        <li class="articles-item-category" v-if="article.category">
          {{article.category.name}}
        </li>
        <li>
          <Icon size="16" type="ios-person-outline"/>
          {{article.author}}
        </li>
        <li>
          <Icon size="16" type="ios-eye-outline"/>
          {{article.browse}}
        </li>
        <li v-if="article.article_comment">
          <Icon size="16" type="ios-text-outline"/>
          {{article.article_comment.data.length}}
        </li>
      </ul>
      <div class="article-content">
        <mavon-editor
            style="height: 100%"
            :ishljs="true"
            v-model="article.content"
            :defaultOpen="'preview'"
            :editable="false"
            :subfield="false"
            :toolbarsFlag="false"/>
      </div>

      <!-- 新建评论-->
      <div class="comment-header">
        <Icon type="ios-create-outline"/>
        欢迎评论
      </div>
      <v-comment-create
          :target_id="article.id"
          :target_type="targetType"
          @updateComment="updateComment"/>
      <!-- 评论列表-->
      <div v-if="article.article_comment.data.length > 0">
        <v-comment-list :target_id="parseInt(id)" @updateComment="updateComment"/>
      </div>
    </div>

    <!-- 侧边栏 -->
    <v-main-sidebar/>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    components: {
      VCommentList: () => import('../../components/comment-list'),
      VCommentCreate: () => import('../../components/comment-create'),
      VMainSidebar: () => import('../../components/main-sidebar')
    },
    name: 'detail',
    data() {
      return {
        article: null,
        id: this.$route.query.id,
        targetType: 'article'
      }
    },
    created() {
      this.getArticle()
    },
    methods: {
      ...mapActions({
        getArticleDetail: 'articles/detail'
      }),
      async getArticle() {
        const r = await this.getArticleDetail({
          id: this.id
        })
        this.article = r.data.data
        this.$store.commit('comment/SET_COMMENT_LIST', r.data.data.article_comment.data)
        this.$store.commit('comment/SET_COMMENT_PAGE', r.data.data.article_comment.meta)
      },
      /**
       * 更新评论
       **/
      updateComment(newComment, type) {
        if (type === 'comment') {
          this.article.article_comment.data.unshift(newComment)
        } else if (type === 'reply') {
          this.getArticle()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .article-detail {
    width: @window-Width;
    margin: 24px auto;
    min-height: 80vh;
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
  }

  .article-container {
    box-sizing: border-box;
    flex: 1;
    padding: 32px;
    margin-right: 32px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 1px 2px 3px #f0f0f0;
    background: #fff;
  }

  .article-title {
    color: #17233d;
    text-align: center;
    font-size: 40px;
    font-weight: 500;
  }

  .article-intro {
    color: #515a6e;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0;
  }

  .article-intro li {
    display: flex;
    align-items: center;
    margin-right: 24px;
    font-size: 16px;
    color: #9ea7b4;
    white-space: nowrap;
  }

  li.articles-item-category {
    height: 28px;
    line-height: 28px;
    padding: 0 24px;
    font-size: 16px;
    color: #409EFF;
    border-radius: 64px;
    background: rgba(51, 119, 255, .1);
  }

  .comment-header {
    font-size: 28px;
    font-weight: 500;
    color: #2d8cf0;
    padding: 32px 0 16px;
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .article-detail {
      width: 100%;
    }

    .article-container {
      margin-right: 0;
    }
  }
</style>
