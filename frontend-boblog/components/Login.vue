<template>
  <div>
    <div class="login">
      <div class="login-logo"></div>
      <h2 class="login-header">
        {{ isLogin ? '登录' : '注册' }}
      </h2>

      <div v-if="!isLogin" class="login-content">
        <input
          v-model="user.username"
          maxlength="32"
          class="login-input"
          placeholder="请输入你的昵称"
        />
      </div>
      <div class="login-content">
        <input
          v-model="user.email"
          maxlength="32"
          class="login-input"
          placeholder="请输入联系邮箱"
        />
      </div>

      <div class="login-content">
        <input
          v-model="user.password"
          maxlength="16"
          type="password"
          class="login-input"
          placeholder="请输入密码，密码长度必须在6~22位之间，包含字符、数字和 _"
        />
      </div>
      <div class="login-register-tips" @click="isLogin = !isLogin">
        {{ isLogin ? '未有账号？点击注册！' : '已有账号？点击登录！' }}
      </div>
      <div class="login-btn">
        <button
          :disabled="isDisabled"
          :class="['login-btn-submit', {'opacity': isDisabled}]"
          @click="onClickType"
        >
          {{ isLogin ? '登录' : '注册' }}
        </button>
        <button class="login-btn-default" @click="onSuccess(false)">
          匿名评论
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { validEmail, validPassword } from '@/lib/utils'

export default {
  name: "Login",
  data() {
    return {
      // true-登录，false-注册
      isLogin: true,
      // 用户信息
      user: {
        username: '',
        email: '',
        password: '',
      },
    }
  },
  computed: {
    isDisabled() {
      if(this.isLogin === true) {
        return !this.user.email || !this.user.password
      }

      if(this.isLogin === false){
        return !this.user.email
          || !this.user.password
          || !this.user.username
      }

      return true
    }
  },
  methods: {
    // 点击-登录 or 注册
    onClickType() {
      if (this.isLogin) {
        this.onUserLogin()
      } else {
        this.onUserRegister()
      }
    },
    // 用户登录
    async onUserLogin() {
      if(!this.checkoutEmailPassword()) {
        return false
      }

      const [err] = await this.$store.dispatch(
        'user/userLogin',
        this.user
      )
      if (!err) {
        this.onSuccess()
        this.$message.success('登录成功')
      }
    },
    // 用户注册
    async onUserRegister() {
      if(!this.checkoutEmailPassword()) {
        return false
      }

      const user = this.user

      const registerParams = {
        email: user.email,
        username: user.username,
        password1: user.password,
        password2: user.password,
      }
      const [err] = await this.$store.dispatch(
        'user/userRegister',
        registerParams
      )
      if (!err) {
        this.onSuccess()
        this.$message.success('注册成功')
      }
    },
    // 登录注册成功的回调
    onSuccess(show = false) {
      this.user.email = ''
      this.user.username = ''
      this.$emit('on-success', show)
    },
    // 检测邮箱和密码是否正确
    checkoutEmailPassword() {
      const user = this.user

      if(this.isLogin === false && !user.username) {
        this.$message.warning('请输入你的昵称!')
        return false
      }


      if (!validEmail(user.email)) {
        this.$message.warning('请输入正确的邮箱!')
        return false
      }

      if (!validPassword(user.password)) {
        this.$message.warning('密码长度必须在6~22位之间，包含字符、数字和 _')
        return false
      }

      return true
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
}
.login-header {
  display: none;
  text-align: center;
}
.login-logo {
  position: relative;
  box-sizing: border-box;
  width: 150px;
  height: 98px;
  margin: 0 auto;
  background: url(https://cdn.boblog.com/boblog.png) -16px center no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  text-align: center;
}


.login-content {
  display: block;
  margin-bottom: 12px;
}

.login-input {
  resize: none;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 14px;
  font-size: 14px;
  color: #404040;
  border: 1px solid #f0f0f0;
  transition: 0.2s all ease-in;

  &:focus {
    box-shadow: rgba(0, 0, 0, 0.12) 0 2px 8px;
  }
}

.login-register-tips {
  cursor: pointer;
  font-size: 12px;
  color: #999;

  &:hover {
    color: #2d8cf0;
    text-decoration: underline;
  }
}
.login-btn {
  margin: 32px 0;
  &-submit {
    cursor: pointer;
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    border: none;
    outline: none;
    border-radius: 32px;
    background: #2d8cf0;
    margin-bottom: 16px;
  }
  &-default {
    cursor: pointer;
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: #2d8cf0;
    text-align: center;
    border: 1px solid #2d8cf0;
    outline: none;
    border-radius: 32px;
    background: #fff;
  }
}
</style>
