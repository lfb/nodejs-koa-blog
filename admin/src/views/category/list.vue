<template>
  <!--list-->
  <!--@author: 梁凤波-->
  <!--@date  2018/11/22 22:16-->
  <section class="list-wrap">
    <div class="list" v-if="list.length > 0">
      <Table border :columns="columns" :data="list"></Table>
    </div>
    <div class="model">
      <Modal
        v-model="showModel"
        title="提示"
        @on-ok="remove(id)">
        <p>确定删除分类吗</p>
      </Modal>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        // 文章ID
        id: '',
        showModel: false,
        list: [],
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 80,
            align: 'center'
          },
          {
            title: '分类名称',
            key: 'name'
          },
          {
            title: '父分类',
            key: 'parent_id'
          },
          {
            title: '层级',
            key: 'z_index'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.update(params.row.id);
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.id = params.row.id;
                      this.showModel = true;
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
      }
    },
    computed: {
      ...mapState({})
    },
    created() {
      this.getCategory()
    },
    methods: {
      ...mapActions({
        getCategoryList: 'category/getCategoryList',
        deleteCategory: 'category/deleteCategory'
      }),
      // 获取用户列表
      async getCategory() {
        try {
          this.list = await this.getCategoryList();
          this.$Message.success('获取分类成功！');

        } catch (e) {
          this.$Message.error('获取分类失败！');
        }
      },
      // 更新分类
      async update(id) {
        this.$router.push("/category/update/" + id);
      },

      // 移除分类
      async remove(id) {
        try {
          await this.deleteCategory(id);
          this.$Message.success('删除分类成功');
          this.getCategory();

        } catch (e) {
          this.$Message.error(e.data.message);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
