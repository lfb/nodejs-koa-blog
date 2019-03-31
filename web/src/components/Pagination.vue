<template>
  <section class="page" v-if="page">
    <div class="page-click">
      <li class="page-total">共{{page.total}}条</li>
      <li class="page-click-header" @click="backward"></li>
      <li v-for="(item, index) in page.total_pages"
          @click="handlePage(index + 1)"
          :class="(index) + 1 === page.current_page ? 'page-click-item page-click-item_active' : 'page-click-item'"
          :key="index">
        {{index + 1}}
      </li>
      <li class="page-click-tail" @click="forward"></li>
    </div>
  </section>
</template>

<script>
  import merge from 'webpack-merge'

  export default {
    props: {
      page: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        currentPage: this.$route.query.page || 1
      }
    },
    methods: {
      // 向前一页
      forward() {
        // 检测是否已在最后一页
        if (Number(this.currentPage) === Number(this.page.total_pages)) return false;

        this.handlePage(Number(this.currentPage) + 1);
      },
      // 向后一页
      backward() {
        // 检测是否在当前页码
        if (this.currentPage === 1) return false;

        this.handlePage(Number(this.currentPage) - 1);
      },
      /**
       * 处理页码
       * @param pageIndex 页码
       * @returns {boolean}
       */
      handlePage(pageIndex) {
        if (this.currentPage === pageIndex) return false;
        this.currentPage = pageIndex;

        let query = Object.assign({}, this.$route.query)
        query.page = pageIndex

        // 动态改变路由订单状态参数page
        this.$router.push({
          query: merge(this.$route.query, query)
        })

        this.$emit('on-change', pageIndex)
      }
    }
  }
</script>

<style scoped lang="scss">
  .page {
    margin: 32px 0;
    width: 100%;
    text-align: center;
    font-size: 18px;

    & .page-total {
      margin-right: 16px;
      color: #657180;
    }

    & .page-click {
      display: flex;
      align-items: center;
      justify-content: center;

      &-header, &-tail {
        cursor: pointer;
        display: inline-block;
        border-right: 1px solid #dcdee2;
        border-bottom: 1px solid #dcdee2;
        width: 16px;
        height: 16px;
        transform: rotate(-45deg);
        transition: border .2s ease-in-out, color .2s ease-in-out;

        &:hover {
          color: #2d8cf0;
          border-color: #2d8cf0;
        }
      }

      &-header {
        transform: rotate(135deg);
        margin-right: 16px;
      }

      &-tail {
        transform: rotate(-45deg);
      }

      &-item {
        display: inline-block;
        vertical-align: middle;
        width: 32px;
        height: 32px;
        line-height: 32px;
        margin-right: 16px;
        text-align: center;
        list-style: none;
        background-color: #fff;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        font-weight: 400;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        transition: border .2s ease-in-out, color .2s ease-in-out;

        &_active {
          color: #2d8cf0;
          border-color: #2d8cf0;
        }

        &:hover {
          color: #2d8cf0;
          border-color: #2d8cf0;
        }
      }
    }
  }
</style>
