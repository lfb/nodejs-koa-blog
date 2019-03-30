<template>
  <Form ref="detail" :model="detail" :rules="ruleValidate" :label-width="80">
    <FormItem label="文章标题" prop="title">
      <Input v-model="detail.title" placeholder="title"></Input>
    </FormItem>
    <FormItem label="文章作者" prop="author">
      <Input v-model="detail.author" placeholder="author"></Input>
    </FormItem>
    <FormItem label="文章分类" prop="category">
      <Select
        v-if="categoryList.length > 0"
        v-model="detail.categoryId"
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
      <Input v-model="detail.tag" placeholder="tag"></Input>
    </FormItem>
    <FormItem label="文章图片" prop="banner">
      <upload-images @completeUpload="completeUpload"/>
      <div v-if="upload">
        <img :src="upload.url" alt="img">
      </div>
    </FormItem>
    <FormItem label="文章简介" prop="introduce">
      <Input v-model="detail.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
             placeholder="introduce"></Input>
    </FormItem>

    <FormItem label="文章内容" prop="content" v-if="uploadTokenData">
      <mavon-editer-upload :data="detail.content" @handleEditor="handleEditor"/>
    </FormItem>
    <FormItem>
      <Button @click="handleReset('detail')">重置</Button>
      <Button type="primary" style="margin-left: 8px" @click="handleSubmit('detail')">更新</Button>
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
        id: this.$route.params.id,
        upload: {},
        detail: {},
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
            {required: true, message: 'tag cannot be empty', trigger: 'blur'}
          ], cover: [
            {required: true, message: 'cover cannot be empty', trigger: 'blur'}
          ],
          introduction: [
            {required: true, message: 'Introduce cannot be empty', trigger: 'blur'}
          ],
          content: [
            {required: true, message: 'Please enter a personal content', trigger: 'blur'},
            {type: 'string', min: 20, message: 'content no less than 20 words', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.getCategory();
      this.getArticleInfo();
    },
    methods: {
      ...mapActions({
        updateArticle: 'article/updateArticle',
        getArticleDetail: 'article/getArticleDetail',
        getCategoryList: 'category/getCategoryList'
      }),

      // 获取文章信息
      async getArticleInfo() {
        try {
          const ret = await this.getArticleDetail(this.id);
          this.detail = ret;
          this.upload.url = this.detail.cover;
          this.$Message.success('获取文章成功')

        } catch (e) {
          console.log(e)
          this.$Message.error('获取文章失败')
        }
      },

      // 获取分类
      async getCategory() {
        try {
          await this.getCategoryList();
          this.$Message.success('获取分类成功')

        } catch (e) {
          this.$Message.error('获取分类失败')
        }
      },
      // 上传图片成功回调
      completeUpload(data) {
        this.upload = data;
        this.detail.cover = data.url;
      },

      // 传递数值
      handleEditor(value) {
        this.detail.content = value;
      },

      // 提交
      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            try {
              await this.updateArticle(this.detail);
              this.$Message.success('更新成功');
              // window.location.href = "/article/list";

            } catch (e) {
              this.$Message.error('更新失败')
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
