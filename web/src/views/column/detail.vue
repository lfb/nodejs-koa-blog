<template>
  <section class="chapter-detail">
    <div class="chapter-table">
      <h1 class="chapter-table-title">
        今天学习 Nodejs 吗
      </h1>
      <v-column-chapter/>
    </div>
    <div class="chapter-container">
      <h1 class="chapter-title">
        今天学习 Nodejs 吗
      </h1>
      <ul class="chapter-intro">
        <li class="chapters-item-category">node.js</li>
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
      <div class="chapter-content">
        文章内容
      </div>
      <!-- 新建评论-->
      <v-comment-create/>
      <!-- 评论列表-->
      <v-comment-list/>
    </div>
  </section>
</template>

<script>
  import VColumnChapter from '../../components/column-chapter'
  import VCommentList from '../../components/comment-list'
  import VCommentCreate from '../../components/comment-create'

  export default {
    components: {
      VColumnChapter,
      VCommentList,
      VCommentCreate
    },
    name: 'detail',
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="less">
  .chapter-detail {
    position: relative;
    width: @window-Width;
    overflow: hidden;
    margin: 24px;
    left: 20%;
    height: 100%;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 32px;
    background: #fff;
  }

  .chapter-table {
    position: fixed;
    height: 100%;
    width: 20%;
    top: 120px;
    left: 0;
    overflow: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 24px;
    border-radius: 0 6px 6px 0;
    background: #fff;
  }

  .chapter-table-title {
    color: #17233d;
    font-size: 24px;
    padding-bottom: 24px;
    font-weight: 500;
    border-bottom: 1px solid #f0f0f0;
  }

  .chapter-container {
    flex: 1;
    background: #fff;
  }

  .chapter-box {
    width: 350px;
    margin-right: 32px;
  }

  .chapter-icon {
    position: fixed;
    left: 0;
    top: 120px;
    background: transparent;
  }

  .chapter-title {
    color: #17233d;
    text-align: center;
    font-size: 36px;
    font-weight: 500;
    margin-top: 16px;
  }

  .chapter-intro {
    color: #515a6e;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0;
  }

  .chapter-intro li {
    display: inline-block;
    margin-right: 24px;
    font-size: 16px;
    color: #9ea7b4;
    white-space: nowrap;
  }

  li.chapters-item-category {
    height: 28px;
    line-height: 28px;
    padding: 0 24px;
    font-size: 16px;
    color: #409EFF;
    border-radius: 64px;
    background: rgba(51, 119, 255, .1);
  }

</style>
