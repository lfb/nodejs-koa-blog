<template>
  <section>
    <ul class="article-box">
      <li class="articles-item" v-for="(item, index) in 10" @click="toArticleDetail(index)" :key="index">
        <div class="articles-item-info">
          <h1 class="articles-item-title">今晚学习 Node.js 吗？</h1>
          <div class="articles-item-description">
            CMU 中国社区希望输出 CMU 在 AI 领域的影响力，关注 AI 领域的技术创新、产业应用，知识传播、创投趋势。
          </div>
          <ul class="articles-item-intro">
            <li class="articles-item-category">node.js</li>
            <li class="articles-item-author">
              <Icon size="16" type="ios-person-outline"/>
              梁凤波
            </li>
            <li class="articles-item-browse">
              <Icon size="16" type="ios-eye-outline"/>
              100
            </li>
            <li class="articles-item-comment">
              <Icon size="16" type="ios-text-outline"/>
              100
            </li>
          </ul>
        </div>
        <div class="articles-images">
          <img src="http://cdn.boblog.com/FmdNNoR1MRtgvmQD1KwaKzbkL_i7?imageView2/1/w/100/h/100" alt="articles">
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'ArticleItem',
    methods: {
      toArticleDetail (id) {
        this.$router.push('/article/detail?id=' + id)
      }
    }
  }
</script>

<style scoped lang="less">

  .articles-item {
    cursor: pointer;
    padding: 24px;
    display: flex;
    border-bottom: 1px solid #f6f6f6;
    transition: 0.12s ease-in;

    &:hover {
      background: #f6f6f6;
    }

    &:hover .articles-item-title {
      color: #2d8cf0;
    }
  }

  .articles-item-info {
    flex: 1;
  }

  .articles-item-title {
    color: #17233d;
    font-size: 22px;
    font-weight: 500;
  }

  .articles-item-description {
    color: #808695;
    padding: 24px 0;
  }

  .articles-item-intro {
    display: flex;
    align-items: center;
  }

  .articles-item-intro li {
    display: inline-block;
    margin-right: 32px;
    font-size: 16px;
    color: #9ea7b4;
    white-space: nowrap;
  }

  .articles-item-intro .articles-item-category {
    height: 28px;
    line-height: 28px;
    padding: 0 32px;
    font-size: 16px;
    color: #409EFF;
    border-radius: 64px;
    background: rgba(51, 119, 255, .1);
  }

  .articles-images {
    width: 100px;
    margin-left: 32px;

    & img {
      width: 100%;
      border-radius: 6px;
    }
  }
</style>
