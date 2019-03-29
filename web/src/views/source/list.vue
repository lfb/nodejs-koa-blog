<template>
  <section class="source-wrap">

    <div class="source-inner">
      <ul class="source-list">
        <li class="source-item" v-for="item in 10">
          <div class="source-item-img">
            <img src="../../assets/share.png" alt="share">
          </div>
        </li>
      </ul>
    </div>

  </section>
</template>

<script>
  export default {
    name: "list"
  }
</script>

<style scoped lang="scss">
  .source-inner {
    max-width: 1264px;
    margin: 0 auto;
  }

  .source-list {
    width: 100%;
  }

  .source-item {
    cursor: pointer;
    display: inline-block;
    width: 400px;
    margin-right: 32px;
    margin-top: 32px;
    background: #fff;
    transition: 0.2s ease-out;
    animation: showArticleAnimation 0.66s ease both;
    @for $i from 1 to 20 {
      &:nth-child(#{$i}) {
        animation-delay: (0.2s * $i);
      }
    }

    &:nth-child(3n) {
      margin-right: 0;
    }

    &:hover {
      box-shadow: 8px 8px 8px #e8eaec;
      transform: translateY(-32px);
    }

    & img {
      width: 100%;
      border-radius: 8px;
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
