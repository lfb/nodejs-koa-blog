<template>
  <section class="wrap">
    <article class="content">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="80px"
               class="demo-ruleForm">
        <el-form-item label="昵称" prop="nickname">
          <el-input type="text" placeholder="请输入昵称" v-model="ruleForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" placeholder="请输入邮箱" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password1">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" placeholder="请输入确认密码" v-model="ruleForm.password2" autocomplete="off"></el-input>
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
  import {mapActions} from 'vuex';

  export default {
    data() {
      var validateNickname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        } else {
          callback();
        }
      };
      var validateEmail = (rule, value, callback) => {
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确的邮箱'));

        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码最低为6位'));

        } else {
          if (this.ruleForm.password2 !== '') {
            this.$refs.ruleForm.validateField('password2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          nickname: '',
          email: '',
          password1: '',
          password2: ''
        },
        rules: {
          nickname: [
            {validator: validateNickname, trigger: 'blur'}
          ],
          email: [
            {validator: validateEmail, trigger: 'blur'}
          ],
          password1: [
            {validator: validatePass, trigger: 'blur'}
          ],
          password2: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      ...mapActions({
        userRegister: 'user/userRegister'
      }),
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await this.userRegister(this.ruleForm);
            this.showMessage('注册成功！');

            setTimeout(() => {
              this.resetForm('ruleForm');
              this.changeTabs();
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
      },
      // 父组件方法
      changeTabs() {
        this.$emit('changeTabs', 'login')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 100%;
  }
</style>
