<template>
  <Form ref="category" :model="category" :rules="ruleValidate">
    <FormItem label="分类名称" prop="name">
      <Input v-model="category.name" placeholder="category name"></Input>
    </FormItem>
    <FormItem label="分类icon图标" prop="name">
      <upload-images @completeUpload="completeUpload"/>
      <div v-if="upload">
        <img :src="upload.url" alt="img">
      </div>
    </FormItem>
    <FormItem label="父级分类" prop="category">
      <Select
        v-if="categoryList.length > 0"
        v-model="category.parent_id"
        placeholder="Select category"
        style="position:relative;z-index: 9999">
        <Option
          v-for="(cate, key) in categoryList"
          :key="key"
          :value="cate.id">
          {{cate.name}}
        </Option>
      </Select>
    </FormItem>
    <FormItem label="层级" prop="name">
      <Input v-model="category.z_index" placeholder="层级"></Input>
    </FormItem>
    <FormItem>
      <Button @click="handleReset('category')">重置</Button>
      <Button type="primary" style="margin-left: 8px" @click="handleSubmit('category')">创建</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import UploadImages from '../../components/UploadImages'

  export default {
    components: {
      UploadImages
    },
    computed: {
      ...mapState({
        categoryList: state => state.category.categoryList
      })
    },
    data() {
      return {
        upload: {},
        category: {
          name: '',
          icon: '',
          parent_id: 0,
          z_index: 10
        },
        ruleValidate: {
          name: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.getCategoryList();
    },
    methods: {
      ...mapActions({
        createCategory: 'category/createCategory',
        getCategoryList: 'category/getCategoryList'
      }),

      // 上传图片成功回调
      completeUpload(data) {
        this.upload = data;
        this.category.icon = data.url;
      },

      // 提交
      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            try {
              await this.createCategory(this.category);
              this.$Message.success('创建分类成功');
              // window.location.href = "/category/list";
              this.handleReset('category');

            } catch (e) {
              this.$Message.error(e)

            }
          } else {
            this.$Message.error('Empty Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
