<template>
  <section class="container">
    <article class="article" id="article">
      <nav class="article-nav">
        <ul class="article-nav-box">
          <li v-for="(item, index) in nav"
              @click="updateArticleType(index)"
              :class="index === navIndex ? 'article-nav-item article-nav-item--active' : 'article-nav-item'"
              :key="index">
            <i :class="item.icon"></i> {{item.name}}
          </li>
        </ul>
      </nav>
      <ul class="article-box" v-if="list.length > 0">
        <li class="article-item" v-for="(item, index) in list"
            :key="index"
            @click="toPath('/article/detail/' + item.id)">
          <div class="article-content">
            <h1 class="article-title">
              {{item.title}}
            </h1>
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
          <div class="article-img">
            <div class="article-img-inner">
              <img v-lazy="item.cover + '?imageView2/1/w/150/h/150'" alt="img">
            </div>
          </div>
        </li>

        <section class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="32">
          </el-pagination>
        </section>
      </ul>
      <ul class="article-empty" v-else>暂无文章</ul>
    </article>

    <div class="sidebar">
      <v-category/>
      <v-author/>
    </div>

  </section>
</template>
<script>
  import VCategory from '../../components/Category'
  import VAuthor from '../../components/Author'
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      VAuthor,
      VCategory

    },
    data() {
      return {
        nav: [
          {name: '最新', icon: 'el-icon-news'},
          {name: '最热', icon: 'el-icon-box'}
        ],
        navIndex: 0,
        // 搜索关键字
        keyword: this.$route.query.keyword,
        banner: [
          {
            title: 'nodejs',
            img: 'https://upload.jianshu.io/admin_banners/web_images/4660/224da83c76e01d5deff07e163615921233af5c82.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
          },
          {
            title: 'node',
            img: 'https://upload.jianshu.io/admin_banners/web_images/4592/22f5cfa984d47eaf3def6a48510cc87c157bf293.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
          },
          {
            title: 'css',
            img: 'https://upload.jianshu.io/admin_banners/web_images/4668/77e4329017294a607d78e74789afc6a22f4a6ebe.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
          }
        ]
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
       * 更新文章
       */
      updateArticleType(index) {
        this.navIndex = index;
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
    min-height: 66vh;
    margin: 0 auto 24px;
    overflow: hidden;
  }

  .article {
    flex: 9;
    border-radius: 8px;
    background: #fff;

    & .article-nav {
      padding: 16px 0;
      border-bottom: 1px solid #efefef;
    }

    & .article-nav-box {
      display: flex;
      align-items: center;
    }

    & .article-nav-item {
      cursor: pointer;
      padding: 0 24px;
      position: relative;
      font-size: 18px;
      color: #404040;

      &:after {
        display: block;
        content: "";
        width: 1px;
        height: 16px;
        position: absolute;
        top: 5px;
        right: 0;
        border-right: 1px solid #efefef;
      }

      &:last-child:after {
        display: none;
      }

      &:hover {
        color: #409EFF;
      }
    }

    & .article-nav-item--active {
      color: #409EFF;
    }

    & .article-item {
      cursor: pointer;
      padding: 24px;
      display: flex;
      border-bottom: 1px solid #f8f8f8;

      &:hover {
        box-shadow: 4px 4px 4px rgba(0, 0, 0, .05);
        background: #fff;
      }

      &:hover .article-title {
        color: #409EFF;
      }
    }

    & .article-img {
      .article-img-inner {
        width: 96px;

        & img {
          width: 100%;
          border-radius: 5px;
        }
      }
    }


    .article-content {
      flex: 1;
      margin-right: 24px;
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
      margin-top: 24px;
      display: flex;
      align-items: center;

      & p {
        display: inline-block;
        margin-right: 24px;
        font-size: 16px;
        color: #9ea7b4;
      }

      & p.article-category {
        height: 28px;
        line-height: 28px;
        padding: 0 16px;
        font-size: 16px;
        color: #409EFF;
        border-radius: 24px;
        background: rgba(51, 119, 255, .1);
      }
    }
  }

  .article-empty {
    text-align: center;
    padding: 24px 0;
    font-size: 16px;
    color: #989898;
  }

  .sidebar {
    box-sizing: border-box;
    width: 320px;
    margin-left: 24px;
  }

  .page {
    padding: 32px 0;
    text-align: center;
  }
</style>
