<template>
  <section class="wrap">
    <article class="content">
      <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="用户登录" name="login">
          <v-user-login/>
        </el-tab-pane>
        <el-tab-pane label="用户注册" name="register">
          <v-user-register/>
        </el-tab-pane>
      </el-tabs>
    </article>
  </section>
</template>
<script>
  import VUserLogin from './user/Login'
  import VUserRegister from './user/Register'

  export default {
    components: {
      VUserLogin,
      VUserRegister
    },
    data() {
      return {
        activeName: 'login'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .wrap {
    background: #fff;
  }

  .content {
    width: 100%;
  }
</style>
