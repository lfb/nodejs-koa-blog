<template>
  <section class="author">
    <article class="author-box">
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
    </article>
    <article class="motto">
      <h1>热爱生命</h1>

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
    </article>
  </section>
</template>

<script>

</script>

<style scoped lang="scss">
  .author {
    box-sizing: border-box;
    max-width: 1264px;
    margin: 32px auto;
    display: flex;
    padding: 0 32px;

    & .author-box {
      margin-right: 32px;

      & .author-name {
        margin: 0;
        font-size: 22px;
        color: #464c5b;
        padding-bottom: 16px;
      }

      & .introduction {
        margin: 16px 0 8px;
        font-size: 16px;
        color: #657180;
        line-height: 32px;
      }

      & .author-info {
        color: #657180;
        padding-bottom: 16px;

        & p {
          margin: 0;
          line-height: 32px;

          & a {
            color: #3399ff;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    & .motto {
      flex: 1;
      color: #464c5b;

      & h1 {
        font-size: 22px;
        color: #464c5b;
        padding-bottom: 16px;
      }

      & p {
        font-size: 18px;
        line-height: 32px;
        color: #657180;
        animation: showArticleAnimation 0.66s ease both;
        @for $i from 1 to 20 {
          &:nth-child(#{$i}) {
            animation-delay: (0.2s * $i);
          }
        }
      }

      & a {
        color: #3399ff;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
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
</style>
