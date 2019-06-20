<template>
  <section class="container">
    <article class="article" id="article">
      <nav class="article-nav">
        <ul class="article-nav-box">
          <li v-for="(item, index) in nav"
              @click="changeArticleDesc(item.desc, index)"
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
              <p class="article-category" v-if="item.category_detail">
                {{item.category_detail.name}}
              </p>
              <p class="article-author"><i class="icon el-icon-user"></i> {{item.author}}</p>
              <p class="article-browse"><i class="icon el-icon-view"></i> {{item.browse}}</p>
              <p class="article-browse"><i class="icon el-icon-chat-dot-round"></i> {{item.comments_nums}}</p>
              <p class="article-create-at"><i class="icon el-icon-time"></i> {{item.created_at}}</p>
            </div>
          </div>
          <div class="article-img">
            <div class="article-img-inner">
              <img v-lazy="item.cover" alt="img">
              <!--              <img v-lazy="item.cover + '?imageView2/1/w/150/h/150'" alt="img">-->
            </div>
          </div>
        </li>

        <section class="page" v-if="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-count="pagination.count"
            :current-page="pagination.current_page"
            @current-change="changePage"
            :total="pagination.total">
          </el-pagination>
        </section>
      </ul>
      <ul class="article-empty" v-else>暂无文章</ul>
    </article>

    <div class="sidebar">
      <v-category/>
      <v-links/>
    </div>
  </section>
</template>
<script>
  import VCategory from '../../components/Category'

  import VLinks from '../../components/Links'
  import {mapState, mapActions} from 'vuex'
  import merge from 'webpack-merge'

  export default {
    components: {
      VCategory,
      VLinks
    },
    data() {
      return {
        nav: [
          {name: '最新', icon: 'el-icon-news', desc: 'created_at'},
          {name: '最热', icon: 'el-icon-box', desc: 'browse'}
        ],
        navIndex: 0,
        // 搜索关键字
        keyword: this.$route.query.keyword
      }
    },
    computed: {
      ...mapState({
        list: state => state.article.articleList,
        pagination: state => state.article.pagination
      }),
    },
    created() {
      // 获取文章
      this.getArticle();
      document.title = `波博客 - boblog.com`
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
        const {page, desc, category_id, keyword} = this.$route.query;

        await this.getArticleList({
          page,
          desc,
          keyword,
          category_id
        });
      },
      /**
       * 切换页码
       * @page 页码
       */
      async changePage(page) {
        this.$router.replace({
          query: merge(this.$route.query, {
            page
          })
        });
        this.getArticle();
      },

      /**
       * 切换文章排序方式
       * @desc 排序方式 created_at || browse
       * @index 排序索引
       */
      async changeArticleDesc(desc, index) {
        this.$router.replace({
          query: merge(this.$route.query, {
            desc
          })
        });
        this.navIndex = index;
        this.getArticle();
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
    width: 70%;
    margin: 24px auto;
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
      border-bottom: 1px solid #f4f4f4;

      &:hover {
        background: #f4f4f4;
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

  @media screen and (min-width: 200px) and (max-width: 768px) {
    .container {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      overflow: hidden;
      flex-direction: column;
    }

    .sidebar {
      box-sizing: border-box;
      width: auto;
      flex: 1;
      margin-left: 0;
      margin-top: 24px;
    }
  }
</style>
