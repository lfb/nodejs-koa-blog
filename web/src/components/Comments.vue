<template>
  <section class="comments">
    <section class="comments-create">
      <h1 class="comments-title">欢迎评论</h1>

      <el-form :model="ruleForm" status-icon :rules="rules" label-position="left" ref="ruleForm" label-width="50px"
               class="demo-ruleForm">
        <el-form-item label="昵称" prop="nickname">
          <el-input type="text" placeholder="请输入您的昵称" v-model="ruleForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" placeholder="请输入您的邮箱（不会被公开）" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="text" placeholder="请输入内容.." v-model="ruleForm.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交评论</el-button>
        </el-form-item>
      </el-form>
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
      <section class="page" v-if="commentsList && commentsList.meta">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="commentsList.meta.count"
          :current-page="commentsList.meta.current_page"
          @current-change="changePage"
          :total="commentsList.meta.total">
        </el-pagination>
      </section>
    </section>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    props: ['id', 'commentsList'],
    data() {
      var validateEmail = (rule, value, callback) => {
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

        if (value === '') {
          callback(new Error('请输入邮箱'));

        } else if (!reg.test(value)) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      };
      var validateNickname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        } else {
          callback();
        }
      };
      var validateContent = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          nickname: '',
          email: '',
          content: ''
        },
        rules: {
          nickname: [
            {validator: validateNickname, trigger: 'blur'}
          ],
          email: [
            {validator: validateEmail, trigger: 'blur'}
          ],
          content: [
            {validator: validateContent, trigger: 'blur'}
          ],
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
        createComments: 'comments/createComments'
      }),

      /**
       * 切换页码
       * @page 页码
       */
      async changePage(page) {
        this.$emit('changeCommentsPage', page);
      },

      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 显示信息
      showMessage(message, type = 'success') {
        this.$message({
          message,
          type
        });
      },

      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await this.createArticleComments();

          } else {
            this.showMessage('请完善表单', 'error');
            return false;
          }
        });
      },

      // 创建评论
      async createArticleComments() {
        let {content, nickname, email} = this.ruleForm;

        const res = await this.createComments({
          email,
          nickname,
          content,
          article_id: this.id,
        });

        this.$message({
          message: '评论成功',
          type: 'success'
        });

        this.resetForm('ruleForm');
        const newComments = res.data.data;
        this.$emit('updateComments', newComments);
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

  .page {
    padding: 32px 0;
  }
</style>
