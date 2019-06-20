<template>
  <section class="container" v-if="detail">
    <section class="content">
      <h1 class="article-title">{{detail.title}}</h1>

      <div class="article-info">
        <p class="article-category" v-if="detail.category_detail">
          {{detail.category_detail.name}}
        </p>
        <p class="article-author"><i class="icon el-icon-user"></i> {{detail.author}}</p>
        <p class="article-browse"><i class="icon el-icon-view"></i> {{detail.browse}}</p>
        <p class="article-browse"><i class="icon el-icon-chat-dot-round"></i> {{detail.comments_list.data.length}}</p>
        <p class="article-create-at"><i class="icon el-icon-time"></i> {{detail.created_at}}</p>
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

      <div class="v-comments">
        <v-comments
          :commentsList=detail.comments_list
          @changeCommentsPage="changeCommentsPage"
          @updateComments="updateComments"
          :id="id">
        </v-comments>
      </div>
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
        document.title = this.detail.title;
      }

    }
  }
</script>


<style lang="scss" scoped>
  .container {
    box-sizing: border-box;
    position: relative;
    width: 70%;
    margin: 24px auto;

    & .content {
      box-sizing: border-box;
      padding: 32px;
      position: relative;
      width: 100%;
      background: #fff;
      border-radius: 8px;

      & .article-title {
        font-size: 54px;
        color: #404040;
      }

      & .article-info {
        width: 100%;
        & p {
          display: inline-block;
          margin-right: 24px;
          margin-top: 24px;
          font-size: 16px;
          color: #9ea7b4;
        }

        & p.article-category {
          height: 32px;
          line-height: 32px;
          padding: 0 32px;
          font-size: 16px;
          color: #409EFF;
          border-radius: 32px;
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

  @media screen and (min-width: 200px) and (max-width: 768px) {
    .container {
      width: 100%;
    }
    .container .content .article-info p.article-created-at {
      display: none;
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



