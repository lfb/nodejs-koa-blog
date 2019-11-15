<template>
  <section>
    <Button type="primary" @click="toPathLink('/column/create')" icon="md-add" style="margin-bottom: 16px;">新增专栏
    </Button>
    <section v-if="list.length > 0">
      <Table :loading="loading" border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="warning" size="small" style="margin-right: 5px" @click="chapter(row.id)">章节</Button>
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row.id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>

      <section class="page">
        <Page :total="page.total"
              :page-size="page.per_page"
              :current="page.current_page"
              show-total
              @on-change="handlePage"></Page>
      </section>

    </section>
  </section>
</template>

<script>
  import merge from 'webpack-merge'
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "list",
    data() {
      return {
        loading: true,
        list: [],
        page: {},
        currentPage: 1,
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 80,
            align: "center"
          },
          {
            title: '专栏封面',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.cover + '?imageView2/1/w/100/h/100'
                },
                style: {
                  width: '80px',
                  height: '80px',
                  padding: '10px',
                  'border-radius': '10px'
                }
              });
            }
          },
          {
            title: '专栏标题',
            key: 'title'
          },
          {
            title: '专栏简介',
            key: 'description'
          },
          {
            title: '操作',
            slot: 'action',
            width: 200,
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
        geColumnList: 'column/list',
        destroyColumn: 'column/destroy'
      }),
      // 获取文章
      async fetchData() {
        const res = await this.geColumnList({
          page: this.currentPage
        });

        this.list = res.data.data.data;
        this.page = res.data.data.meta;
        this.loading = false;
      },
      // 切换分页
      handlePage(page) {
        this.$router.replace({
          query: merge(this.$route.query, {
            page
          })
        });
        this.currentPage = page;
        this.fetchData();
      },
      // 更新
      update(id) {
        this.$router.push(`/column/update/${id}`);
      },
      // 专栏章节
      chapter(id) {
        this.$router.push(`/column/chapter/${id}`);
      },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 删除分类
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此专栏吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyColumn(id);
              this.$Message.success('删除成功');
              this.fetchData();

            } catch (e) {
              this.$Message.error(e);

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
  .page {
    padding: 32px 0;
    text-align: center;
  }
</style>
