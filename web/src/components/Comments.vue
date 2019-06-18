<template>
  <section>
    <section class="comments-create">
      <h1 class="comments-title">欢迎评论</h1>

      <el-form :model="ruleForm" status-icon :rules="rules" label-position="left" ref="ruleForm" label-width="50px"
               class="demo-ruleForm">
        <el-form-item label="昵称" prop="nickname">
          <el-input type="text" placeholder="请输入您的昵称" v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" placeholder="请输入您的邮箱（不会被公开）" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!--          <el-input type="textarea" placeholder="评论内容.." rows="4" v-model="ruleForm.content"-->
          <!--                    autocomplete="off"></el-input>-->
          <mavon-editor
            class="mavon-editor--box"
            v-model="ruleForm.content"
            :autofocus="false"
            placeholder="请输入评论内容"
            :ishljs="true">
          </mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交评论</el-button>
        </el-form-item>
      </el-form>
    </section>

    <section class="comments-list" v-if="commentsList && commentsList.data.length > 0">
      <h1 class="comments-title">评论列表</h1>
      <ul class="comments-box">
        <li v-for="(item, index) in commentsList.data"
            class="comments-item"
            :key="index">
          <div class="comments-item-username">
            <i class="icon el-icon-chat-dot-round"></i> 来自「{{item.nickname}}」的评论：
          </div>
          <div class="comments-item-content">
            <mavon-editor
              style="min-height: 0;width: 100%"
              :ishljs="true"
              v-model="item.content"
              :defaultOpen="'preview'"
              :editable="false"
              :subfield="false"
              :toolbarsFlag="false">
            </mavon-editor>
          </div>
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
          callback(new Error('请输入评论内容'));
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
    color: #409EFF;
    font-size: 36px;
  }

  .comments-create {
    width: 100%;

    .comments-input-item {
      margin-bottom: 16px;
    }
  }

  .comments-list {
    width: 100%;
    box-sizing: border-box;

    .comments-item {
      padding: 24px 0;
      border-bottom: 1px solid #f0f0f0;

    }

    .comments-item-username {
      font-size: 22px;
      color: #409EFF;
      font-weight: bold;
    }

    .comments-item-content {
      box-sizing: border-box;
      padding: 24px 24px 0 24px;
      font-size: 16px;
    }
  }

  .page {
    padding: 32px 0;
    text-align: center;
  }

  @media screen and (min-width: 200px) and (max-width: 768px) {
    .comments-create {
      width: 100%;
    }
  }

</style>

<style lang="scss">
  .comments-item-content {
    width: 100%;
    box-sizing: border-box;

    & .v-note-wrapper .v-note-panel {
      box-shadow: none !important;
    }

    & .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
      background: #fff !important;
    }

    & .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper {
      padding: 0 !important;
    }

    & .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
      padding: 0 !important;
    }

    .markdown-body blockquote, .markdown-body dl, .markdown-body ol, .markdown-body p, .markdown-body pre, .markdown-body table, .markdown-body ul {
      margin-bottom: 0 !important;
    }

    .markdown-body {
      font-size: 18px !important;
    }
  }
</style>
