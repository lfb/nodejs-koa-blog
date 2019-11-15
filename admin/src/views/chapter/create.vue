<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="章节名称" prop="title">
        <Input v-model="formValidate.title" placeholder="章节名称"></Input>
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
        column_id: this.$route.params.column_id,
        detail: null,
        formValidate: {
          title: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: '章节不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions({
        createChapter: 'chapter/create'
      }),
      // 创建
      async create() {
        this.formValidate.id = this.id;

        try {
          this.formValidate.column_id = this.column_id
          await this.createChapter(this.formValidate);
          this.$Message.success('创建成功!');
          this.$emit('showCreateChapter')

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
