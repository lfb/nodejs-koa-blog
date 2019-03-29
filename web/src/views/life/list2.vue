<template>
  <section id="article">
    <section class="container">

      <section class="author">
        <h1 class="author-name">梁凤波</h1>
        <div class="introduction">
          <p><strong>Job: </strong>Web Frontend Engineer. </p>
          <p><strong>Interest: </strong>Coding, Reading, Domain.</p>
          <p><strong>Dream: </strong>拥有bo.com域名</p>
        </div>
        <div class="author-info">
          <p class="domain">
            <a target="_blank" href="https://github.com/liangfengbo">
              <strong>Github:</strong> liangfengbo
            </a>
          </p>
          <p class="email">
            <a href=mailto:itbo@163.com>
              <strong>Email:</strong> itbo@163.com
            </a>
          </p>
        </div>
        <div class="motto">
          <h1>热爱生命</h1>
          <br>

          <p>
            作者：
            <a target="_blank" href="https://baike.baidu.com/item/%E6%B1%AA%E5%9B%BD%E7%9C%9F/313083?fr=aladdin">汪国真</a>
          </p>
          <br>

          <p>我不去想是否能够成功</p>
          <p>既然选择了远方</p>
          <p>便只顾风雨兼程</p>
          <br>

          <p>我不去想能否赢得爱情</p>
          <p>既然钟情于玫瑰</p>
          <p> 就勇敢地吐露真诚</p>
          <br>

          <p>我不去想身后会不会袭来寒风冷雨</p>
          <p>既然目标是地平线</p>
          <p>留给世界的只能是背影</p>
          <br>

          <p> 我不去想未来是平坦还是泥泞</p>
          <p> 只要热爱生命</p>
          <p>一切，都在意料之中</p>
        </div>
      </section>

      <section class="content">

        <article class="article">
          <h1 class="article-type">
            <img src="../../assets/article.png" alt="articles">
            文章 Articles
          </h1>
          <ul class="article-box">
            <li class="article-item" v-for="item in 10" @click="toPathLink('/article/detail')">
              <div class="article-img">
                <img v-lazy="'https://img.mukewang.com/5ba591fd00015d5904040254.jpg'" alt="img">
              </div>
              <div class="article-content">
                <h1 class="article-title">Node.js实战-深入了理解中间件</h1>
                <div class="article-introduction">
                  什么是代理（Proxy）？ 代理（proxy）是一种可以拦截并且改变底层JavaScript引擎操作的包装器，通过它暴露内部运作的对象。
                </div>
                <div class="article-info">
                  <span class="article-category">JavaScript</span>
                  <span class="article-tag">深度学习</span>
                  <span class="article-browse">阅读：99次</span>
                  <span class="article-author">梁凤波</span>
                  <span class="article-timer">2019-03-20</span>
                </div>
              </div>
            </li>
          </ul>
        </article>

        <article class="books">
          <h1 class="books-type">
            <img src="../../assets/books.png" alt="books">
            系列 Books
          </h1>
          <ul class="books-box">
            <li class="books-item" v-for="item in 10" @click="toPathLink('/article/detail')">
              <div class="books-content">
                <h1 class="books-title">深入学习JavaScript原型系列</h1>
                <div class="books-introduction">
                  什么是代理（Proxy）？ 代理（proxy）是一种可以拦截并且改变底层JavaScript引擎操作的包装器，通过它暴露内部运作的对象。
                </div>
                <div class="books-info">
                  <span class="books-category">JavaScript</span>
                  <span class="books-tag">深度学习</span>
                  <span class="books-browse">阅读：99次</span>
                  <span class="books-author">梁凤波</span>
                  <span class="books-author">2019-03-20</span>
                </div>
              </div>

              <div class="books-img">
                <img v-lazy="'https://img.12.com/5c1b024d0001159b05120512.jpg'" alt="img">
              </div>
            </li>
          </ul>
        </article>
      </section>

      <article class="sidebar">
        <div class="recommend">
          <h1 class="recommend-title">
            站长推荐
            <img src="../../assets/recommend2.png" alt="recommend">
          </h1>
          <ul class="recommend-inner">
            <li class="recommend-item">
              <h1 v-for="item in 15">
                Node.js实战-深入了理解中间件
              </h1>
            </li>
          </ul>
        </div>
      </article>

    </section>
  </section>
