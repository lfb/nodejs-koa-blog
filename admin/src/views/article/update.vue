<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="文章标题" prop="title">
        <Input v-model="formValidate.title" placeholder="文章标题"></Input>
      </FormItem>
      <FormItem label="文章作者" prop="author">
        <Input v-model="formValidate.author" placeholder="文章作者"></Input>
      </FormItem>
      <FormItem label="文章分类" v-if="categoryList.length > 0">
        <Select v-model="formValidate.category_id">
          <Option v-for="(item, index) in categoryList" :value="item.id" :key="index">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="文章封面" prop="cover">
        <div class="cover">
          <div class="upload">
            <Upload
              multiple
              type="drag"
              action="http://up-z2.qiniu.com"
              :show-upload-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :data="{token}">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或者拖拽上传</p>
              </div>
            </Upload>
          </div>
          <div class="article-cover">
            <img :src="formValidate.cover" alt="cover">
          </div>
        </div>
      </FormItem>
      <FormItem label="文章内容" prop="content">
        <mavon-editor
          v-model="formValidate.content"
          :ishljs="true"
          ref=md>
        </mavon-editor>

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
  import getUploadToken from '../../libs/upload-token'

  export default {
    data() {
      return {
        token: '',
        id: this.$route.params.id,
        detail: null,
        categoryList: [],
        formValidate: {
          title: '',
          author: '',
          category_id: '',
          cover: '',
          content: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: '文章标题不能为空', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '文章作者不能为空', trigger: 'blur'}
          ],
          cover: [
            {required: true, message: '文章封面不能为空', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '文章内容不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this._getArticle();
      this._getCategoryList();
      this._getUploadToken();
    },
    methods: {
      ...mapActions({
        getArticle: 'article/getArticle',
        updateArticle: 'article/updateArticle',
        getCategoryList: 'category/getCategoryList'
      }),
      // 上传图片成功
      uploadSuccess(response) {
        const url = `http://cdn.boblog.com/${response.key}`;
        this.formValidate.cover = url;
        this.$Message.success('上传成功!');
      },
      // 上传图片失败
      uploadError(response) {
        this.$Message.success('上传失败!');
        console.log(response)
      },
      // 获取上传token
      async _getUploadToken() {
        try {
          const res = await getUploadToken();
          this.token = res.token;

        } catch (e) {
          console.log(e)
        }
      },
      // 获取文章列表
      async _getArticle() {
        try {
          const res = await this.getArticle({
            id: this.id
          });
          const article = res.data.data;

          this.formValidate.title = article.title;
          this.formValidate.author = article.author;
          this.formValidate.category_id = parseInt(article.category_id);
          this.formValidate.cover = article.cover;
          this.formValidate.content = article.content;

        } catch (e) {

        }
      },
      // 获取分类列表
      async _getCategoryList() {
        const res = await this.getCategoryList();
        this.categoryList = res.data.data;
      },
      // 更新
      async _updateArticle() {
        this.formValidate.id = this.id;

        try {
          await this.updateArticle(this.formValidate);
          this.$Message.success('更新成功!');
          this.$router.push('/article');

        } catch (e) {

        }
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._updateArticle();

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
<style scoped>
  .article-cover {
    width: 120px;
  }

  .article-cover img {
    width: 100%;
  }

  .cover {
    display: flex;
  }

  .cover .upload {
    width: 280px;
    margin-right: 32px;
  }
</style>
