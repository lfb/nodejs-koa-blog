<template>
  <!--article-->
  <!--@author: 梁凤波-->
  <!--@date  2018/11/21 08:43-->
  <section class="wrap">
    <!--column-->
    <article class="column">
      <sidebar-view @on-search="search" @on-change="fetchData"/>
    </article>

    <!--article-->
    <article class="article">
      <nav class="article-nav">
        <ul class="article-nav-box">
          <li class="article-nav-item">文章列表</li>
          <!--<li class="article-nav-item">前端</li>-->
          <!--<li class="article-nav-item">JAVA</li>-->
        </ul>
      </nav>
      <ul class="article-empty" v-if="list.length === 0">
        很抱歉，此类文章作者正在写作的路上..
      </ul>
      <ul class="article-box" v-else>
        <mu-container ref="container" class="demo-loadmore-content">
          <mu-load-more :loading="loading" @load="load">
            <li v-for="(item, index) in list" :key="index">
              <router-link class="article-item" :to="{path: '/article/detail/' + item.id}">
                <div class="article-content">
                  <h2 class="article-title">
                    {{item.title}}
                  </h2>
                  <div class="article-introduce">
                    {{item.introduce}}
                  </div>
                  <div class="article-info">
                    <span class="article-info_category">{{item.category}}</span>
                    <span class="article-info_author">{{item.author}}</span>
                    <span class="article-info_timer">{{item.createdAt}}</span>
                  </div>
                </div>
                <div class="article-img">
                  <img v-lazy="item.banner" alt="IMG">
                </div>
              </router-link>
            </li>
            <li class="all-article" v-if="isAll">
              数据加载完毕
            </li>
          </mu-load-more>
        </mu-container>
      </ul>
    </article>
    <article class="advertising">
      <!--<div class="advertising-img">-->
      <!--<img src="../../assets/images/BOBLOG-02.png" alt="">-->
      <!--</div>-->
    </article>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import SidebarView from './Sidebar'
  import merge from 'webpack-merge'
  // import Pagination from '../../components/Pagination'
  // import Navigation from '../../components/Navigation'

  export default {
    components: {
      SidebarView
    },
    data() {
      return {
        list: [],
        page: null,
        pageIndex: 1,
        category: this.$route.query.category,
        loading: false,
        isAll: false
      }
    },
    computed: {
      ...mapState({})
    },
    created() {
      if (this.category) {
        this.fetchData({category: this.category});

      } else {
        this.fetchData();
      }

    },
    methods: {
      ...mapActions({
        getArticleList: 'article/getArticleList',
        searchArticle: 'article/searchArticle'
      }),
      // 获取数据
      async fetchData(params = {}) {
        const loading = this.$loading({
          text: '加载中..',
          color: '#2d8cf0'
        });
        try {
          this.$progress.start();

          const ret = await this.getArticleList(params);
          if (params.page) {
            this.list.push(ret.data);

          } else {
            this.list = ret.data;
          }
          this.page = ret.meta;

          this.$progress.done();
          loading.close();
          this.loading = false;

        } catch (e) {
          loading.close();
          this.$progress.done();
          this.loading = false;
        }
      },

      // 滚动加载
      load() {
        if (this.isAll) return false;

        let page = this.page;
        if (page.current_page && page.current_page === page.total_pages) {
          this.$toast.info('已加载完毕数据~');
          this.isAll = true;
          return false;

        } else {
          // 重新查询数据
          this.isAll = false;
          this.loading = true;
          this.pageIndex += 1;
          this.handlePage(this.pageIndex);
        }
      },

      // 处理页码
      handlePage(page) {
        let query = Object.assign({}, this.$route.query);
        query.page = page;

        // 动态改变路由订单状态参数orderStatus
        this.$router.push({
          query: merge(this.$route.query, query)
        });

        this.fetchData(query);

      },

      // 重新获取数据
      reloadData() {
        this.routerLink('/');
        this.fetchData();
      },

      /**
       * 搜索文章
       */
      async search(params) {
        const loading = this.$loading({
          text: '加载中..',
          color: '#2d8cf0'
        });
        try {
          this.$progress.start();
          this.list = await this.searchArticle(params);
          loading.close();
          this.$progress.done();

        } catch (e) {
          loading.close();
          this.$progress.done();

        }
      },

      /**
       * 路由跳转
       * @param path
       */
      routerLink(path) {
        this.$router.push(path);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    display: flex;
    width: 100%;
    flex-direction: row;
    background: #fff;
  }

  .column {
  }

  .article {
    flex: 1;
    min-height: 100vh;
    margin-left: 560px;
  }

  .article-nav {
    padding: 0 32px;
  }

  .article-nav-box {
    display: flex;
    height: 99px;
    padding: 0 16px;
    line-height: 99px;
    border-bottom: 1px solid #f0f0f0;
  }

  .article-nav-item {
    font-size: 20px;
    color: #262626;
    margin-right: 32px;
  }

  .article-box {
    box-sizing: border-box;
    padding: 32px;
    background: #fff;
  }

  .article-header {
    width: 100%;
    font-size: 24px;
    font-weight: 800;
    height: 100px;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .article-header-img {
    height: 100px;
    & img {
      height: 100px;
    }
  }

  .article-item {
    border-radius: 6px;
    padding: 16px;
    display: flex;
    color: #1c2438;
    cursor: pointer;
    margin-bottom: 16px;
    border: 1px solid #eee;
    background: #fff;
    &:hover {
      color: #2d8cf0;
      border-bottom: 1px solid #f0f0f0;
      box-shadow: 4px 4px 4px #f0f0f0;
    }
  }

  .article-content {
    flex: 1;
    padding: 0 16px;
  }

  .article-img {
    width: 120px;
    & img {
      width: 100%;
      border-radius: 5px;
    }
  }

  .article-title {
    font-size: 24px;
  }

  .article-introduce {
    font-size: 18px;
    padding: 16px 0;
    color: #404040;
  }

  .article-info {
    & span {
      color: #989898;
      font-size: 16px;
      margin-right: 16px;
      &.article-info_category {
        color: #2d8cf0;
        display: inline-block;
        padding: 5px 25px;
        border-radius: 32px;
        background: rgba(51, 119, 255, .1);
      }
    }
  }

  .advertising {
    width: 320px;
    text-align: center;
    border-radius: 4px;
  }

  .article-empty, .all-article {
    text-align: center;
    padding: 32px 0;
    font-size: 16px;
    color: #989898;
  }

  /*.advertising-img {*/
  /*width: 100%;*/
  /*& img {*/
  /*width: 100%;*/
  /*}*/
  /*}*/
  @media screen and (min-width: 200px) and (max-width: 750px) {
    .wrap {
      flex-direction: column;
    }
    .article {
      flex: 1;
      margin-left: 0;
    }
  }
</style>
