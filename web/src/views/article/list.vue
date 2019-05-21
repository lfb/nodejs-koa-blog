<template>
  <section class="container">
    <article class="article" id="article">
      <ul class="article-box" v-if="list.length > 0">
        <li class="article-item" v-for="(item, index) in list"
            :key="index"
            @click="toPath('/article/detail/' + item.id)">
          <div class="article-img">
            <img v-lazy="item.cover + '?imageView2/1/w/150/h/150'" alt="img">
          </div>
          <div class="article-content">
            <h1 class="article-title">{{item.title}}</h1>
            <div class="article-info">
              <p class="article-category" v-if="item.Category">
                {{item.Category.name}}
              </p>
              <p class="article-author"> by {{item.author}}</p>
              <p class="article-browse">阅读 {{item.browse}} 次
              </p>
              <p class="article-author">{{item.createdAt}}</p>
            </div>
          </div>

        </li>
      </ul>
      <ul class="article-empty" v-else>暂无文章</ul>
    </article>

    <div class="sidebar">
      <v-category/>
    </div>

  </section>
</template>
<script>
  import VCategory from '../../components/Category'
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      VCategory
    },
    data() {
      return {
        // 搜索关键字
        keyword: this.$route.query.keyword
      }
    },
    computed: {
      ...mapState({
        list: state => state.article.articleList
      }),
    },
    created() {
      // 获取文章
      this.getArticle();

      // 存在关键字就自动搜索
      if (this.keyword) {
        this.getSearchArticle();
      }
    },
    methods: {
      ...mapActions({
        getArticleList: 'article/getArticleList',
        searchArticle: 'article/searchArticle'
      }),
      /**
       * 获取文章
       *
       * @returns 文章列表
       */
      async getArticle() {
        await this.getArticleList();
      },
      /**
       * 搜索文章
       * @returns 文章列表
       */
      async getSearchArticle() {
        await this.searchArticle({
          keyword: this.keyword
        });
      },

      /**
       * 路由跳转
       * @param path 路由地址
       */
      toPath(path) {
        this.$router.push(path)
      },
    }
  }
</script>

<style lang="scss" scoped>

  .container {
    display: flex;
    width: 1280px;
    margin: 24px auto;
    border-radius: 5px;
  }

  .article {
    flex: 9;
    background: #fff;

    & .article-item {
      cursor: pointer;
      padding: 24px;
      display: flex;
      border-bottom: 1px solid #f0f0f0;
      transition: 0.1s ease-in;

      &:hover {
        background: #f0f0f0;
      }
    }

    & .article-img {
      width: 120px;
      height: 120px;

      & img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }


    .article-content {
      flex: 1;
      margin-left: 32px;
    }

    & .article-title {
      color: #464c5b;
      font-size: 24px;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
  }

  .article-empty {
    text-align: center;
    padding: 32px 0;
    font-size: 16px;
    color: #989898;
  }

  .sidebar {
    box-sizing: border-box;
    width: 320px;
    margin-left: 24px;
  }
</style>
