<template>
  <!--list-->
  <!--@author: 梁凤波-->
  <!--@date  2018/11/22 22:16-->
  <section class="list-wrap">
    <div class="list" v-if="list.length > 0">
      <Table border :columns="columns" :data="list"></Table>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        list: [],
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 120,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'username'
          },
          {
            title: '邮箱',
            key: 'email'
          }
        ],
      }
    },
    computed: {
      ...mapState({})
    },
    created() {
      this.getUserList()
    },
    methods: {
      ...mapActions({
        userList: 'user/userList'
      }),
      // 获取用户列表
      async getUserList() {
        try {
          const ret = await this.userList();
          this.list = ret.data.data;
        } catch (e) {

        }
      },
      show(index) {
        console.log(index);
      },
      remove(index) {
        console.log(index);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
