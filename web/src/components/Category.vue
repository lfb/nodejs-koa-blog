<template>
  <div class="category">
    <h1 class="category-title">分类</h1>
    <ul class="category-box">
      <li class="category-item">JavaScript（21）</li>
      <li class="category-item">HTML/CSS（3）</li>
      <li class="category-item">Vue.js（5）</li>
      <li class="category-item">Node.js（2）</li>
      <li class="category-item">HTTP（2）</li>
      <li class="category-item">Webpack（12）</li>
      <li class="category-item">数据结构（2）</li>
      <li class="category-item">算法（3）</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Category"
  }
</script>

<style scoped lang="scss">
  .category {
    padding: 0 24px;
    background: #fff;

    & .category-title {
      display: flex;
      align-items: center;
      color: #464c5b;
      font-size: 24px;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    & .category-box {
      padding: 10px 0;

    }

    & .category-item {
      cursor: pointer;
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      color: #657180;
      transition: left 1s ease-in;

      &:hover {
        color: #2d8cf0;
      }
    }
  }
</style>
