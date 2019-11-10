<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="80">
      <FormItem label="姓名" prop="name">
        <Input v-model="formValidate.name" placeholder="Enter your name" />
      </FormItem>
      <FormItem label="邮箱" prop="mail">
        <Input v-model="formValidate.mail" placeholder="Enter your e-mail" />
      </FormItem>
      <FormItem label="评论" prop="desc">
        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="Enter something..." />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
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
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
            { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
            { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
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
