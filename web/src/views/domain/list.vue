<template>
  <section class="domain-wrap">
    <article class="domain-inner">
      <ul class="domain-list">
        <li class="domain-item" v-for="(item, index) in domainList">
          <h1>{{item.domain}}</h1>
          <h2>{{item.chinese}}</h2>
        </li>
        <li class="domain-item">
          <h2>...</h2>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
  export default {
    name: "list",
    data() {
      return {
        domainList: [
          {domain: 'yibowanbo.com', chinese: '一波万波'},
          {domain: 'yqjq.com', chinese: '猿球崛起'},
          {domain: 'funnydata.com', chinese: '有趣数据'},
          {domain: 'boblog.com', chinese: '波博客'},
          {domain: 'liangfengbo.com', chinese: '梁凤波'},
          {domain: 'xinglinhe.com', chinese: '杏林和'},
          {domain: 'liyumi.com', chinese: '鲤鱼米'},
          {domain: 'jiandanbo.com', chinese: '简单波'},
          {domain: 'leetcoding.com', chinese: '代码'},
          {domain: 'code.net.cn', chinese: '代码'},
          {domain: 'scode.net', chinese: '代码'},
          {domain: 'bobobo.org', chinese: '波波'},
          {domain: 'bobobo.com.cn', chinese: '波波'},
          {domain: 'zhengjiayi.cn', chinese: '郑嘉怡'},
          {domain: 'chuncaomeng.com', chinese: '春草梦'},
          {domain: 'lidehui.com', chinese: '李德辉'},
          {domain: 'lidehui.com', chinese: '李德辉'},
          {domain: 'hehuyisheng.com', chinese: '呵护一生'}
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .domain-wrap {
    width: 100%;
  }

  .domain-inner {
    margin: 32px auto;
    max-width: 1264px;
    padding: 0 32px;
  }

  .domain-list {
    display: flex;
    flex-wrap: wrap;
  }

  .domain-item {
    padding: 16px 0;
    font-weight: 400;
    line-height: 32px;
    cursor: pointer;
    display: inline-block;
    width: 25%;
    text-align: center;
    transition: 0.2s ease-out;
    border: 2px solid #dcdee2;
    box-sizing: border-box;
    margin-left: -2px;
    margin-top: -2px;
    background: #fff;

    & h1 {
      font-size: 18px;
    }

    & h2 {
      font-weight: 400;
      font-size: 18px;
    }

    &:nth-child(4n+1) {
      margin-left: 0;
    }

    &:hover {
      z-index: 10;
      color: #fff;
      border-color: #2d8cf0;
      background: #2f8cf0;
    }

    & img {
      width: 100%;
      border-radius: 8px;
    }
  }
</style>
