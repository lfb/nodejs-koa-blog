<template>
  <section>
    <div class="column-chapter">
      <dl v-for="(item, index) in 2" :key="index">
        <dt>Chapter {{index + 1}}：Node.js 基础</dt>
        <dd v-for="(item2, index) in 3" :key="index" @click="toColumnChapterDetail">
          <h1>今晚学习 Node.js 吗</h1>
          <span></span>
        </dd>
      </dl>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Chapter',
    data() {
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
      toColumnChapterDetail(id) {
        this.$router.push(`/column/chapter/detail?id=1`)
      }
    }
  }
</script>

<style scoped lang="less">
  .column-chapter dt {
    font-size: 18px;
    font-weight: 500;
    color: #17233d;
    padding-top: 24px;
  }

  .column-chapter dd {
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
</style>
