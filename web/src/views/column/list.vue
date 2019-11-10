<template>
  <section class="articles">

    <article class="article-list">
      <!-- 专栏组件-->
      <v-column-item/>
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
    methods: {
      /**
       * 路由跳转
       * @param id
       */
      // toArticle(id) {
      //   this.$router.push(`/article/detail?id=${id}`)
      // }
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
