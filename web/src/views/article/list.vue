<template>
  <section class="container">

    <section :class="categoryClass" id="category">
      <ul class="category-box" v-if="categoryList.length > 0">
        <li v-for="(cate, index) in categoryList"
            @click="changCategory(cate.id, index)"
            :class="categoryActiveIndex === index ? 'category-item category-item-active' : 'category-item'"
            :key="index">
          <img :src="cate.icon" :alt="cate.title">
          {{cate.name}}
          <span v-if="cate.sub_category"
                :class="categoryActiveIndex === index
                ? 'category-more-icon category-more-icon-active'
                : 'category-more-icon'"></span>
          <div class="category-children" v-if="cate.sub_category">
            <p class="category-children-item"
               v-for="(child, index2) in cate.sub_category"
               @click.stop="_getCategoryArticle(child.id)"
               :key="index2">
              {{child.name}}
            </p>
          </div>
        </li>
      </ul>
    </section>

    <article :class="articleClass" id="article">
      <ul class="article-box" v-if="list.length > 0">
        <li class="article-item" v-for="(item, index) in list"
            :key="index"
            @click="toPathLink('/article/detail/' + item.id)">

          <div class="article-content">
            <h1 class="article-title">{{item.title}}</h1>
            <div class="article-introduction">
              {{item.introduction}}
            </div>
            <div class="article-info">
              <span class="article-category" v-if="item.category">
                {{item.category.name}}
              </span>
              <span class="article-tag">{{item.tag}}</span>
              <span class="article-browse">阅读：{{item.browser}}次</span>
              <span class="article-author">{{item.author}}</span>
              <span class="article-author">{{item.createdAt}}</span>
            </div>
          </div>

          <div class="article-img">
            <img v-lazy="item.cover + '?imageView2/1/w/150/h/150'" alt="img">
          </div>
        </li>
        <div class="page">
          <pagination :page="pagination" @on-change="_getArticleList"/>
        </div>
      </ul>
      <ul class="article-empty" v-else>暂无文章</ul>
    </article>

  </section>
