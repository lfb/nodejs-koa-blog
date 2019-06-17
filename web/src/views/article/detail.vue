<template>
  <section id="article">
    <section class="container" v-if="detail">
      <section class="content">
        <h1 class="article-title">{{detail.title}}</h1>

        <div class="article-info">
          <p class="article-category" v-if="detail.category_detail">
            {{detail.category_detail.name}}
          </p>
          <p class="article-author"> by {{detail.author}}</p>
          <p class="article-browser">阅读 {{detail.browse}} 次
          <p class="article-browser">评论 {{detail.comments_list.data.length}} 次
          </p>
          <p class="article-author">{{detail.created_at}}</p>
        </div>

        <div class="article-detail" id="article-detail">
          <mavon-editor
            style="height: 100%"
            :ishljs="true"
            v-model="detail.content"
            :defaultOpen="'preview'"
            :editable="false"
            :subfield="false"
            :toolbarsFlag="false">
          </mavon-editor>
        </div>

        <v-comments
          :commentsList=detail.comments_list
          @changeCommentsPage="changeCommentsPage"
          @updateComments="updateComments"
          :id="id">
        </v-comments>
      </section>
    </section>
  </section>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import VComments from '../../components/Comments'

  export default {
    components: {
      VComments
    },
    data() {
      return {
        // 文章ID
        id: this.$route.params.id,
        // 文章详情
        detail: null
      }
    },
    created() {
      if (!this.id) {
        this.$router.push('/article');
      } else {
        this.getArticle();
      }
    },

    methods: {
      ...mapActions({
        getArticleDetail: 'article/getArticleDetail',
        getCommentsList: 'comments/getCommentsList',
        createComments: 'comments/createComments'
      }),

      // 更新评论
      updateComments(newComments) {
        this.detail.comments_list.data.unshift(newComments);
      },
      // 切换评论页面
      async changeCommentsPage(page) {
        const res = await this.getCommentsList({
          article_id: this.id,
          page
        });

        this.detail.comments_list = res.data.data;
      },
      /**
       * 获取文章详情
       * @returns 文章详情
       */
      async getArticle() {
        let res = await this.getArticleDetail(this.id);
        this.detail = res.data.data;
      }

    }
  }
</script>


<style lang="scss" scoped>
  .container {
    position: relative;
    display: flex;
    width: 1280px;
    margin: 24px auto;
    border-radius: 5px;

    & .content {
      padding: 32px;
      position: relative;
      background: #fff;
      flex: 1;

      & .article-title {
        font-size: 48px;
        color: #404040;
      }

      & .article-info {
        width: 100%;
        margin-top: 24px;
        display: flex;
        align-items: center;

        & p {
          display: inline-block;
          margin-right: 24px;
          font-size: 14px;
          color: #9ea7b4;
        }

        & p.article-category {
          height: 28px;
          line-height: 28px;
          padding: 0 16px;
          font-size: 14px;
          color: #409EFF;
          border-radius: 24px;
          background: rgba(51, 119, 255, .1);
        }
      }

      & .article-detail {
        font-size: 20px;
        color: #657180;
        line-height: 48px;
        margin-top: 32px;
      }
    }
  }


</style>
<style lang="scss">
  #article-detail {
    & .v-note-wrapper .v-note-panel {
      box-shadow: none !important;
    }

    & .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
      background: #fff !important;
    }

    & .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper {
      padding: 0 !important;
    }

    & .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
      padding: 0 !important;
    }
  }


</style>

