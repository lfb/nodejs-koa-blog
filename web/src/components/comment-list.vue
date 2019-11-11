<template>
  <section class="comment">
    <div class="comment-header">评论列表</div>
    <ul class="comment-box">
      <li class="comment-item" v-for="(item, index) in 5" :key="index">
        <div class="comment-avatar">
          <Avatar size="small" style="background-color: #2d8cf0" icon="ios-person"/>
        </div>
        <div class="comment-info">
          <h1 class="comment-username">梁凤波</h1>
          <p class="comment-content">
            买买买~
          </p>
          <div class="comment-reply">
            <ul class="comment-box">
              <li class="comment-item" v-for="(item, index) in 2" :key="index">
                <div class="comment-avatar">
                  <Avatar size="small" style="background-color: #2d8cf0" icon="ios-person"/>
                </div>
                <div class="comment-info">
                  <h1 class="comment-username">回复 梁凤波</h1>
                  <p class="comment-content">
                    买买买~
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <p class="comment-reply-btn">回复</p>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
  export default {}
</script>
<style scoped lang="less">
  .comment-header {
    font-size: 28px;
    font-weight: 500;
    color: #2d8cf0;
    padding: 32px 0 16px;
  }

  .comment-item {
    margin: 16px 0;
    display: flex;
  }

  .comment-avatar {
    margin-right: 16px;
  }

  .comment-username {
    color: #17233d;
    font-size: 18px;
    font-weight: 500;
  }

  .comment-info {
    flex: 1;
  }

  .comment-content {
    color: #515a6e;
    line-height: 36px;
    font-size: 16px;
  }

  .comment-reply {
    padding: 12px 24px;
    margin: 24px 0;
    border-radius: 6px;
    background: #f8f8f8;
  }

  .comment-reply-btn {
    color: #2d8cf0;
    font-size: 16px;
    cursor: pointer;
  }

  .time {
    font-size: 14px;
    font-weight: bold;
  }

  .content {
    padding-left: 5px;
  }
</style>
