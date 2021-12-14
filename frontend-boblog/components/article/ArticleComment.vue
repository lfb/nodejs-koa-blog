<template>
  <div>
    <div class="comment">
      <div class="comment-from">
        <div class="comment-avatar">
          <img src="https://cdn.boblog.com/avatar.png" alt="avatar" />
        </div>
        <div class="comment-textarea">
          <textarea
            ref="textarea"
            v-model="commentContent"
            class="comment-content"
            placeholder="发表评论…"
          />
          <div
            v-if="!isLoginStatus && !isAnonymousComment"
            class="comment-login"
            @click="isLogin = true"
          >
            <div class="comment-login-type">注册/登录 发表评论</div>
            <button class="comment-login-btn">注册/登录</button>
          </div>
        </div>
      </div>
      <div v-if="isLoginStatus || isAnonymousComment" class="comment-submit">
        <button class="comment-submit-btn" @click="submitComment">提交</button>
      </div>
    </div>

    <div v-if="count > 0" class="comment-container">
      <div class="comment-count">全部评论（{{ count }}）</div>
      <ul
        v-if="Array.isArray(commentList) && commentList.length"
        class="comment-list"
      >
        <li
          v-for="(item, index) in commentList"
          :key="item.id"
          class="comment-item"
        >
          <div class="comment-item-avatar">
            <img src="https://cdn.boblog.com/avatar.png" alt="avatar" />
          </div>
          <div class="comment-item-detail">
            <div class="comment-item-user">
              {{ (item.user_info && item.user_info.username) || '匿名评论' }}
            </div>
            <div class="comment-item-intro">
              <span class="comment-item-created">
                {{ item.created_at }}
              </span>
              <span
                v-show="!item.is_show_reply"
                class="comment-item-reply-user"
                @click="showReply(item, index)"
              >
                回复
              </span>
            </div>
            <div class="comment-item-content">
              {{ item.content }}
            </div>
            <div v-if="item.reply_list" class="comment-item-reply-content">
              <p
                v-for="replyItem in item.reply_list"
                :key="replyItem.id"
                class="comment-item-reply-content-list"
              >
                {{
                  (replyItem.user_info && replyItem.user_info.username) ||
                  '匿名回复'
                }}：
                {{ replyItem.content }}
              </p>
            </div>
            <div v-if="item.is_show_reply" class="comment-item-reply">
              <textarea
                v-model="item.reply_content"
                class="comment-item-reply-textarea"
                placeholder="发表回复…"
              />
              <button
                class="comment-item-reply-btn"
                @click="submitReply(item, index)"
              >
                回复
              </button>
            </div>
          </div>
        </li>
      </ul>

      <div v-if="isLoad" class="comment-more" @click="loadMore">
        点击加载更多
      </div>
    </div>

    <el-dialog
      :visible.sync="isLogin"
      width="880px"
      top="0"
      :lock-scroll="true"
      :before-close="handleClose"
    >
      <LoginForm @on-success="loginFormSuccess" />
    </el-dialog>
  </div>
</template>

<script>
import LoginForm from '@/components/common/LoginForm'
import { mapState } from 'vuex'
import { getCommentTarget, createComment } from '@/request/api/comment'
import { isArray } from '@/lib/utils'
import { createReply } from '@/request/api/reply'

export default {
  name: 'ArticleComment',
  components: {
    LoginForm,
  },
  props: {
    reply: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      page: 1,
      count: 0,
      commentContent: '',
      commentList: [],
      isLoad: true,
      isLogin: false,
      isAnonymous: false,
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLoginStatus: (state) => state.user.isLoginStatus,
    }),
    isAnonymousComment() {
      return !this.isLoginStatus && this.isAnonymous
    },
    userId() {
      return (this.userInfo && this.userInfo.id) || 0
    },
    commentEmail() {
      return (this.userInfo && this.userInfo.email) || ''
    },
  },
  mounted() {
    this.getComment()
  },
  methods: {
    handleClose() {
      this.isLogin = false
    },
    // 提交回复
    async submitReply(reply, index) {
      if (!reply.reply_content) {
        this.$message.warning('请填写回复内容!')
        return false
      }

      const [err] = await createReply({
        article_id: this.$route.query.id,
        user_id: this.userId,
        email: this.commentEmail,
        comment_id: this.commentId,
        content: reply.reply_content,
      })
      if (!err) {
        this.onSuccess()
        this.$message.success('回复成功，审核通过后展示！')
        this.commentList[index].reply_content = ''
        this.commentList[index].is_show_reply = false
      }
    },
    showReply(item, index) {
      this.commentId = item.id
      this.commentList.forEach((v, rIndex) => {
        v.is_show_reply = rIndex === index
      })
    },
    // 提交评论
    async submitComment() {
      if (!this.commentContent) {
        this.$message.warning('请填写评论内容!')
        return false
      }
      const [err] = await createComment({
        user_id: this.userId,
        article_id: this.$route.query.id,
        email: this.commentEmail,
        content: this.commentContent,
      })

      if (!err) {
        this.onSuccess()
        this.$message.success('评论成功，审核通过后展示！')
      }
    },
    // 评论|回复成功
    onSuccess() {
      this.commentEmail = ''
      this.commentContent = ''
    },
    loginFormSuccess() {
      this.isLogin = false
      this.checkAnonymous()
    },
    checkAnonymous() {
      this.isAnonymous = !!sessionStorage.getItem('isAnonymous')
    },
    // 获取评论数据
    async getComment() {
      const [err, res] = await getCommentTarget({
        article_id: this.$route.query.id,
        is_replay: 1,
        is_user: 1,
        status: 1,
        page: this.page,
      })
      if (!err) {
        const meta = res.data.data.meta
        const data = res.data.data.data

        if (isArray(data) && meta) {
          data.forEach((item) => {
            item.is_show_reply = false
            item.reply_content = ''
          })
          this.commentList.push(...data)

          this.count = meta.count
          this.isLoad = meta.total_pages > this.page
        }
      }
    },
    // 加载更多
    loadMore() {
      this.page++
      this.getComment()
    },
  },
}
</script>

