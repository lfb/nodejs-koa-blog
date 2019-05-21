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
        <div class="page">
          <pagination :page="pagination" @on-change="_getArticleList"/>
        </div>
      </ul>
      <ul class="article-empty" v-else>暂无文章</ul>
    </article>

    <div class="sidebar">
      <v-category/>
    </div>

  </section>
</template>
<script>
  import Pagination from '../../components/Pagination'
  import VCategory from '../../components/Category'
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      Pagination,
      VCategory
    },
    data() {
      return {
        list: [],
        categoryActiveIndex: 0,
        // 是否分类固定
        isCategoryFixed: false,
        // 搜索关键字
        keyword: this.$route.query.keyword,
        // 页码
        page: this.$route.query.page
      }
    },
    mounted() {
    },
    destroyed() {
    },
    computed: {
      ...mapState({
        // list: state => state.article.articleList,
        pagination: state => state.article.pagination
      }),
    },
    created() {

      if (this.page) {
        this._getArticleList(this.page);

      } else {
        this._getArticleList();
      }

      // 存在关键字就自动搜索
      if (this.keyword) {
        this.search();
      }
    },
    methods: {
      ...mapActions({
        getArticleList: 'article/getArticleList',
        getCategoryArticle: 'category/getCategoryArticle',
        searchArticle: 'article/searchArticle'
      }),
      async _getArticleList(page) {
        let res = await this.getArticleList({page});
        this.list = res.data.data;
      },
      // 搜索
      async search() {
        await this.searchArticle({
          keyword: this.keyword
        });
      },

      // 分类下取文章
      async _getCategoryArticle(id) {
        let res = await this.getCategoryArticle({id});

        let arr = []
        res.data.data.forEach(item => {
          arr = item.articles.map(children => {
            return children;
          })
        })

        this.$store.commit('article/SET_ARTICLE_LIST', arr)
      },
      // 处理滚动条
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let offsetTop = document.querySelector('#article').offsetTop;
        this.isCategoryFixed = !!(scrollTop > offsetTop)
      },
      // 改变分类索引
      changCategory(id, index) {
        this.categoryActiveIndex = index;
        this._getCategoryArticle(id);
      },
      // 路由跳转
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
