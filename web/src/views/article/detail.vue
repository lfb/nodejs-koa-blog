<template>
  <!--article-->
  <!--@author: 梁凤波-->
  <!--@date  2018/11/21 08:43-->
  <section class="article-wrap">
    <article class="sidebar">
      <sidebar-view/>
    </article>
    <section class="content">
      <article class="article" v-if="detail">
        <ul class="article-inner">
          <li class="article-item">
            <h1 class="article-title">{{detail.title}}</h1>
            <div class="article-info">
              <span>分类：{{detail.category}}</span>
              <span>作者：{{detail.author}}</span>
              <span>{{detail.createdAt}}</span>
            </div>
            <div class="article-content">
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
          </li>
        </ul>
      </article>
    </section>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import SidebarView from './Sidebar'

  export default {
    components: {
      SidebarView
    },
    data() {
      return {
        content: 'hello world!',
        id: this.$route.params.id
      }
    },
    computed: {
      ...mapState({
        detail: state => state.article.articleDetail,
      })
    },
    created() {
      this.fetchData();
    },
    methods: {
      ...mapActions({
        getArticleDetail: 'article/getArticleDetail'
      }),

      async fetchData() {
        const loading = this.$loading({
          text: '加载中..',
          color: '#2d8cf0'
        });

        try {
          this.$progress.start();
          await this.getArticleDetail(this.id);
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
  /*content*/
  .content {
    min-height: 100vh;
    margin-left: 560px;
  }

  /*article*/
  .article {
    flex: 8;
    overflow: hidden;
  }

  .article-item {
    padding: 32px;
    margin-bottom: 32px;
    background: #fff;
    box-shadow: 8px 8px 8px #f0f0f0;
    &:last-child {
      margin-bottom: 0;
      box-shadow: none;
      border-bottom: 1px solid #f0f0f0;
    }
  }

  .article-title {
    color: #262626;
    text-align: center;
    font-size: 40px;
  }

  .article-info {
    color: #808695;
    text-align: center;
    font-size: 18px;
    padding: 32px;
    & span {
      display: inline-block;
      margin-right: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .article-content {
    color: #515a6e;
    padding: 32px 0;
    box-sizing: border-box;
    font-size: 20px;
  }

  .article-img {
    width: 100%;
    cursor: pointer;
    overflow: hidden;
    & img {
      width: 100%;
    }
  }

  .article-link-btn {
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 4px;
    font-size: 18px;
    padding: 10px 30px;
    color: #fff;
    background-color: #2d8cf0;
    transition: background-color linear 0.1s;
    &:hover {
      background-color: #0065db;
    }
  }

  .page {
    text-align: center;
    padding: 32px 16px;
    background-color: #fff;
  }

  .sidebar {
    flex: 4;
  }

  .top {
    padding: 0 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 4px;
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .content {
      width: 100%;
      margin: 0;
      min-height: auto;
      display: flex;
      flex-direction: column;
    }

    /*article*/
    .article {
      margin-right: 0;
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
</style>
