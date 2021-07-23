<template>
    <div>
      <el-drawer
        size="420px"
        :with-header="false"
        :visible.sync="showComment"
        direction="rtl">

        <div class="comment">
          <div class="comment-header">
            评论：
          </div>
          <div class="comment-textarea">
            <textarea
              v-model="comment"
              maxlength="1000"
              class="comment-content"
              placeholder="请输入内容，支持 Markdown 语法.."
              cols="30"
              rows="10" />

            <div class="comment-action">
              <button class="preview-comment" @click="onPreComment">预览</button>
              <button class="submit-comment" @click="submitComment">提交</button>
            </div>
          </div>


          <div v-if="commentList" class="comment-list">
            <ul class="comment-box">
              <li
                v-for="item in commentList.data"
                :key="item.id"
                class="comment-item"
              >
                {{ item.user_info || '匿名评论' }}：
                <div v-html="mdRender(item.content)"></div>
                （{{ item.created_at }}）

<!--                <div class="comment">-->
<!--                  <el-button type="primary" icon="el-icon-view" @click="onPreReply"-->
<!--                  >预览回复</el-button-->
<!--                  >-->
<!--                  <el-input-->
<!--                    v-model="reply"-->
<!--                    type="textarea"-->
<!--                    :rows="2"-->
<!--                    placeholder="请输入内容"-->
<!--                  >-->
<!--                  </el-input>-->
<!--                  <el-button type="primary" @click="submitReply(item.id)"-->
<!--                  >回复</el-button-->
<!--                  >-->
<!--                </div>-->
              </li>
            </ul>
          </div>

        </div>

        <el-drawer
          size="320px"
          :with-header="false"
          :append-to-body="true"
          :visible.sync="showCommentInner">


          <div class="comment">
            <div class="comment-header">
              预览：
            </div>
            <div>

              <div v-html="preCommentContent"></div>
            </div>
          </div>

        </el-drawer>
      </el-drawer>

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
      showComment: false,
      showCommentInner: false,
      reply: '',
      preReplyContent: '',
      comment: '',
      commentList: [],
      preCommentContent: '',
      showDialogVisible: false
    }
  },
  mounted() {
    this.getComment()
  },
  methods: {
    async submitComment() {
      if(!this.comment) {
        this.$message.warning('请输入评论内容!')
        return false;
      }
      const [err, data] = await createComment({
        user_id: 0,
        article_id: this.id,
        content: this.comment,
      })
      if (!err) {
        console.log('data', data)
        this.comment = ''
        this.$message.success('评论成功，审核通过后展示！')
      }
    },
    onPreComment() {
      if(!this.comment) {
        this.$message.warning('请输入评论内容!')
        return false;
      }

      this.preCommentContent = this.mdRender(this.comment)
      this.showCommentInner = !this.showCommentInner
    },
    onShowComment() {
      this.showComment = !this.showComment
    },
    mdRender(content) {
      return content ? this.$md && this.$md.render(content) : content
    },
    async getComment() {
      const [err, res] = await getCommentTarget({
        article_id: this.id,
        is_replay: 1,
        is_user: 1,
      })
      if (!err) {
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
        this.reply = ''
        this.$message.success('回复成功，审核通过后展示！')
      }
    },
    onPreReply() {
      this.preReplyContent = this.mdRender(this.reply)
    },
  }
}
</script>

<style scoped lang="scss">
ul, li {
  padding: 0;
  margin: 0;
}
.comment {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;

  &-header{
    padding-bottom: 20px;
    font-size: 20px;
    color: #404040;
    font-weight: 600;
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

/deep/ .el-dialog__header {
  display: none;
  height: 0;
}
/deep/ .el-dialog__body {
  padding: 20px;
}
</style>
