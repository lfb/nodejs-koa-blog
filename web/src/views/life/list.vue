<template>
  <section id="article">
    <section class="container">

      <section class="category" id="category">
        <ul class="category-box">
          <li v-for="(cate, index) in category"
              @click="changCategory(index)"
              :class="categoryActiveIndex === index ? 'category-item category-item-active' : 'category-item'"
              :key="index">
            {{cate.title}} <span v-if="cate.children" class="category-more-icon"></span>
            <div class="category-children" v-if="cate.children">
              <p class="category-children-item" v-for="(child, index2) in cate.children" :key="index2">
                {{child.title}}
              </p>
            </div>
          </li>
        </ul>
      </section>

      <article class="article">
        <ul class="article-box">
          <li class="article-item" v-for="(item, index) in 10" @click="toPathLink('/article/detail')">

            <div class="article-content">
              <h1 class="article-title">人生追求什么？</h1>
              <div class="article-introduction">
                什么是代理（Proxy）？ 代理（proxy）是一种可以拦截并且改变底层JavaScript引擎操作的包装器，通过它暴露内部运作的对象。
              </div>
              <div class="article-info">
                <span class="article-category">JavaScript</span>
                <span class="article-tag">深度学习</span>
                <span class="article-browse">阅读：99次</span>
                <span class="article-author">梁凤波</span>
                <span class="article-author">2019-03-20</span>
              </div>
            </div>

            <div class="article-img">
              <img v-if="index % 2 === 0" v-lazy="'https://img.mukewang.com/5ba591fd00015d5904040254.jpg'" alt="img">
              <img v-else v-lazy="'https://img.mukewang.com/5c1b024d0001159b05120512.jpg'" alt="img">
            </div>
          </li>
        </ul>
      </article>

    </section>
  </section>
</template>
<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        category: [
          {
            title: '理想', key: 'frontend', children: [
              {title: '平淡', key: 'html'},
              {title: '富有', key: 'es6'}
            ]
          },
          {
            title: '现实', key: 'java', children: [
              {title: '选择', key: 'html'},
              {title: '将就', key: 'es6'}
            ]
          }
        ],
        categoryActiveIndex: 0
      }
    },
    created() {
      // this.openLoading();
      //
      // setTimeout(() => {
      //   this.closeLoading();
      // }, 1000)
    }
    ,
    destroyed() {
    }
    ,
    methods: {
      ...
        mapActions({
          openLoading: 'loading/openLoading',
          closeLoading: 'loading/closeLoading'
        }),
      // 改变分类索引
      changCategory(index) {
        this.categoryActiveIndex = index;
      }
      ,
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .container {
    box-sizing: content-box;
    padding: 0 32px;
    max-width: 1264px;
    margin: 0 auto;

    & .category {
      border-bottom: 1px solid #dcdee2;

      & .category-box {
        display: flex;

        & .category-item {
          position: relative;
          cursor: pointer;
          height: 80px;
          padding-right: 52px;
          line-height: 80px;
          color: #464c5b;
          font-size: 18px;
          display: flex;
          align-items: center;
          border-radius: 64px;

          &:hover .category-children {
            display: block;
          }

          &:hover {
            color: #2d8cf0;
          }

          &:hover .category-more-icon {
            color: #2d8cf0;
            border-color: #2d8cf0;
            margin-top: 5px;
            animation: categoryArrow 0.2s ease both;
          }


          & .category-more-icon {
            display: inline-block;
            border-right: 1px solid #808695;
            border-bottom: 1px solid #808695;
            width: 10px;
            height: 10px;
            margin-top: -5px;
            margin-left: 8px;
            transform: rotate(45deg);
          }

          & .category-children {
            animation: showCategoryAnimation 0.2s ease both;
            overflow: hidden;
            color: #464c5b;
            display: none;
            position: absolute;
            left: -16px;
            top: 64px;
            line-height: 56px;
            width: 180px;
            border: 1px solid #dcdee2;
            border-radius: 6px;
            z-index: 8888;
            padding: 16px 0;
            background: #fff;

            & p {
              cursor: pointer;
              padding: 0 16px;

              &:hover {
                color: #2d8cf0;
                background: #f8f8f9;
              }

            }
          }
        }

        & .category-item-active {
          color: #2d8cf0;
        }
      }
    }


    & .article {
      box-sizing: border-box;
      flex: 1;

      & .article-item {
        cursor: pointer;
        padding: 32px 0;
        display: flex;
        border-bottom: 1px solid #e8eaec;
        animation: showArticleAnimation 0.66s ease both;
        @for $i from 1 to 11 {
          &:nth-child(#{$i}) {
            animation-delay: (0.2s * $i);
          }
        }

        &:hover .article-title {
          color: #3399ff;
          text-decoration: underline;
        }


        &:last-child {
          border-bottom: none;
        }
      }

      & .article-img {
        width: 150px;
        margin-left: 32px;

        & img {
          width: 100%;
          border-radius: 5px;
        }
      }

      .article-content {
        flex: 1;
      }

      & .article-title {
        color: #464c5b;
        font-size: 24px;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      & .article-introduction {
        font-size: 16px;
        color: #657180;
        padding: 16px 0;
      }

      & .article-info {
        width: 100%;

        & span {
          display: inline-block;
          margin-right: 10px;
          font-size: 14px;
          color: #9ea7b4;
        }

        & span.article-category,
        & span.article-tag {
          background: #e8eaec;
          padding: 2px 10px;
          border-radius: 4px;
          background: rgba(51, 119, 255, .1);
        }
      }
    }

    @keyframes showArticleAnimation {
      0% {
        opacity: 0;
        filter: alpha(opacity=0);
        transform: scale(0, 0);
      }
      25% {
        opacity: 0.25;
        filter: alpha(opacity=25);
      }
      50% {
        opacity: 0.5;
        filter: alpha(opacity=50);
      }
      75% {
        opacity: 0.75;
        filter: alpha(opacity=75);
      }

      100% {
        opacity: 1;
        filter: alpha(opacity=100);
        transform: scale(1, 1);
      }
    }

    @keyframes showCategoryAnimation {
      0% {
        opacity: 0;
        height: 0;
        filter: alpha(opacity=0);
      }
      25% {
        opacity: 0.25;
        filter: alpha(opacity=25);
      }
      50% {
        opacity: 0.5;
        filter: alpha(opacity=50);
      }
      75% {
        opacity: 0.75;
        filter: alpha(opacity=75);
      }

      100% {
        opacity: 1;
        height: auto;
        filter: alpha(opacity=100);
      }
    }

    @keyframes categoryArrow {
      0% {
        transform: rotate(45deg);
      }

      100% {
        transform: rotate(-135deg);
      }
    }
  }
</style>
