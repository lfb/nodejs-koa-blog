<template>
  <section>
    <Button type="primary" @click="toPathLink('/advertise/create')" icon="md-add" style="margin-bottom: 16px;">新增广告
    </Button>

    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row.id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>
    </section>

  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "list",
    data() {
      return {
        list: [],
        page: null,
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 80,
            align: "center"
          },
          {
            title: '广告名称',
            key: 'title'
          },
          {
            title: '广告链接',
            render: (h, params) => {
              return h('a', {
                attrs: {
                  href: params.row.link,
                  target: '_blank'
                },
                style: {
                  color: '#2d8cf0'
                },
              }, params.row.link);
            }
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ]
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      ...mapActions({
        getAdvertiseList: 'advertise/getAdvertiseList',
        destroyAdvertise: 'advertise/destroyAdvertise'
      }),
      // 获取广告列表
      async fetchData() {
        const res = await this.getAdvertiseList();
        this.list = res.data.data.data;
      },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 更新
      update(id) {
        this.$router.push(`/advertise/update/${id}`);
      },
      // 删除广告
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此广告吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyAdvertise(id);
              this.$Message.success('删除成功');
              this.fetchData();

            } catch (e) {
              this.$Message.error(e);
              console.log(e)

            } finally {
              this.$Modal.remove();
            }

          },
          onCancel: () => {
            this.$Message.warning('取消！');
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
