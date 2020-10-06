<template>
  <section>
    <Button type="primary" @click="toPathLink('/article/create')" icon="md-add" style="margin-bottom: 16px;">新增文章
    </Button>
    <section v-if="list.length > 0">
      <Table :loading="loading" border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
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
            title: '文章封面',
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
            title: '文章分类',
            width: 100,
            align: 'center',
            key: 'browse',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.category.name)
              ]);
            }
          },
          {
            title: '文章标题',
            key: 'title'
          },
          {
            title: '浏览次数',
            width: 100,
            align: 'center',
            key: 'browse'
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
        getArticleList: 'article/getArticleList',
        destroyArticle: 'article/destroyArticle'
      }),
      // 获取文章
      async fetchData() {
        // let {page, desc, category_id, keyword} = this.$route.query;
        const res = await this.getArticleList({
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
        this.$router.push(`/article/update/${id}`);
      },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 删除文章
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此文章吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyArticle(id);
              this.$Message.success('删除成功');

              this.fetchData();

            } catch (e) {
              console.log(e)
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
