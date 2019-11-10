<template>
  <section class="article-detail">
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
      文章内容
    </div>

    <!-- 评论列表-->
    <v-comment-list/>
    <!-- 新建评论-->
    <v-comment-create/>
  </section>
</template>

<script>
  import VCommentList from '../../components/comment-ist'
  import VCommentCreate from '../../components/comment-create'

  export default {
    components: {
      VCommentList,
      VCommentCreate
    },
    name: 'detail'
  }
</script>

<style scoped lang="less">
  .article-detail {
    width: @window-Width;
    margin: 24px auto;
    min-height: 80vh;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 32px;
    background: #fff;
  }

  .article-title {
    color: #17233d;
    text-align: center;
    font-size: 36px;
    font-weight: 500;
    margin-top: 16px;
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
