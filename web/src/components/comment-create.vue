<template>
  <section class="comment-create">
    <Form ref="params" :model="params" :rules="ruleValidate" label-position="left" :label-width="80">
      <FormItem label="昵称" prop="nickname">
        <Input v-model="params.nickname" placeholder="请输入您的昵称"/>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="params.email" placeholder="请输入您的邮箱（不会被公开）"/>
      </FormItem>
      <FormItem label="评论" prop="content">
        <Input v-model="params.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="请输入您的评论内容..."/>
      </FormItem>
      <FormItem>
        <Button @click="resetCommentInput('params')">清空</Button>
        <Button type="primary" style="margin-left: 8px" @click="submit('params')">
         {{comment_type === 'comment' ? '评论' : '回复'}}
        </Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    props: {
      target_id: {
        type: Number,
        default() {
          return 0
        }
      },
      target_type: {
        type: String,
        default() {
          return 'article'
        }
      },
      comment_type: {
        type: String,
        default() {
          return 'comment'
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
        params: {
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
        createComment: 'comment/createComment',
        createReply: 'reply/createReply'
      }),
      submit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            try {
              if (this.comment_type === 'comment') {
                this.params.target_id = this.target_id
                this.params.target_type = this.target_type
                const r = await this.createComment(this.params)
                this.$emit('updateComment', r.data.data, 'comment')
                this.$Message.success('评论成功！')
              } else if (this.comment_type === 'reply') {
                this.params.comment_id = this.comment_id
                const r = await this.createReply(this.params)
                this.$emit('updateComment', r.data.data, 'reply')
                this.$Message.success('回复成功！')
              }

              this.resetCommentInput('params')
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
