<template>
  <section class="comments">
    <section class="comments-create">
      <h1 class="comments-title">欢迎评论</h1>
      <div class="comments-input-item">
        <el-input
          size="small"
          placeholder="请输入昵称"
          v-model="params.nickname"
          clearable>
        </el-input>
      </div>
      <div class="comments-input-item">
        <el-input
          size="small"
          placeholder="请输入邮箱"
          v-model="params.email"
          clearable>
        </el-input>
      </div>
      <div class="comments-input-item">
        <el-input
          size="small"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8}"
          v-model="params.content"
          placeholder="请输入评论内容">
        </el-input>

      </div>

      <div class="comments-input-item">
        <el-button type="primary" @click.native="createArticleComments">提交评论</el-button>
      </div>
    </section>

    <section class="comments-list">
      <h1 class="comments-title">评论列表</h1>
      <ul class="comments-box" v-if="commentsList">
        <li v-for="(item, index) in commentsList.data"
            class="comments-item"
            :key="index">
          <h3 class="comments-item-username">
            {{item.nickname}}：
          </h3>
          <p class="comments-item-content"> {{item.content}}</p>
          <p class="comments-item-content"> ，{{item.created_at}}</p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
  import Vue from 'vue'
  import {mapState, mapActions} from 'vuex'

  export default {
    props: ['id', 'commentsList'],
    data() {
      return {
        list: [],
        params: {
          nickname: '',
          email: '',
          content: ''
        }
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    created() {

    },
    methods: {
      ...mapActions({
        getCommentsList: 'comments/getCommentsList',
        createComments: 'comments/createComments'
      }),

      // 创建评论
      async createArticleComments() {
        let {content, nickname, email} = this.params;

        if (!content || !nickname || !email) {
          this.$message({
            message: '请输完成表单',
            type: 'error'
          });

          return false;
        }

        await this.createComments({
          email,
          nickname,
          content,
          article_id: this.id,
        });

        this.$message({
          message: '评论成功',
          type: 'success'
        });

        this.params.content = '';
        this.params.nickname = '';
        this.params.email = '';
        this.$emit('updateComments')
      }
    }
  }
</script>

<style scoped lang="scss">
  .comments-title {
    padding: 16px 0;
    color: #2d8cf0;
    font-size: 32px;
  }

  .comments-create {
    width: 50%;

    .comments-input-item {
      margin-bottom: 16px;
    }
  }

  .comments-list {
    .comments-item {
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
</style>
