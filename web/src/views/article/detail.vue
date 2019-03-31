<template>
  <section id="article">
    <section class="container" v-if="detail">

      <section :class="contentClass">
        <h1 class="article-title">{{detail.title}}</h1>

        <div class="article-info">
          <span class="article-category">{{detail.category.name}}</span>
          <span class="article-tag">{{detail.tag}}</span>
          <span class="article-browse">阅读：{{detail.browser}}次</span>
          <span class="article-author">{{detail.author}}</span>
          <span class="article-author">{{detail.createdAt}}</span>
        </div>

        <div class="article-detail" id="article-detail">
          <mavon-editor
            style="height: 100%"
            :ishljs="true"
            codeStyle="vs2015"
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

      <article :class="sidebarClass">
        <div class="recommend">
          <h1 class="recommend-title">
            相关推荐
            <img src="../../assets/recommend8.png" alt="recommend">
          </h1>
          <ul class="recommend-inner" v-if="recommend.length > 0">
            <li class="recommend-item">
              <h1 v-for="(item, index) in recommend.slice(0, 5)" @click="_getArticleDetail(item.id)" :key="index">
                {{item.title}}
              </h1>
            </li>
          </ul>
          <ul class="recommend-empty" v-else>暂无推荐</ul>
        </div>
      </article>

    </section>
  </section>
</template>
<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {},
    data() {
      return {
        // 是否侧边栏
        sidebarFixed: false,
        // 文章ID
        id: this.$route.params.id,
        // 文章详情
        detail: null,
        // 推荐列表
        recommend: []
      }
    },
    computed: {
      // 内容样式
      contentClass() {
        return this.sidebarFixed ? 'content margin-right-300' : 'content'
      },
      // 侧边栏样式
      sidebarClass() {
        return this.sidebarFixed ? 'sidebar sidebar-fixed' : 'sidebar'
      }
    },
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

        // 获取分类列表
        this._getCategoryArticle({
          id: this.detail.category.id,
          isLoading: false
        });

      },
      // 分类下取文章
      async _getCategoryArticle(id) {
        let res = await this.getCategoryArticle(id);

        let arr = []
        res.data.data.forEach(item => {
          arr = item.articles.map(children => {
            return children;
          })
        })

        this.recommend = arr;
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
    max-width: 1264px;
    margin: 0 auto;
    padding: 32px;
    background: #fff;

    & .content {
      position: relative;
      flex: 1;
      margin-right: 32px;
      animation: contentAnimation 0.36s 0.18s ease both;

      & .article-title {
        font-size: 38px;
        color: #464c5b;
      }

      .article-info {
        width: 100%;
        margin: 32px 0;

        & span {
          display: inline-block;
          margin-right: 10px;
          font-size: 16px;
          color: #9ea7b4;
        }

        & span.article-category,
        & span.article-tag {
          background: #e8eaec;
          padding: 2px 16px;
          border-radius: 4px;
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

    & .sidebar {
      box-sizing: border-box;
      width: 300px;
      animation: rightAnimation 0.36s 0.18s ease both;

      & .recommend {

        & .recommend-title {
          font-size: 24px;
          padding-bottom: 16px;
          color: #464c5b;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #e8eaec;

          & img {
            width: 24px;
          }
        }

        & .recommend-inner {
        }

        & .recommend-item {
          & h1 {
            cursor: pointer;
            padding: 0;
            margin: 16px 0;
            font-size: 18px;
            color: #464c5b;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &:hover {
              color: #3399ff;
              text-decoration: underline;
            }
          }
        }
      }
    }

    & .sidebar-fixed {
      position: fixed;
      margin-left: 964px;
      top: 128px;
    }

    @keyframes rightAnimation {
      0% {
        opacity: 0;
        filter: alpha(opacity=0);
      }

      25% {
        opacity: 0.25;
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
      }
    }
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

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .container {
      position: relative;
      display: flex;
      flex-direction: column;
      max-width: 1264px;
      margin: 0 auto;
      background: #fff;

      & .content {
        margin-right: 0;
      }

      & .sidebar-fixed {
        position: relative !important;
        margin-left: 0 !important;
        top: 0 !important;
      }

      & .sidebar {
        display: none;
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

