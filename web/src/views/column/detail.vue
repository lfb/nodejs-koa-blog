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

    <!-- 抽屉滑动章节-->
    <div @click="changeChapterFix" class="chapter-icon">
      <div class="chapter-icon-item">
        <Icon type="md-list"/>
      </div>
    </div>
    <Drawer title="今晚学习 Node.js 吗" width="300" placement="left" :closable="false" v-model="isChapter">
      <v-column-chapter/>
    </Drawer>
  </section>
</template>

<script>
  import VColumnChapter from '../../components/column-chapter'
  import VCommentList from '../../components/comment-ist'
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
        isChapter: false
      }
    },
    methods: {
      changeChapterFix () {
        this.isChapter = !this.isChapter
      }
    }
  }
</script>

<style scoped lang="less">
  .article-detail {
    position: relative;
    width: @window-Width;
    overflow: hidden;
    margin: 24px auto;
    min-height: 80vh;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 32px;
    background: #fff;
  }

  .chapter-icon {
    position: fixed;
    left: 0;
    top: 120px;
    background: transparent;
  }

  .chapter-icon-item {
    width: 48px;
    height: 42px;
    font-size: 20px;
    color: #808695;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 10px 10px 0;
    border: 1px solid #dcdee2;
    border-left: none;
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
