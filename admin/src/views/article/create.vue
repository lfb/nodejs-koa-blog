<template>
  <Form ref="article" :model="article" :rules="ruleValidate" :label-width="80">
    <FormItem label="文章标题" prop="title">
      <Input v-model="article.title" placeholder="title"></Input>
    </FormItem>
    <FormItem label="文章作者" prop="author">
      <Input v-model="article.author" placeholder="author"></Input>
    </FormItem>
    <FormItem label="文章分类" prop="category">
      <Select
        v-if="categoryList.length > 0"
        v-model="article.categoryId"
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
    <FormItem label="文章标签" prop="introduce">
      <Input v-model="article.tag" placeholder="tag"></Input>
    </FormItem>
    <FormItem label="文章图片" prop="banner">
      <upload-images @completeUpload="completeUpload"/>
      <div v-if="upload">
        <img :src="upload.url" alt="img">
      </div>
    </FormItem>
    <FormItem label="文章简介" prop="introduce">
      <Input v-model="article.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
             placeholder="introduce"></Input>
    </FormItem>

    <FormItem label="文章内容" prop="content" v-if="uploadTokenData">
      <mavon-editer-upload :data="article.content" @handleEditor="handleEditor"/>
    </FormItem>
    <FormItem>
      <Button @click="handleReset('article')">重置</Button>
      <Button type="primary" style="margin-left: 8px" @click="handleSubmit('article')">创建</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import UploadImages from '../../components/UploadImages'
  import mavonEditerUpload from '../../components/mavonEditerUpload'

  export default {
    components: {
      UploadImages,
      mavonEditerUpload
    },
    computed: {
      ...mapState({
        categoryList: state => state.category.categoryList,
        uploadTokenData: state => state.uploadToken.uploadTokenData
      })
    },
    data() {
      return {
        upload: null,
        article: {
          title: '',
          author: '梁凤波',
          categoryId: '',
          tag: '',
          cover: '',
          introduction: '',
          content: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          author: [
            {required: true, message: 'Author cannot be empty', trigger: 'blur'}
          ],
          categoryId: [
            {required: true, message: 'Please select the category', trigger: 'change'}
          ],
          tag: [
            {required: true, message: 'Please select the category', trigger: 'change'}
          ],
          cover: [
            {required: true, message: 'cover cannot be empty', trigger: 'blur'}
          ],
          introduction: [
            {required: true, message: 'Introduce cannot be empty', trigger: 'blur'}
          ],
          content: [
            {required: true, message: 'Please enter a personal introduction', trigger: 'blur'},
            {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.getCategory();
    },
    methods: {
      ...mapActions({
        createArticle: 'article/createArticle',
        getCategoryList: 'category/getCategoryList'
      }),

      // 获取分类
      async getCategory() {
        try {
          await this.getCategoryList();
        } catch (e) {

        }
      },

      // 上传图片成功回调
      completeUpload(data) {
        this.upload = data;
        this.article.cover = data.url;
      },

      // 传递数值
      handleEditor(value) {
        this.article.content = value;
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            try {
              await this.createArticle(this.article);
              this.$Message.success('创建文章成功');
              this.article = {
                title: '',
                author: '梁凤波',
                categoryId: '',
                tag: '',
                cover: '',
                introduction: '',
                content: ''
              }

              setTimeout(() => {
                window.location.href = "/article/list";
              }, 2000)

            } catch (e) {
              this.$Message.error('创建文章失败')
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

<style scoped lang="scss">
  .upload-images {
    display: flex;
    align-items: center;
  }
</style>
