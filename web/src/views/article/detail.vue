<template>
  <section id="article">
    <section class="container" v-if="detail">
      <section class="content">
        <h1 class="article-title">{{detail.title}}</h1>

        <div class="article-info">
          <p class="article-category" v-if="detail.category">
            {{detail.category.name}}
          </p>
          <p class="article-author"> by {{detail.author}}</p>
          <p class="article-browser">阅读 {{detail.browser}} 次
          </p>
          <p class="article-author">{{detail.createdAt}}</p>
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

        <section class="article-comments">
          <h1 class="comments-title">评论：</h1>
          <article class="comments-inner">
            <div class="user-info">
              <p class="user-info-item">
                <label for="username">姓名：</label>
                <input type="text" id="username" placeholder="姓名">
              </p>
              <p class="user-info-item">
                <label for="email">邮箱：</label>
                <input type="email" id="email" placeholder="邮箱">
              </p>
            </div>
            <div class="comments-content">
              <p class="comments-content-title">评论内容：</p>
              <textarea name="comments" id="comments" cols="30" rows="10" placeholder="评论内容.."></textarea>
            </div>
            <button class="submit-comments">提交评论</button>
          </article>
        </section>

      </section>

      <div class="sidebar">
        <v-category/>
      </div>

    </section>
  </section>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import VCategory from '../../components/Category'

  export default {
    components: {
      VCategory
    },
    data() {
      return {
        // 是否侧边栏
        sidebarFixed: false,
        // 文章ID
        id: this.$route.params.id,
        // 文章详情
        detail: null
      }
    },
    computed: {},
    created() {
      this._getArticleDetail();
    },
    mounted() {
      // 监听滚动条
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      // 移除滚动条
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      ...mapActions({
        getArticleDetail: 'article/getArticleDetail',
        getCategoryArticle: 'category/getCategoryArticle'
      }),
      // 获取文章详情
      async _getArticleDetail() {
        let ret = await this.getArticleDetail(this.id);
        this.detail = ret.data.data;
      },
      // 处理滚动条
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let offsetTop = document.querySelector('#article-detail').offsetTop;
        this.sidebarFixed = !!(scrollTop > offsetTop)
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
      animation: contentAnimation 0.36s 0.18s ease both;

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
          color: #2d8cf0;
          border-radius: 24px;
          background: rgba(51, 119, 255, .1);
        }
      }

      & .article-detail {
        font-size: 20px;
        color: #657180;
        line-height: 48px;
      }
    }

    @keyframes contentAnimation {
      0% {
        opacity: 0;
        top: 64px;
        filter: alpha(opacity=0);
      }

      25% {
        opacity: 0.25;
        filter: alpha(opacity=25);
      }
      50% {
        opacity: 0.5;
        filter: alpha(opacity=50);
      }
      75% {
        opacity: 0.75;
        filter: alpha(opacity=75);
      }

      100% {
        opacity: 1;
        filter: alpha(opacity=100);
        top: 0;
      }
    }

    & .margin-right-300 {
      margin-right: 316px;
    }
  }

  .sidebar {
    box-sizing: border-box;
    width: 320px;
    margin-left: 24px;
  }

  .article-comments {
    margin: 32px 0 16px;
    border-top: 1px solid #e8eaec;

    & .comments-title {
      padding: 16px 0;
      color: #2d8cf0;
      font-size: 32px;
    }

    & .comments-inner {
      padding-left: 16px;
    }

    & .recommend-empty {
      text-align: center;
      padding: 32px 0;
      font-size: 16px;
      color: #989898;
    }

    & .user-info {
      padding-bottom: 16px;

      & .user-info-item {
        font-size: 18px;
        margin-bottom: 16px;
        color: #464c5b;

        &:last-child {
          margin-bottom: 0;
        }

        & label {
          font-weight: 800;
        }

        & input {
          width: 375px;
          font-size: 18px;
          padding: 5px 10px;
          border-radius: 4px;
          border: 1px solid #dcdee2;
        }
      }
    }

    & .comments-content {
      & .comments-content-title {
        padding-bottom: 16px;
        font-size: 18px;
        color: #464c5b;
        font-weight: 800;
      }

      & textarea {
        width: 600px;
        font-size: 18px;
        padding: 5px 10px;
        border-radius: 4px;
        border: 1px solid #dcdee2;
      }
    }

    & .submit-comments {
      cursor: pointer;
      padding: 10px 20px;
      border: none;
      color: #fff;
      border-radius: 4px;
      margin-top: 16px;
      font-size: 18px;
      background-image: linear-gradient(to right, #5cadff 0, #2d8cf0 100%);
      background-repeat: repeat-x;

      &:hover {
        background-image: linear-gradient(to right, #2d8cf0 0, #2b85e4 100%);
        background-repeat: repeat-x;
      }
    }
  }


</style>
<style>
  .v-note-wrapper .v-note-panel {
    box-shadow: none !important;
  }

  .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    background: #fff !important;
  }

  .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper {
    padding: 0 !important;
  }

  .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    padding: 0 !important;
  }
</style>

