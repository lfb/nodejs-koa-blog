<template>
  <section class="wrap">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="ruleForm.description" />
      </el-form-item>
      <el-form-item label="图片" prop="img_url">
        <el-input v-model="ruleForm.img_url" />
      </el-form-item>
      <el-form-item label="跳转链接" prop="jump_url">
        <el-input v-model="ruleForm.jump_url" />
      </el-form-item>
      <el-form-item label="SEO关键字" prop="seo_keyword">
        <el-input v-model="ruleForm.seo_keyword" />
      </el-form-item>
      <div>
        <el-form-item label="展示" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分类" prop="category_id">
          <el-select v-model="ruleForm.category_id" placeholder="请选择分类">
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort_order">
          <el-input v-model="ruleForm.sort_order" />
        </el-form-item>
      </div>
      <el-form-item label="内容" prop="content">
        <mavon-editor v-model="ruleForm.content" code-style="atom-one-dark" />
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { detail, update } from '@/api/article'
import { list } from '@/api/category'

export default {
  name: 'CategoryCreate',
  data() {
    return {
      value: '',
      categoryList: [],
      ruleForm: {
        id: this.$route.query.id,
        title: '',
        description: '',
        img_url: '',
        jump_url: '',
        seo_keyword: '',
        status: 1,
        sort_order: 1,
        admin_id: '',
        category_id: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入文章描述', trigger: 'blur' }
        ],
        img_url: [
          { required: true, message: '请输入图片链接', trigger: 'blur' }
        ],
        jump_url: [
          { required: true, message: '请输入跳转链接', trigger: 'blur' }
        ],
        seo_keyword: [
          { required: true, message: '请输入 SEO 关键字', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请输入展示状态', trigger: 'blur' }
        ],
        sort_order: [
          { required: true, message: '请输入文章排序', trigger: 'blur' }
        ],
        category_id: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      adminInfo: state => state.admin.adminInfo
    })
  },
  mounted() {
    this.getArticleDetail()
    this.getCategoryList()
  },
  methods: {
    async getArticleDetail() {
      try {
        const res = await detail({
          id: this.$route.query.id,
          is_markdown: false
        })
        this.ruleForm.title = res.data.title
        this.ruleForm.description = res.data.description
        this.ruleForm.img_url = res.data.img_url
        this.ruleForm.content = res.data.content
        this.ruleForm.jump_url = res.data.jump_url
        this.ruleForm.seo_keyword = res.data.seo_keyword
        this.ruleForm.status = res.data.status
        this.ruleForm.sort_order = res.data.sort_order
        this.ruleForm.category_id = res.data.category_info.id
        this.ruleForm.content = res.data.content
        this.ruleForm.admin_id = (this.adminInfo && this.adminInfo.id) || res.data.adminInfo.id
      } catch (err) {
        console.log(err)
      }
    },
    async getCategoryList() {
      try {
        this.listLoading = true
        const res = await list()
        this.categoryList = res.data.data
      } catch (err) {
        console.log(err)
      } finally {
        this.listLoading = false
      }
    },
    submitForm(formName) {
      if (this.adminInfo) {
        this.ruleForm.admin_id = this.adminInfo.id
      }
      console.log('ruleForm', this.ruleForm)

      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.createArticle()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async createArticle() {
      try {
        const res = await update(this.ruleForm)
        if (res.code === 200) {
          this.$msgbox.confirm('更新成功，是否退出更新文章页面', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            this.$router.push('/article/index')
          })
        }
      } catch (err) {
        this.$message.error(err)
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
.wrap {
  box-sizing: border-box;
  margin: 24px;
}
</style>
