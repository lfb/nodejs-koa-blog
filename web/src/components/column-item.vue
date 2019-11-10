<template>
  <section class="column-box">
    <div class="column-item">
      <div class="column-images">
        <img
          src="https://static001.infoq.cn/resource/image/c1/9f/c194d013ced0feb6d6dc73b6e1f2d39f.jpg?x-oss-process=image/crop,y_1,w_1780,h_916/resize,w_776,h_400"
          alt="articles">
      </div>
      <div class="column-info">
        <h1 class="column-title">今晚学习 Node.js 吗？</h1>
        <div class="column-desc">
          CMU 中国社区希望输出 CMU 在 AI 领域的影响力，关注 AI 领域的技术创新、产业应用，知识传播、创投趋势。
        </div>

        <div class="column-intro-btn">
          <ul class="column-intro">
            <li class="column-category">node.js</li>
            <li class="column-author">
              <Icon size="16" type="ios-person-outline"/>
              梁凤波
            </li>
          </ul>
          <Button v-if="isButton" type="primary" @click="toColumnChapter(1)">立即学习</Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Column',
    props: {
      isButton: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      toColumnChapter () {
        this.$router.push('/column/chapter?id=1')
      }
    }
  }
</script>

<style scoped lang="less">
  .column {
    background: #fff;
    margin-bottom: 32px;
    border-radius: 10px;
    overflow: hidden;
  }

  .column-item {
    padding: 32px;
    display: flex;
    box-shadow: 1px 2px 3px #f6f6f6;
  }

  .column-images {
    width: 320px;
    margin-right: 32px;

    & img {
      width: 100%;
      border-radius: 6px;
    }
  }

  .column-info {
    flex: 1;
  }

  .column-title {
    color: #17233d;
    font-size: 24px;
    font-weight: 500;
  }

  .column-desc {
    color: #808695;
    font-size: 18px;
    padding: 16px 0;
  }

  .column-intro-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .column-intro {
    display: flex;
    align-items: center;
  }

  .column-intro li {
    display: inline-block;
    margin-right: 32px;
    font-size: 16px;
    color: #9ea7b4;
    white-space: nowrap;
  }

  .column-intro .column-category {
    height: 28px;
    line-height: 28px;
    padding: 0 32px;
    font-size: 16px;
    color: #409EFF;
    border-radius: 64px;
    background: rgba(51, 119, 255, .1);
  }

</style>
