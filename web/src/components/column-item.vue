<template>
  <section class="column-box" v-if="list.length > 0">
    <div class="column-item" v-for="(item, index) in list" :key="index">
      <div class="column-images">
        <img v-lazy="item.cover + '?imageView2/1/w/320/h/180'" alt="column">
      </div>
      <div class="column-info">
        <h1 class="column-title">{{item.title}}</h1>
        <div class="column-desc">
          {{item.description}}
        </div>

        <div class="column-intro-btn">
          <ul class="column-intro">
            <li class="column-author">
              <Icon size="16" type="ios-person-outline"/>
              {{item.author}}
            </li>
          </ul>
          <Button v-if="isButton" type="primary" @click="toColumnChapter(item.id)">立即学习</Button>
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
      },
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      toColumnChapter(id) {
        this.$router.push(`/column/chapter?id=${id}`)
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
    font-size: 26px;
    font-weight: 500;
  }

  .column-desc {
    color: #808695;
    font-size: 18px;
    padding: 16px 0;
  }

  .column-intro-btn {
    width: 100%;
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
    font-size: 16px;
    color: #9ea7b4;
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .column-intro {
      display: none;
    }
  }
</style>
