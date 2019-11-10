<template>
  <section class="articles">

    <article class="article-list">
      <!-- 专栏组件-->
      <v-column-item :isButton="isButton"/>
      <div class="column-chapter">
        <dl v-for="(item, index) in 2" :key="index">
          <dt>Chapter {{index + 1}}：Node.js 基础</dt>
          <dd v-for="(item2, index) in 3" :key="index" @click="toColumnChapterDetail">今晚学习 Node.js 吗</dd>
        </dl>
      </div>
    </article>

    <article class="articles-category">
      <div class="articles-box">
        <div class="box-header">
          <div class="box-header-title">
            <Icon type="ios-apps" class="icon" size="20"/>
            分类
          </div>
        </div>
        <div class="articles-box-content">
          <ul>
            <li>
              <Icon class="icon" style="color: #e34c24;" type="logo-html5"/>
              html（ 10 ）
            </li>
            <li>
              <Icon class="icon" style="color: #006fba;" type="logo-css3"/>
              css（ 15 ）
            </li>
            <li>
              <Icon class="icon" style="color: #f0da4e;" type="logo-javascript"/>
              javascript（ 32 ）
            </li>
            <li>
              <Icon class="icon" style="color: #8cc84b" type="logo-nodejs"/>
              Node.js（ 93 ）
            </li>
            <li>Vue.js（ 1 ）</li>
            <li>HTTP（ 1 ）</li>
            <li>数据结构与算法</li>
          </ul>
        </div>
      </div>
      <div class="articles-box">
        <div class="box-header">
          <div class="box-header-title">
            <Icon class="icon" type="ios-link" size="20"/>
            链接
          </div>
        </div>
        <div class="articles-box-content">
          <ul>
            <li>
              <Icon class="icon" type="logo-github"/>
              Github
            </li>
            <li>
              慕课网
            </li>
            <li>
              coding.net
            </li>
          </ul>
        </div>
      </div>

    </article>

  </section>
</template>

<script>
  import VColumnItem from '@/components/ColumnItem'

  export default {
    components: {
      VColumnItem
    },
    name: 'list',
    data () {
      return {
        isButton: false,
        list: []
      }
    },
    methods: {
      /**
       * 路由跳转
       * @param id
       */
      toColumnChapterDetail (id) {
        this.$router.push(`/column/chapter/detail?id=1`)
      }
    }
  }
</script>

<style scoped lang="less">
  .articles {
    width: @window-Width;
    display: flex;
    margin: 24px auto;
  }

  .article-list {
    flex: 1;
    margin-right: 32px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 1px 2px 3px #f0f0f0;
    background: #fff;
  }

  .column-chapter {
    padding: 32px;
  }

  .column-chapter dt {
    font-size: 18px;
    font-weight: 500;
    color: #17233d;
  }

  .column-chapter dd {
    padding: 16px;
    font-size: 16px;
    color: #515a6e;
    cursor: pointer;
    transition: 0.28s ease;

    &:hover {
      color: #2d8cf0;
      padding-left: 32px;
      box-shadow: 1px 2px 3px #f0f0f0;
    }
  }

  .articles-category {
    width: 350px;
  }

  .articles-box {
    margin-bottom: 32px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 1px 2px 3px #f0f0f0;
    background: #fff;
  }

  .articles-box-content {
    padding: 24px 32px;
  }

  .articles-box-content ul li {
    cursor: pointer;
    margin-bottom: 24px;
    font-size: 16px;
    color: #657180;
    display: flex;
    align-items: center;

    &:hover {
      color: #409EFF;
    }
  }

  .articles-box-content ul li:last-child {
    margin-bottom: 0;
  }

  .icon {
    margin-right: 10px;
  }
</style>
