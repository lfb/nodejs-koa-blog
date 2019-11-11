<template>
  <section class="comment-create">
<!--    <div class="comment-header">欢迎评论</div>-->
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="80">
      <FormItem label="昵称" prop="nickname">
        <Input v-model="formValidate.nickname" placeholder="请输入您的昵称"/>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="formValidate.email" placeholder="请输入您的邮箱（不会被公开）"/>
      </FormItem>
      <FormItem label="评论" prop="content">
        <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="请输入您的评论内容..."/>
      </FormItem>
      <FormItem>
        <Button @click="resetCommentInput('formValidate')">清空</Button>
        <Button type="primary" style="margin-left: 8px" @click="createComment('formValidate')">评论</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    props: {
      article_id: {
        type: Number,
        default() {
          return 0
        }
      },
      parent_id: {
        type: Number,
        default() {
          return 0
        }
      },
      replyNickname: {
        type: String,
        default() {
          return ''
        }
      },
      comment_id: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    data() {
      return {
        formValidate: {
          nickname: '',
          email: '',
          content: ''
        },
        ruleValidate: {
          nickname: [
            { required: true, message: '请输入您的昵称', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入您的邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入评论', trigger: 'blur' },
            { type: 'string', min: 2, message: '评论不能少于2个字', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      ...mapActions({
        createComments: 'comments/createComments',
        createReply: 'reply/createReply'
      }),
      createComment(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            console.log(this.formValidate)
            try {
              if (this.article_id) {
                this.formValidate.article_id = this.article_id
                this.formValidate.parent_id = this.parent_id
                const r = await this.createComments(this.formValidate)
                this.$emit('updateComments', r.data.data, 'comment')
              } else {
                this.formValidate.comment_id = this.comment_id
                this.formValidate.reply_username = this.replyNickname
                const r = await this.createReply(this.formValidate)
                this.$emit('updateComments', r.data.data, 'reply')
              }

              this.resetCommentInput('formValidate')
              this.$Message.success('评论成功！')
            } catch (e) {
              console.log(e)
            }
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      resetCommentInput(name) {
        this.$refs[name].resetFields()
      }
    }
  }
</script>

<style lang="less" scoped>
  .comment-header {
    font-size: 28px;
    font-weight: 500;
    color: #2d8cf0;
    padding: 32px 0;
  }
</style>