<style scoped lang="scss">
.comment {
  box-sizing: border-box;
  padding: 80px 0 120px;
  width: 100%;
  margin: 0 auto;

  &-list {
    margin: 0;
    padding: 0;
  }

  .comment-from {
    display: flex;
    width: 100%;
  }

  &-avatar {
    width: 40px;
    margin-right: 16px;
    & img {
      width: 100%;
    }
  }

  &-textarea {
    position: relative;
    flex: 1;
  }

  &-login {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &-type {
      font-size: 18px;
      font-weight: 500;
      color: #222222;
    }

    &-btn {
      cursor: pointer;
      resize: none;
      outline: none;
      border: none;
      width: 120px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 400;
      color: #fff;
      line-height: 22px;
      margin-top: 16px;
      background: #222222;
    }
  }
  &-content {
    resize: none;
    outline: none;
    box-sizing: border-box;
    padding: 16px;
    font-size: 14px;
    color: #222;
    width: 100%;
    height: 130px;
    background: #fff;
    border: 1px solid #ccc;
    transition: 0.2s all ease-in;

    &:focus {
      box-shadow: 2px 4px 24px 0 rgba(0, 0, 0, 0.06);
    }

    &::placeholder {
      color: #ccc;
    }
  }

  &-submit {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;

    &-btn {
      cursor: pointer;
      border: none;
      outline: none;
      width: 120px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      background: #222222;
    }
  }
}
.comment-count {
  padding-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  color: #222222;
  border-bottom: 1px solid #e8e8e8;
}

.comment-item {
  box-sizing: border-box;
  padding: 32px 0;
  display: flex;
  border-bottom: 1px solid #e8e8e8;

  &-avatar {
    width: 40px;
    margin-right: 14px;
    & img {
      width: 100%;
    }
  }

  &-detail {
    flex: 1;
  }

  &-user {
    height: 22px;
    font-size: 16px;
    font-weight: 400;
    color: #222222;
  }
  &-intro {
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    line-height: 20px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-reply-user {
    cursor: pointer;
  }
  &-reply-content {
    padding: 14px 16px;
    margin-top: 16px;
    line-height: 22px;
    font-size: 16px;
    font-weight: 400;
    color: #222222;
    background: #f7f7f7;
    &-list {
      margin-bottom: 8px;
    }
  }
  &-reply {
    margin-top: 16px;
    position: relative;
    width: 100%;

    &-textarea {
      resize: none;
      outline: none;
      width: 100%;
      min-height: 130px;
      font-size: 14px;
      box-sizing: border-box;
      padding: 16px;
      background: #ffffff;
      border: 1px solid #222;

      &::placeholder {
        color: #ccc;
      }
    }

    &-btn {
      cursor: pointer;
      outline: none;
      border: none;
      position: absolute;
      right: 16px;
      bottom: 16px;
      width: 100px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      background: #222;
    }
  }

  &-content {
    font-size: 16px;
    font-weight: 400;
    color: #222;
    line-height: 22px;
  }
}

.comment-more {
  cursor: pointer;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-top: 56px;
  font-weight: 600;
  color: #666666;
  background: #f8f8f8;
}

/deep/ .el-dialog__header {
  padding: 0;
}
/deep/ .el-dialog__body {
  padding: 0;
}
/deep/ .el-dialog {
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
