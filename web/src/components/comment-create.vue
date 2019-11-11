<template>
  <section class="comment-create">
    <div class="comment-header">欢迎评论</div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="80">
      <FormItem label="昵称" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入您的昵称" />
      </FormItem>
      <FormItem label="邮箱" prop="mail">
        <Input v-model="formValidate.mail" placeholder="请输入您的邮箱（不会被公开）" />
      </FormItem>
      <FormItem label="评论" prop="desc">
        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="请输入您的评论内容..." />
      </FormItem>
      <FormItem>
        <Button @click="handleReset('formValidate')" >清空</Button>
        <Button type="primary" style="margin-left: 8px" @click="handleSubmit('formValidate')">评论</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        formValidate: {
          name: '',
          mail: '',
          desc: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '请输入您的昵称', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: '请输入您的邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入评论', trigger: 'blur' },
            { type: 'string', min: 2, message: '评论不能少于2个字', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!')
          } else {
            this.$Message.error('Fail!')
          }
        })
      },
      handleReset (name) {
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
