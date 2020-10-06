<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="分类名称" prop="name">
        <Input v-model="formValidate.name" placeholder="分类名称"></Input>
      </FormItem>
      <FormItem label="分类关键字" prop="key">
        <Input v-model="formValidate.key" placeholder="分类关键字"></Input>
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
          name: '',
          key: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '分类名称不能为空', trigger: 'blur'}
          ],
          key: [
            {required: true, message: '分类关键字不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this._getCategory()
    },
    methods: {
      ...mapActions({
        getCategory: 'category/getCategory',
        updateCategory: 'category/updateCategory'
      }),
      async _getCategory() {
        try {
          const res = await this.getCategory({
            id: this.id
          });
          const category = res.data.data;
          this.formValidate.name = category.name;
          this.formValidate.key = category.key;

        } catch (e) {

        }
      },
      // 更新
      async _updateCategory() {
        this.formValidate.id = this.id;

        try {
          await this.updateCategory(this.formValidate);
          this.$Message.success('更新成功!');
          this.$router.push('/category');

        } catch (e) {

        }
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._updateCategory();

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
