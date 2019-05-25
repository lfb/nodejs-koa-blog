<template>
  <section class="wrap">
    <article class="content">
      <el-form :model="ruleForm" status-icon :rules="rules" label-position="left" ref="ruleForm" label-width="50px"
               class="demo-ruleForm">
        <el-form-item label="邮箱" prop="account">
          <el-input type="text" placeholder="请输入邮箱" v-model="ruleForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="secret">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.secret" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </article>
  </section>
</template>
<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      var validateAccount = (rule, value, callback) => {
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

        if (value === '') {
          callback(new Error('请输入邮箱'));

        } else if (!reg.test(value)) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      };
      var validateSecret = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          account: '',
          secret: ''
        },
        rules: {
          account: [
            {validator: validateAccount, trigger: 'blur'}
          ],
          secret: [
            {validator: validateSecret, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      ...mapActions({
        userLogin: 'user/userLogin'
      }),
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await this.userLogin(this.ruleForm);
            this.showMessage('登录成功！');

            setTimeout(() => {
              this.resetForm('ruleForm');
              this.$router.push('/');
            }, 1000)

          } else {
            this.showMessage('请完善表单', 'error');
            return false;
          }
        });
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 显示信息
      showMessage(message, type = 'success') {
        this.$message({
          message,
          type
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
