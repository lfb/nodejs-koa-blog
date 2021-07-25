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
          <span class="sign-in" @click="showLoginInner = true">登录</span>
        </div>

        <div v-if="!isLoginStatus" class="email-input">
          <input
            v-model="email"
            maxlength="1000"
            class="comment-content"
            placeholder="请输入联系邮箱"
          />
        </div>
        <div class="comment-textarea">
          <textarea
            v-model="comment"
            maxlength="1000"
            class="comment-content"
            placeholder="请输入内容，支持 Markdown 语法.."
            cols="30"
            rows="10"
          />

          <div class="comment-action">
            <button
              :disabled="!comment"
              :class="['preview-comment', { opacity: !comment }]"
              @click="onPreComment(comment)"
            >
              预览
            </button>
            <button
              :disabled="!comment"
              :class="['submit-comment', { opacity: !comment }]"
              @click="submitComment"
            >
              提交
            </button>
          </div>
        </div>

        <div v-if="commentList" class="comment-list">
          <ul class="comment-box">
            <li
              v-for="(item, index) in commentList.data"
              :key="item.id"
              class="comment-item"
            >
              <div class="comment-info">
                <div class="comment-info-avatar">
                  <el-avatar
                    size="medium"
                    icon="el-icon-user-solid"
                  ></el-avatar>
                </div>
                <div>
                  <p class="comment-info-user">
                    {{
                      (item.user_info && item.user_info.username) || '匿名评论'
                    }}
                  </p>
                  <p class="comment-info-timer">{{ item.created_at }}</p>
                </div>
              </div>
              <div
                class="comment-item-content"
                v-html="mdRender(item.content)"
              ></div>

              <ul v-if="item.reply_list" class="reply-list">
                <li
                  v-for="reply in item.reply_list"
                  :key="reply.id"
                  class="reply-item"
                >
                  <div class="comment-info">
                    <div class="comment-info-avatar">
                      <el-avatar
                        size="small"
                        icon="el-icon-user-solid"
                      ></el-avatar>
                    </div>
                    <div>
                      <p class="comment-info-user">
                        {{
                          (reply.user_info && reply.user_info.username) ||
                          '匿名回复'
                        }}
                      </p>
                      <p class="comment-info-timer">{{ reply.created_at }}</p>
                    </div>
                  </div>
                  <div
                    class="comment-item-content"
                    v-html="mdRender(reply.content)"
                  ></div>
                </li>
              </ul>

              <div class="reply-create">
                <div @click="showReply(index)">
                  <i v-if="!item.is_show_reply" class="el-icon-chat-dot-round">
                    回复</i
                  >
                </div>
                <div v-if="item.is_show_reply">
                  <div v-if="!isLoginStatus" class="email-input">
                    <input
                      v-model="email"
                      maxlength="1000"
                      class="comment-content"
                      placeholder="请输入联系邮箱"
                    />
                  </div>
                  <div class="comment-textarea">
                    <textarea
                      v-model="item.reply_content"
                      maxlength="1000"
                      class="comment-content"
                      placeholder="请输入回复内容，支持 Markdown 语法.."
                      cols="30"
                      rows="10"
                    />

                    <div class="comment-action">
                      <button
                        :disabled="!item.reply_content"
                        :class="[
                          'preview-comment',
                          { opacity: !item.reply_content },
                        ]"
                        @click="onPreComment(item.reply_content)"
                      >
                        预览
                      </button>
                      <button
                        :disabled="!item.reply_content"
                        :class="[
                          'submit-comment',
                          { opacity: !item.reply_content },
                        ]"
                        @click="submitReply(item)"
                      >
                        回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="pagination">
          <el-pagination
            background
            :current-page.sync="page"
            layout="total, prev, pager, next"
            :total="count"
            @current-change="handleCurrentChange"
          />
        </div>

      </div>

      <el-drawer
        size="32%"
        :with-header="false"
        :append-to-body="true"
        :visible.sync="showCommentInner"
      >
        <div class="comment">
          <div class="comment-header">预览：</div>
          <div>
            <div v-html="preContent"></div>
          </div>
        </div>
      </el-drawer>

      <el-drawer
        size="32%"
        :with-header="false"
        :append-to-body="true"
        :visible.sync="showLoginInner"
      >
        <div class="comment">
          <div class="login-logo"></div>
          <h2 class="login-header">
            {{ isLogin ? '登录' : '注册' }}
          </h2>

          <div v-if="!isLogin" class="email-input">
            <input
              v-model="user.username"
              maxlength="32"
              class="comment-content"
              placeholder="请输入你的昵称"
            />
          </div>
          <div class="email-input">
            <input
              v-model="user.email"
              maxlength="32"
              class="comment-content"
              placeholder="请输入联系邮箱"
            />
          </div>

          <div class="email-input">
            <input
              v-model="user.password"
              maxlength="16"
              type="password"
              class="comment-content"
              placeholder="请输入密码"
            />
          </div>
          <div class="register-tips" @click="isLogin = !isLogin">
            {{ isLogin ? '未有账号？点击注册！' : '已有账号？点击登录！' }}
          </div>
          <div class="login-btn">
            <button
              :disabled="!user.email || !user.password"
              class="login-btn-submit"
              @click="onLogin(comment)"
            >
              {{ isLogin ? '登录' : '注册' }}
            </button>
            <button class="login-btn-default" @click="showLoginInner = false">
              匿名评论
            </button>
          </div>
        </div>
      </el-drawer>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getToken } from '@/lib/auth'
