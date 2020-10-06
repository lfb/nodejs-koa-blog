<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="文章标题" prop="title">
        <Input v-model="formValidate.title" placeholder="文章标题"></Input>
      </FormItem>
      <FormItem label="文章作者" prop="author">
        <Input v-model="formValidate.author" placeholder="文章作者"></Input>
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
        column_chapter_id: this.$route.query.column_chapter_id,
        id: this.$route.params.id,
        detail: null,
        categoryList: [],
        formValidate: {
          title: '',
          author: '',
          content: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: '文章标题不能为空', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '文章作者不能为空', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '文章内容不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      ...mapActions({
        updateSection: 'section/update',
        sectionDetail: 'section/detail'
      }),
      // 获取详情
      async fetchData() {
        const r = await this.sectionDetail({
          id: this.id
        })
        this.formValidate.title = r.data.data.title;
        this.formValidate.author = r.data.data.author;
        this.formValidate.content = r.data.data.content;
      },
      // 创建
      async create() {
        try {
          this.formValidate.column_chapter_id = this.column_chapter_id;
          this.formValidate.id = this.id;
          await this.updateSection(this.formValidate);
          this.$Message.success('更新成功!');
          this.$router.push('/chapter/section/' + this.column_chapter_id);

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
