<template>
  <div class="form-wrap">
    <div class="form">
      <div class="form-bg">
        <img src="https://cdn.boblog.com/login-bg.png" alt="login" />
      </div>
      <div class="form-list">
        <div class="logo">
          <img src="https://cdn.boblog.com/logo.png" alt="logo" />
        </div>
        <div v-if="!isLogin" class="form-item">
          <input
            v-model="user.username"
            maxlength="16"
            class="input"
            type="text"
            placeholder="请输入你的昵称"
          />
        </div>
        <div class="form-item">
          <input
            v-model="user.email"
            class="input"
            maxlength="32"
            type="text"
            placeholder="请输入联系邮箱"
          />
        </div>
        <div class="form-item">
          <input
            v-model="user.password"
            class="input"
            maxlength="16"
            type="password"
            placeholder="请输入密码（长度6-22位之间）"
          />
        </div>
        <div class="change" @click="isLogin = !isLogin">
          {{ isLogin ? '未有账号？点击注册！' : '已有账号？点击登录！' }}
        </div>
        <button :disabled="isDisabled" class="login" @click="onClickType">
          {{ isLogin ? '登录' : '注册' }}
        </button>
        <button class="anonymous-comment" @click="onAnonymousComment">
          匿名评论
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { validEmail, validPassword } from '@/lib/utils'
import { mapState } from 'vuex'

export default {
  name: 'LoginForm',
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
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLoginStatus: (state) => state.user.isLoginStatus,
    }),
    userId() {
      return (this.userInfo && this.userInfo.id) || 0
    },
    isDisabled() {
      if (this.isLogin === true) {
        return !this.user.email || !this.user.password
      }

      if (this.isLogin === false) {
        return !this.user.email || !this.user.password || !this.user.username
      }

      return true
    },
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
      if (!this.checkoutEmailPassword()) {
        return false
      }

      const [err] = await this.$store.dispatch('user/userLogin', this.user)
      if (!err) {
        this.onSuccess()
        this.$message.success('登录成功')
      }
    },
    // 用户注册
    async onUserRegister() {
      if (!this.checkoutEmailPassword()) {
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
    // 匿名评论
    onAnonymousComment() {
      sessionStorage.setItem('isAnonymous', '1')
      this.onSuccess()
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

      if (this.isLogin === false && !user.username) {
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
    },
  },
}
</script>
<style scoped lang="scss">
.form {
  display: flex;
}
.form-bg {
  width: 500px;
  font-size: 0;

  img {
    width: 100%;
  }
}
.form-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
.logo {
  margin: 64px 0 68px;
  width: 154px;
  img {
    width: 100%;
  }
}
.input {
  box-sizing: border-box;
  outline: none;
  padding: 16px;
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #222;
  background: #ffffff;
  margin-bottom: 16px;
  border: 1px solid #cccccc;
  &::placeholder {
    color: #999;
  }
}
.change {
  cursor: pointer;
  width: 300px;
  text-align: right;
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
  &:hover {
    color: #2d8cf0;
  }
}
.register,
.login {
  cursor: pointer;
  border: none;
  outline: none;
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  line-height: 22px;
  background: #222222;
  border-radius: 25px;
  margin: 32px 0 16px;
}
.anonymous-comment {
  cursor: pointer;
  outline: none;
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  color: #222222;
  line-height: 22px;
  background: #ffffff;
  border-radius: 25px;
  border: 1px solid #222222;
}
</style>