import { validEmail } from '@/lib/utils'
import { createReply } from '@/request/api/reply'
import { getCommentTarget, createComment } from '@/request/api/comment'

export default {
  name: 'Comment',
  props: {
    id: {
      type: [String, Number],
      default: () => -1,
    },
  },
  data() {
    return {
      page: 1,
      count: 0,
      isLogin: true,
      user: {
        username: '',
        email: '',
        password: '',
      },
      email: '',
      showComment: false,
      showCommentInner: false,
      showLoginInner: false,
      comment: '',
      commentList: null,
      preContent: '',
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLoginStatus: (state) => state.user.isLoginStatus,
    }),
    userId() {
      return (this.userInfo && this.userInfo.id) || 0
    },
  },
  methods: {
    // 点击数字
    async handleCurrentChange(page) {
      const drawerBody = document.querySelector('.el-drawer__body')
      const commentList = document.querySelector('.comment-list')
      const toTop = commentList.getBoundingClientRect().top + drawerBody.scrollTop
      this.page = page
      await this.getComment()
      this.$nextTick(() => {
        this.scrollTopTo(drawerBody, toTop, 0.3)
      })
    },
    // 简单滚动动画
    scrollTopTo(scroller, to, duration) {
      let count = 0
      const from = scroller.scrollTop
      const frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16)
      function animate() {
        scroller.scrollTop += (to - from) / frames
        if (++count < frames) {
          window.requestAnimationFrame(animate)
        }
      }
      animate()
    },
    async getUserInfo() {
      const [err, data] = await this.$store.dispatch('user/userInfo')
      if (!err) {
        console.log(data)
      }
    },
    async submitComment() {
      if (!this.isLoginStatus) {
        if (!this.email) {
          this.$message.warning('请输入邮箱!')
          return false
        }

        if (this.email && !validEmail(this.email)) {
          this.$message.warning('请输入正确的邮箱!')
          return false
        }
      }

      if (!this.comment) {
        this.$message.warning('请输入评论内容!')
        return false
      }

      const [err, data] = await createComment({
        user_id: this.userId,
        article_id: this.id,
        email: this.email,
        content: this.comment,
      })
      if (!err) {
        console.log('data', data)
        this.comment = ''
        this.email = ''
        this.$message.success('评论成功，审核通过后展示！')
        this.showComment = false
      }
    },
    onPreComment(content) {
      if (!content) {
        this.$message.warning('请输入内容!')
        return false
      }

      this.preContent = this.mdRender(content)
      this.showCommentInner = !this.showCommentInner
    },
    onShowComment() {
      this.showComment = true

      if (!this.isLoginStatus && getToken()) {
        this.getUserInfo()
      }

      if (!this.isLoad) {
        this.getComment()
      }
    },
    mdRender(content) {
      return content ? this.$md && this.$md.render(content) : content
    },
    async getComment() {
      const [err, res] = await getCommentTarget({
        article_id: this.id,
        is_replay: 1,
        is_user: 1,
        page: this.page
      })
      if (!err) {
        this.isLoad = true
        res.data.data.data.forEach((item) => {
          item.is_show_reply = false
          item.reply_content = ''
          item.email = ''
        })

        this.commentList = res.data.data
        this.count = res.data.data.meta.count
      }
    },
    showReply(index = -1) {
      this.commentList.data.forEach((item, itemIndex) => {
        item.is_show_reply = itemIndex === index
        item.reply_content = ''
        item.email = ''
      })
    },
    async onLogin() {
      const user = this.user
      if (this.isLogin) {
        const [err, data] = await this.$store.dispatch('user/userLogin', user)
        if (!err) {
          console.log(data)
          this.showLoginInner = false
          this.user.username = ''
          this.user.email = ''
          this.$message.success('登录成功')
        }
      } else {
        const registerParams = {
          username: user.username,
          email: user.email,
          password1: user.password,
          password2: user.password,
        }
        const [err, data] = await this.$store.dispatch(
          'user/userRegister',
          registerParams
        )
        if (!err) {
          console.log(data)
          this.showLoginInner = false
          this.user.username = ''
          this.user.email = ''
          this.$message.success('注册成功')
        }
      }
    },
    async submitReply(item) {
      // eslint-disable-next-line camelcase
      const { id, reply_content, email, user_id = 0 } = item

      if (!this.isLoginStatus) {
        if (!email) {
          this.$message.warning('请输入邮箱!')
          return false
        }

        if (this.email && !validEmail(email)) {
          this.$message.warning('请输入正确的邮箱!')
          return false
        }
      }

      // eslint-disable-next-line camelcase
      if (!reply_content) {
        this.$message.warning('请输入内容!')
        return false
      }

      const [err, data] = await createReply({
        article_id: this.id,
        user_id: this.userId,
        reply_user_id: user_id,
        comment_id: id,
        content: reply_content,
        email,
      })
      if (!err) {
        console.log('data', data)
        this.showReply()
        this.$message.success('回复成功，审核通过后展示！')
        this.showComment = false
      }
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

  .email-input {
    display: block;
    margin-bottom: 12px;
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

  &-content {
    resize: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 14px;
    font-size: 14px;
    color: #404040;
    border: 1px solid #f0f0f0;
    transition: 0.2s all ease-in;

    &:focus {
      box-shadow: rgba(0, 0, 0, 0.12) 0 2px 8px;
    }
  }
}

.comment-action {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.submit-comment {
  cursor: pointer;
  width: 84px;
  height: 32px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin: 16px 0;
  border: none;
  outline: none;
  border-radius: 32px;
  background: #2d8cf0;
}

.preview-comment {
  cursor: pointer;
  width: 84px;
  height: 32px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 16px 8px 16px 0;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 32px;
  background: #fff;
}
.comment-textarea {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.comment-box {
  .comment-item {
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .comment-info {
    display: flex;
    align-items: center;
  }
  .comment-info-avatar {
    margin-right: 12px;
  }
  .comment-info-user,
  .comment-info-timer {
    padding: 0;
    margin: 0;
  }
  .comment-info-user {
    color: #292929;
    font-size: 14px;
  }
  .comment-info-timer {
    color: #757575;
    font-size: 12px;
  }

  .comment-item-content {
    font-size: 14px;
  }

  .reply-list {
    box-sizing: border-box;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-left: 20px;
    background: #f0f0f0;
  }
  .reply-create {
    cursor: pointer;
    font-size: 14px;

    &:hover {
      color: #2d8cf0;
    }
  }
}

.opacity {
  opacity: 0.5;
}

.login-header {
  display: none;
  text-align: center;
}
.login-logo {
  position: relative;
  box-sizing: border-box;
  width: 150px;
  height: 98px;
  margin: 0 auto;
  background: url(https://cdn.boblog.com/boblog.png) -16px center no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  text-align: center;
}
.register-tips {
  cursor: pointer;
  font-size: 12px;
  color: #999;

  &:hover {
    color: #2d8cf0;
    text-decoration: underline;
  }
}
.login-btn {
  margin: 32px 0;
  &-submit {
    cursor: pointer;
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    border: none;
    outline: none;
    border-radius: 32px;
    background: #2d8cf0;
    margin-bottom: 16px;
  }
  &-default {
    cursor: pointer;
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: #2d8cf0;
    text-align: center;
    border: 1px solid #2d8cf0;
    outline: none;
    border-radius: 32px;
    background: #fff;
  }
}

.pagination {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  width: 100%;
}

/deep/ .el-dialog__header {
  display: none;
  height: 0;
}

/deep/ .el-dialog__body {
  padding: 20px;
}
</style>