</template>
<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {}
    },
    created() {
      this.openLoading();

      setTimeout(() => {
        this.closeLoading();
      }, 1000)
    },
    destroyed() {
    },
    methods: {
      ...mapActions({
        openLoading: 'loading/openLoading',
        closeLoading: 'loading/closeLoading'
      }),
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .container {
    display: flex;
    margin: 0 auto;
    padding: 16px;
    position: relative;
    background: #fff;

    & .author {
      box-sizing: border-box;
      flex: 1;
      animation: leftAnimation 0.66s 0.66s ease both;

      & .motto {
        padding: 16px 0;

        & h1 {
          font-size: 16px;
          color: #464c5b;
        }

        & p {
          font-size: 14px;
          color: #657180;
        }

        & a {
          color: #3399ff;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      & .author-name {
        margin: 0;
        font-size: 22px;
        color: #464c5b;
        padding-bottom: 16px;
        border-bottom: 1px solid #e8eaec;
      }

      & .introduction {
        margin: 16px 0 8px;
        font-size: 16px;
        color: #657180;
      }

      & .author-info {
        color: #657180;
        padding-bottom: 16px;
        border-bottom: 1px solid #e8eaec;

        & p {
          margin: 0;

          & a {
            color: #3399ff;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    @keyframes leftAnimation {
      0% {
        opacity: 0;
        filter: alpha(opacity=0);
        transform: translateX(-100%);

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
        transform: translateX(0);
      }
    }

    & .content {
      display: flex;
      max-width: 1280px;
      padding: 0 16px;
      margin: 0 auto;

      & .article {
        box-sizing: border-box;
        flex: 1;

        & .article-type {
          display: flex;
          align-items: center;
          font-size: 22px;
          color: #464c5b;
          padding-bottom: 16px;
          border-bottom: 1px solid #e8eaec;

          & img {
            margin-right: 8px;
          }
        }

        & .article-item {
          cursor: pointer;
          padding: 16px 0;
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
          width: 112px;
          margin-right: 16px;

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
          font-size: 20px;
          margin: 0;
          padding-bottom: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        & .article-introduction {
          font-size: 16px;
          color: #657180;
          padding-bottom: 10px;
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

      & .books {
        margin-left: 16px;
        box-sizing: border-box;
        flex: 1;

        & .books-type {
          display: flex;
          align-items: center;
          font-size: 22px;
          color: #464c5b;
          padding-bottom: 16px;
          border-bottom: 1px solid #e8eaec;

          & img {
            margin-right: 8px;
          }
        }

        & .books-item {
          cursor: pointer;
          padding: 16px 0;
          display: flex;
          border-bottom: 1px solid #e8eaec;
          animation: showArticleAnimation 0.66s ease both;
          @for $i from 1 to 11 {
            &:nth-child(#{$i}) {
              animation-delay: (0.2s * $i);
            }
          }

          &:hover .books-title {
            color: #3399ff;
            text-decoration: underline;
          }

          &:last-child {
            border-bottom: none;
          }
        }

        & .books-img {
          width: 112px;

          & img {
            width: 100%;
            border-radius: 5px;
          }
        }

        .books-content {
          flex: 1;
          margin-right: 16px;
        }

        & .books-title {
          color: #464c5b;
          font-size: 20px;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-bottom: 10px;
        }

        & .books-introduction {
          font-size: 16px;
          color: #657180;
          padding-bottom: 10px;
        }

        & .books-info {
          width: 100%;

          & span {
            display: inline-block;
            margin-right: 10px;
            font-size: 14px;
            color: #9ea7b4;
          }

          & span.books-category,
          & span.books-tag {
            background: #e8eaec;
            padding: 2px 10px;
            border-radius: 4px;
            background: rgba(51, 119, 255, .1);
          }
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


    & .sidebar {
      flex: 1;
      animation: rightAnimation 0.66s 0.66s ease both;

      & .recommend {
        border: 3px solid #5cadff;

        & .recommend-title {
          font-size: 22px;
          padding: 16px 0;
          color: #fff;
          background-color: #5cadff;
          display: flex;
          align-items: center;
          justify-content: center;

          & img {
            margin-right: 8px;
          }
        }

        & .recommend-inner {
          padding-left: 24px;
        }

        & .recommend-item {
          & h1 {
            cursor: pointer;
            padding: 0;
            margin: 10px 0;
            font-size: 16px;
            color: #657180;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &:hover {
              color: #3399ff;
              text-decoration: underline;
            }
          }
        }
      }
    }


    @keyframes rightAnimation {
      0% {
        opacity: 0;
        filter: alpha(opacity=0);
        transform: translateX(100%);
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
        transform: translateX(0);
      }
    }

  }
</style>
