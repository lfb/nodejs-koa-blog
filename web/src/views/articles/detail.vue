<template>
  <section class="article-detail">
    <div class="article-container">
      <h1 class="article-title">
        今天学习 Nodejs 吗
      </h1>
      <ul class="article-intro">
        <li class="articles-item-category">node.js</li>
        <li>
          <Icon size="16" type="ios-person-outline"/>
          梁凤波
        </li>
        <li>
          <Icon size="16" type="ios-eye-outline"/>
          100
        </li>
        <li>
          <Icon size="16" type="ios-text-outline"/>
          100
        </li>
      </ul>
      <div class="article-content">
        <mavon-editor
          style="height: 100%"
          :ishljs="true"
          v-model="content"
          :defaultOpen="'preview'"
          :editable="false"
          :subfield="false"
          :toolbarsFlag="false" />
      </div>

      <!-- 新建评论-->
      <v-comment-create/>
      <!-- 评论列表-->
      <v-comment-list/>
    </div>

    <!-- 侧边栏 -->
    <v-main-sidebar/>
  </section>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import VCommentList from '../../components/comment-list'
  import VCommentCreate from '../../components/comment-create'
  import VMainSidebar from '../../components/main-sidebar'

  export default {
    components: {
      mavonEditor,
      VCommentList,
      VCommentCreate,
      VMainSidebar
    },
    name: 'detail',
    data () {
      return {
        content: '内容'
      }
    }
  }
</script>

<style scoped lang="less">
  .article-detail {
    width: @window-Width;
    margin: 24px auto;
    min-height: 80vh;
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
  }

  .article-container {
    box-sizing: border-box;
    flex: 1;
    padding: 32px;
    margin-right: 32px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 1px 2px 3px #f0f0f0;
    background: #fff;
  }

  .article-title {
    color: #17233d;
    text-align: center;
    font-size: 36px;
    font-weight: 500;
  }

  .article-intro {
    color: #515a6e;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0;
  }

  .article-intro li {
    display: inline-block;
    margin-right: 24px;
    font-size: 16px;
    color: #9ea7b4;
    white-space: nowrap;
  }

  li.articles-item-category {
    height: 28px;
    line-height: 28px;
    padding: 0 24px;
    font-size: 16px;
    color: #409EFF;
    border-radius: 64px;
    background: rgba(51, 119, 255, .1);
  }
</style>
