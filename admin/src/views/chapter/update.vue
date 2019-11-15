<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="章节名称" prop="title">
        <Input v-model="formValidate.title" placeholder="章节名称"></Input>
      </FormItem>
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">更新</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
  import {mapActions} from 'vuex';

  export default {
    props: {
      title: {
        type: String,
        default() {
          return ''
        }
      },
      chapter_id: {
        type: Number,
        default() {
          return -1
        }
      }
    },
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
    watch: {
      title() {
        this.formValidate.title = this.title
      }
    },
    methods: {
      ...mapActions({
        updateChapter: 'chapter/update'
      }),
      // 创建
      async update() {
        try {
          this.formValidate.id = this.chapter_id;
          this.formValidate.column_id = this.column_id
          await this.updateChapter(this.formValidate);
          this.$Message.success('更新成功!');
          this.$emit('showUpdateChapter')

        } catch (e) {

        }
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.update();

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
