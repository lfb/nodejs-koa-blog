<template>
  <Form ref="categoryData" :model="categoryData" :rules="ruleValidate" :label-width="80">
    <FormItem label="分类名称" prop="name">
      <Input v-model="categoryData.name" placeholder="category name"></Input>
    </FormItem>
    <FormItem>
      <Button @click="handleReset('categoryData')">重置</Button>
      <Button type="primary" style="margin-left: 8px" @click="handleSubmit('categoryData')">更新</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState({
        categoryList: state => state.category.categoryList
      })
    },
    data() {
      return {
        id: this.$route.params.id,
        categoryData: {},
        ruleValidate: {
          name: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.getCategory();
    },
    methods: {
      ...mapActions({
        getCategoryDetail: 'category/getCategoryDetail',
        updateCategory: 'category/updateCategory'
      }),

      /**
       * 获取分类信息
       */
      async getCategory() {
        try {
          this.categoryData = await this.getCategoryDetail(this.id);
          this.$Message.success('获取分类详情成功');

        } catch (e) {
          this.$Message.success('获取分类详情失败');
        }
      },

      // 提交
      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            try {
              await this.updateCategory(this.categoryData);
              this.$Message.success('更新分类成功');
              window.location.href = "/category/list";

            } catch (e) {
              this.$Message.error('更新分类失败')
            }
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
