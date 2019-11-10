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
    <div @click="changeChapterFix" class="chapter-icon">
      <div class="chapter-icon-item">
        <Icon type="md-list"/>
      </div>
    </div>
    <Drawer title="今晚学习 Node.js 吗" width="300" placement="left" :closable="false" v-model="isChapter">
      <div class="chapter-page">
        <dl class="chapter-page-box">
          <dt class="chapter-page-item">第一章</dt>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dt class="chapter-page-item">第二章</dt>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dt class="chapter-page-item">第三章</dt>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dt class="chapter-page-item">第四章</dt>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dt class="chapter-page-item">第五章</dt>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
          <dd class="chapter-page-item-name">
            <h1>今晚学习 Node.js 吗</h1>
            <span></span>
          </dd>
        </dl>
      </div>
    </Drawer>
  </section>
</template>

<script>
  export default {
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

  .chapter-page {
    height: 100%;
    box-sizing: border-box;
    z-index: 1000;
    justify-content: space-between;
    transition: 0.32s ease;
  }

  .chapter-page-header {
    margin-bottom: 24px;
    font-size: 24px;
    color: #17233d;
    font-weight: 500;
    display: flex;
    align-items: center;

    & .icon {
      margin-right: 6px;
    }
  }

  .chapter-icon {
    position: fixed;
    left: 0;
    top: 110px;
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

  .chapter-page-item {
    font-size: 18px;
    font-weight: 500;
    color: #17233d;
  }

  .chapter-page-item-name {
    padding: 16px;
    cursor: pointer;
    transition: 0.28s ease;
    color: #515a6e;
    display: flex;
    justify-content: space-between;

    &:hover {
      color: #2d8cf0;
      padding-left: 32px;
      box-shadow: 1px 2px 3px #f0f0f0;
    }

    & h1 {
      font-size: 16px;
      font-weight: 400;
    }

    & span {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-top: 1px solid #D9D9D9;
      border-right: 1px solid #D9D9D9;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }
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
