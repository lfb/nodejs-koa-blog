<template>
    <div v-if="commentList">
      <div class="comment">
        <el-button type="primary" icon="el-icon-view" @click="onPreComment"
        >预览评论</el-button
        >

        <div>请输入内容，支持Markdown语法</div>
        <el-input
          v-model="comment"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
        >
        </el-input>
        <el-button type="primary" @click="submitComment">提交</el-button>
      </div>

      <div class="comment" v-html="preCommentContent"></div>

      <div class="comment-list">
        <ul class="comment-box">
          <li
            v-for="item in commentList.data"
            :key="item.id"
            class="comment-item"
          >
            {{ item.user_info || '匿名哥哥' }}：
            <div v-html="mdRender(item.content)"></div>
            （{{ item.created_at }}）

            <div class="comment">
              <el-button type="primary" icon="el-icon-view" @click="onPreReply"
              >预览回复</el-button
              >

              <div>请输入内容，支持Markdown语法</div>
              <el-input
                v-model="reply"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              >
              </el-input>
              <el-button type="primary" @click="submitReply(item.id)"
              >回复</el-button
              >
              <div v-html="preReplyContent"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>

import { createReply } from '@/request/api/reply'
import { getCommentTarget, createComment } from '@/request/api/comment'
export default {
  name: "Comment",
  props: {
    id: {
      type: [String, Number],
      default: () => -1
    }
  },
  data() {
    return{
      reply: '',
      preReplyContent: '',
      comment: '',
      commentList: [],
      preCommentContent: '',
    }
  },
  mounted() {
    this.getComment()
  },
  methods: {
    async submitComment() {
      const [err, data] = await createComment({
        user_id: 0,
        article_id: this.id,
        content: this.comment,
      })
      if (!err) {
        console.log('data', data)
        this.content = ''
        this.$message.success('评论成功，审核通过后展示！')
      }
    },
    async getComment() {
      const [err, res] = await getCommentTarget({
        article_id: this.id,
        is_replay: 1,
        is_user: 1,
      })
      if (!err) {
        console.log('res.data.data', res.data.data)
        this.commentList = res.data.data
      }
    },
    async submitReply(commentId) {
      const [err, data] = await createReply({
        article_id: this.id,
        user_id: 0,
        reply_user_id: 0,
        comment_id: commentId,
        content: this.reply,
      })
      if (!err) {
        console.log('data', data)
        this.content = ''
        this.$message.success('回复成功，审核通过后展示！')
      }
    },
    onPreReply() {
      this.preReplyContent = this.mdRender(this.reply)
    },
    onPreComment() {
      this.preCommentContent = this.mdRender(this.comment)
    },
    mdRender(content) {
      return content ? this.$md && this.$md.render(content) : content
    },
  }
}
</script>

<style scoped>

</style>
