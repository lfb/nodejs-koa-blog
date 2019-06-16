<template>
  <div class="link">
    <h1 class="link-title">
      <i class="icon el-icon-connection"></i> 链接
    </h1>
    <ul class="link-box">
      <li class="link-item" v-for="(item, index) in linkList" :key="index">
        <a :href="item.href" target="_blank">{{item.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        linkList: [
          {name: 'Github', href: 'https://github.com/liangfengbo'},
          {name: '慕课网', href: 'https://www.imooc.com/u/3957223'},
          {name: '掘金', href: 'https://juejin.im/user/58c2981d8ac2470720f75bb9'},
          {name: 'Coding.net', href: 'https://dev.tencent.com/u/liangfengbo'}
        ]
      }
    },
    computed: {
      ...mapState({})
    },
    created() {
    },
    methods: {
      ...mapActions({}),
      // 路由跳转
      toPath(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped lang="scss">
  .link {
    padding: 0 24px;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 24px;

    & .link-title {
      display: flex;
      align-items: center;
      color: #464c5b;
      font-size: 24px;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    & .link-box {
      padding: 16px 0;

    }

    & .icon {
      margin-right: 8px;
    }

    & .link-item a {
      display: block;
      cursor: pointer;
      margin-bottom: 16px;
      font-size: 16px;
      color: #657180;
      text-decoration: none;
      transition: left 1s ease-in;

      &:hover {
        color: #409EFF;
      }
    }
  }
</style>

