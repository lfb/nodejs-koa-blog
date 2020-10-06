<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="广告标题" prop="title">
        <Input v-model="formValidate.title" placeholder="广告名称"></Input>
      </FormItem>
      <FormItem label="广告链接" prop="link">
        <Input v-model="formValidate.link" placeholder="广告链接"></Input>
      </FormItem>
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
  import {mapActions} from 'vuex';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        detail: null,
        formValidate: {
          title: '',
          link: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: '广告标题不能为空', trigger: 'blur'}
          ],
          link: [
            {required: true, message: '广告链接不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
    },
    methods: {
      ...mapActions({
        createAdvertise: 'advertise/createAdvertise'
      }),
      // 创建
      async create() {
        this.formValidate.id = this.id;

        try {
          await this.createAdvertise(this.formValidate);
          this.$Message.success('创建成功!');
          this.$router.push('/advertise');

        } catch (e) {

        }
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.create();

          } else {
            this.$Message.error('请完成表单!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
