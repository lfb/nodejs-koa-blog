<template>
<div>
  <div v-if="!isLoginStatus" class="comment-content">
    <input
      v-model="email"
      maxlength="1000"
      class="comment-input"
      placeholder="请输入联系邮箱"
    />
  </div>
  <div class="comment-textarea">
    <textarea
      v-model="content"
      maxlength="1000"
      class="comment-input"
      placeholder="请输入内容，支持 Markdown 语法.."
      cols="30"
      rows="10"
    />

    <div class="comment-action">
      <button
        :disabled="!content"
        :class="['preview-comment', { opacity: !content }]"
        @click="onShowPreviewContent(content)"
      >
        预览
      </button>
      <button
        :disabled="!content"
        :class="['submit-comment', { opacity: !content }]"
        @click="submit"
      >
        提交
      </button>
    </div>
  </div>
</div>
</template>

<script>
import {mapState} from "vuex";

import { validEmail } from '@/lib/utils'
import { createReply } from '@/request/api/reply'
import { createComment } from '@/request/api/comment'

export default {
  name: "From",
  props: {
    fromType: {
      type: String,
      default: () => 'comment'
    },
    reply: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      email: '',
      content: ''
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLoginStatus: (state) => state.user.isLoginStatus,
    }),
    userId() {
      return (this.userInfo && this.userInfo.id) || 0
    }
  },
  methods: {
    // 预览评论|回复内容
    onShowPreviewContent(content) {
      if (!content) {
        this.$message.warning('请输入内容!')
        return false
      }
      this.$emit('on-preview', content)
    },
    // 提交
    // fromType：comment-评论，reply-回复
    submit() {
     if (!this.checkoutFrom()){
       return false
     }

     if(this.fromType === 'comment'){
       this.submitComment()
     }

     if(this.fromType === 'reply') {
       this.submitReply()
     }
    },
    // 检测邮箱和密码是否正确
    checkoutFrom() {
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

      if (!this.content) {
        const msg = `请输入${this.fromType === 'comment' ? '评论' : '回复'}内容！`
        this.$message.warning(msg)
        return false
      }

      return true
    },
    // 提交评论
    async submitComment() {
      const [err] = await createComment({
        user_id: this.userId,
        article_id: this.$route.query.id,
        email: this.email,
        content: this.content,
      })

      if (!err) {
        this.onSuccess()
        this.$message.success('评论成功，审核通过后展示！')
      }
    },
    // 提交回复
    async submitReply() {
      const [err] = await createReply({
        article_id: this.$route.query.id,
        user_id: this.userId,
        email: this.email,
        content: this.content,
        ...this.reply
      })
      if (!err) {
        this.onSuccess()
        this.$message.success('回复成功，审核通过后展示！')
      }
    },
    // 评论|回复成功
    onSuccess() {
      this.email = ''
      this.content = ''
      this.$emit('on-success')
    }
  }
}
</script>

<style scoped lang="scss">
.comment-content {
  display: block;
  margin-bottom: 12px;
}

.comment-input {
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
.comment-textarea {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
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

.comment-action {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