</template>
<script>
  import Pagination from '../../components/Pagination'
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      Pagination
    },
    data() {
      return {
        categoryActiveIndex: 0,
        // 是否分类固定
        isCategoryFixed: false,
        categoryList: [],
        // 搜索关键字
        keyword: this.$route.query.keyword,
        // 页码
        page: this.$route.query.page
      }
    },
    mounted() {
      // 监听滚动条
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      // 移除滚动条
      window.removeEventListener('scroll', this.handleScroll)
    },
    computed: {
      ...mapState({
        list: state => state.article.articleList,
        pagination: state => state.article.pagination
      }),
      // 分类
      categoryClass() {
        return this.isCategoryFixed ? 'category category-fixed' : 'category'
      },
      // 文章
      articleClass() {
        return this.isCategoryFixed ? 'article article-margin-left' : 'article'
      }
    },
    created() {
      this._getCategoryList();

      if (this.page) {
        console.log("啊啊啊")
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
        getCategoryList: 'category/getCategoryList',
        getCategoryArticle: 'category/getCategoryArticle',
        searchArticle: 'article/searchArticle'
      }),
      async _getArticleList(page) {
        await this.getArticleList({page});
      },
      // 获取分类
      async _getCategoryList() {
        const ret = await this.getCategoryList({
          include: 'tree'
        });
        this.categoryList = ret.data.data;
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
      toPathLink(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .container {
    box-sizing: content-box;
    padding: 0 32px;
    max-width: 1264px;
    min-height: 100%;
    display: flex;
    margin: 0 auto;
    background: #fff;

    & .category {
      width: 220px;

      & .category-box {
        margin: 32px 0;

        & .category-item {
          position: relative;
          cursor: pointer;
          text-align: center;
          color: #464c5b;
          padding-bottom: 32px;
          font-size: 18px;
          display: flex;
          align-items: center;
          border-radius: 6px;

          & img {
            width: 28px;
            margin-right: 4px;
          }

          &:hover .category-children {
            display: block;
          }

          &:hover {
            color: #2d8cf0;
          }

          &:hover .category-more-icon {
            color: #2d8cf0;
            border-color: #2d8cf0;
            margin-top: 5px;
            animation: categoryArrow 0.2s ease both;
          }


          & .category-more-icon {
            display: inline-block;
            border-right: 1px solid #808695;
            border-bottom: 1px solid #808695;
            width: 10px;
            height: 10px;
            margin-top: -5px;
            margin-left: 8px;
            transform: rotate(45deg);
          }

          & .category-more-icon-active {
            border-color: #2d8cf0;
          }

          & .category-children {
            animation: showCategoryAnimation 0.2s ease both;
            overflow: hidden;
            color: #464c5b;
            display: none;
            position: absolute;
            left: 0;
            top: 48px;
            line-height: 56px;
            width: 80%;
            border: 1px solid #dcdee2;
            border-radius: 6px;
            z-index: 8888;
            padding: 16px 0;
            background: #fff;
            text-align: left;

            & p {
              cursor: pointer;
              padding: 0 16px;

              &:hover {
                color: #2d8cf0;
                background: #f8f8f9;
              }
            }
          }
        }

        & .category-item-active {
          color: #2d8cf0;
        }
      }
    }

    & .category-fixed {
      position: fixed;
      width: 220px;
      top: 96px;
    }

    & .article {
      box-sizing: border-box;
      flex: 1;

      & .article-item {
        cursor: pointer;
        padding: 32px 0;
        display: flex;
        border-bottom: 1px solid #e8eaec;
        animation: showArticleAnimation 0.66s ease both;
        @for $i from 1 to 11 {
          &:nth-child(#{$i}) {
            animation-delay: (0.2s * $i);
          }
        }

        &:hover .article-title {
          color: #3399ff;
          text-decoration: underline;
        }


        &:last-child {
          border-bottom: none;
        }
      }

      & .article-img {
        width: 150px;
        margin-left: 32px;

        & img {
          width: 100%;
          border-radius: 5px;
        }
      }

      & .article-empty {
        text-align: center;
        padding: 32px 0;
        font-size: 16px;
        color: #989898;
      }

      .article-content {
        flex: 1;
      }

      & .article-title {
        color: #464c5b;
        font-size: 24px;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      & .article-introduction {
        font-size: 16px;
        color: #657180;
        padding: 16px 0;
      }

      & .article-info {
        width: 100%;

        & span {
          display: inline-block;
          margin-right: 10px;
          font-size: 14px;
          color: #9ea7b4;
        }

        & span.article-category,
        & span.article-tag {
          background: #e8eaec;
          padding: 2px 16px;
          border-radius: 32px;
          background: rgba(51, 119, 255, .1);
          /*padding: 2px 16px;*/
          /*color: #5cadff;*/
          /*border-radius: 32px;*/
          /*display: inline-block;*/
          /*background: rgba(51, 119, 255, .1);*/
        }
      }
    }

    & .article-margin-left {
      margin-left: 220px;
    }

    @keyframes showArticleAnimation {
      0% {
        opacity: 0;
        filter: alpha(opacity=0);
        transform: scale(0, 0);
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
        transform: scale(1, 1);
      }
    }

    @keyframes showCategoryAnimation {
      0% {
        opacity: 0;
        height: 0;
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
        height: auto;
        filter: alpha(opacity=100);
      }
    }

    @keyframes categoryArrow {
      0% {
        transform: rotate(45deg);
      }

      100% {
        transform: rotate(-135deg);
      }
    }
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .container {
      & .category {
        display: none;
      }

      & .article-margin-left {
        margin-left: 0;
      }

      & .article {
        & .article-img {
          width: 100px;
          margin-left: 32px;

          & img {
            width: 100%;
            border-radius: 5px;
          }
        }

        & .article-info {
          width: 100%;

          & span {
            display: inline-block;
            margin-right: 5px;
            font-size: 14px;
            color: #9ea7b4;
          }

          & span.article-category,
          & span.article-tag {
            padding: 2px 10px;
          }
        }
      }
    }
  }
</style>
