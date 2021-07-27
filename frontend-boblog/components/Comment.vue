<template>
  <div>
    <el-drawer
      size="38.2%"
      :with-header="false"
      :visible.sync="showComment"
      direction="rtl"
    >
      <div class="comment">
        <div class="comment-header">
          <span v-if="userInfo"> {{ userInfo.username }}， </span>
          欢迎您的评论
        </div>
        <div v-if="!isLoginStatus" class="login-tips">
          当前是匿名评论，登录后让代码改变世界！
          <span class="sign-in" @click="onShowLoginInner(true)">登录/注册</span>
        </div>

        <From @on-preview="onShowPreviewContent"></From>
        <CommentList ref="commentList" @on-preview="onShowPreviewContent"/>

      </div>

      <el-drawer
        size="32%"
        :with-header="false"
        :append-to-body="true"
        :visible.sync="showPreviewContent"
      >
        <div class="comment">
          <div class="comment-header">预览：</div>
          <div v-html="previewContent"></div>
        </div>
      </el-drawer>

      <el-drawer
        size="32%"
        :with-header="false"
        :append-to-body="true"
        :visible.sync="showLoginInner"
      >
        <Login @on-success="onShowLoginInner"></Login>
      </el-drawer>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getToken } from '@/lib/auth'
import Login from "./Login";
import From from "./From";
import CommentList from "./CommentList";

export default {
  name: 'Comment',
  components: {
    From,
    Login,
    CommentList
  },
  data() {
    return {
      showComment: false,
      previewContent: '',
      showPreviewContent: false,
      showLoginInner: false,
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLoginStatus: (state) => state.user.isLoginStatus,
    }),
  },
  methods: {
    // 弹框登录
    onShowLoginInner(isShow) {
      this.showLoginInner = isShow
    },
    // 预览内容
    onShowPreviewContent(content) {
      if (!content) {
        this.$message.warning('请输入内容!')
        return false
      }

      this.previewContent = this.mdRender(content)
      this.showPreviewContent = !this.showPreviewContent
    },
    // 展开侧边栏，获取数据-用户数据，评论列表数据
    async onShowComment() {
      this.showComment = true

      if (!this.isLoginStatus && getToken()) {
        await this.$store.dispatch('user/userInfo')
      }

      if (!this.isLoad) {
        this.isLoad = true
        this.$nextTick(() => {
          this.$refs.commentList && this.$refs.commentList.getComment()
        })
      }
    },
    // 渲染markdown内容
    mdRender(content) {
      return content ? this.$md && this.$md.render(content) : content
    },
  },
}
</script>

<style scoped lang="scss">
ul,
li,
p {
  padding: 0;
  margin: 0;
}
.comment {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;

  &-header {
    padding-bottom: 10px;
    font-size: 20px;
    color: #404040;
    font-weight: 600;
  }

  .login-tips {
    font-size: 14px;
    color: #404040;
    padding-bottom: 20px;

    span {
      cursor: pointer;
      color: #2d8cf0;
      text-decoration: underline;
    }
  }
}
</style>
