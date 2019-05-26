<template>
  <div class="comments">

    <section class="article-comments">
      <h1 v-if="userInfo" class="comments-title">
        您好，{{userInfo.nickname}}，欢迎您的评论：
      </h1>
      <h1 v-else class="comments-title">欢迎评论</h1>
      <article class="comments-inner">
        <div class="comments-content">
          <textarea name="comments" v-model="content" id="comments" cols="30" rows="10" placeholder="评论内容.."></textarea>
        </div>
        <button class="submit-comments" @click="createArticleComments">提交评论</button>
      </article>
    </section>


    <h1 class="comments-title">评论列表</h1>
    <ul class="comments-box" v-if="list">
      <li v-for="(item, index) in list"
          class="comments-item"
          :key="index">
        <h3 class="comments-item-username">
          {{item.User.nickname}}：
        </h3>
        <p class="comments-item-content"> {{item.content}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {mapState, mapActions} from 'vuex'

  export default {
    props: ['id'],
    data() {
      return {
        list: [],
        content: ''
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    created() {
      if (this.id) {
        this.getComments();
      }
    },
    methods: {
      ...mapActions({
        getCommentsList: 'comments/getCommentsList',
        createComments: 'comments/createComments'
      }),
      /**
       * 获取评论列表
       * @returns 评论列表
       */
      async getComments() {
        const res = await this.getCommentsList(this.id);
        this.list = res.data.data;
      },
      // 创建评论
      async createArticleComments() {
        if (!this.userInfo) {
          this.$store.commit('user/SHOW_USER_MANAGER_MODEL', true);

        } else if (!this.content) {
          this.$message({
            message: '请输入内容',
            type: 'error'
          });

        } else {
          let token = Vue.ls.get('BOBLOG_FE_TOKEN');
          await this.createComments({
            user_id: this.userInfo.id,
            content: this.content,
            article_id: this.id,
            username: token
          })

          this.$message({
            message: '评论成功',
            type: 'success'
          });
          this.content = '';

          this.getComments();

        }

      }
    }
  }
</script>

<style scoped lang="scss">
  .comments {
    background: #fff;

    & .comments-item {
      cursor: pointer;
      line-height: 42px;
      font-size: 16px;
      color: #657180;
      transition: left 1s ease-in;
      display: flex;

      &:hover {
        color: #2d8cf0;
      }
    }
  }

  .comments-title {
    padding: 16px 0;
    color: #2d8cf0;
    font-size: 32px;
    font-weight: 400;
  }

  .comments-item-username {
    font-size: 20px;
    color: #464c5b;
  }

  .comments-item-content {
    font-size: 18px;
    color: #666;
  }

  .article-comments {
    margin: 32px 0;

    .comments-inner {
      width: 100%;
    }

    & .comments-content {
      margin-right: 24px;

      & textarea {
        width: 100%;
        font-size: 18px;
        padding: 5px 10px;
        border-radius: 4px;
        border: 1px solid #dcdee2;
      }
    }

    & .submit-comments {
      cursor: pointer;
      padding: 10px 20px;
      border: none;
      color: #fff;
      border-radius: 4px;
      margin-top: 16px;
      font-size: 18px;
      background-image: linear-gradient(to right, #5cadff 0, #2d8cf0 100%);
      background-repeat: repeat-x;

      &:hover {
        background-image: linear-gradient(to right, #2d8cf0 0, #2b85e4 100%);
        background-repeat: repeat-x;
      }
    }
  }

</style>
