<template>
  <section class="wrap">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="排序" prop="sort_order">
        <el-input v-model="ruleForm.sort_order" />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >立即创建</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { create } from '@/api/category'

export default {
  name: 'CategoryCreate',
  data() {
    return {
      ruleForm: {
        name: '',
        sort_order: '1'
      },
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        sort_order: [
          { required: true, message: '请输入分类排序', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.createCategory()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 创建分类
    async createCategory() {
      try {
        const res = await create(this.ruleForm)
        if (res.code === 200) {
          this.$msgbox
            .confirm('创建成功，是否退出创建分类页面', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            })
            .then(() => {
              this.$router.push('/category/index')
            })
        }
      } catch (err) {
        this.$message.error(err)
      }
    },
    // 重置表单
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
