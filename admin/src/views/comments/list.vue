<template>
  <section>
    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>

      <section class="page">
        <Page :total="page.total" :page-size="page.per_page" :current="page.current_page" show-total
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
            title: '评论人昵称',
            key: 'nickname'
          },
          {
            title: '评论人邮箱',
            key: 'email'
          },
          {
            title: '评论内容',
            key: 'content'
          },
          {
            title: '所属文章',
            key: 'article_id',
            width: 100,
            align: "center"
          },
          {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ]
      }
    },
    created() {
      this._getCommentsList();
    },
    methods: {
      ...mapActions({
        getCommentsList: 'comments/getCommentsList',
        destroyComments: 'comments/destroyComments'
      }),
      // 获取分类
      async _getCommentsList() {
        // const {page, desc} = this.$route.query;

        const res = await this.getCommentsList({
          page: this.currentPage
        });

        this.list = res.data.data.data;
        this.page = res.data.data.meta;
      },
      // 切换分页
      handlePage(page) {
        this.$router.replace({
          query: merge(this.$route.query, {
            page
          })
        });
        this.currentPage = page;
        this._getCommentsList();
      },
      // 删除分类
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此评论吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyComments(id);
              this.$Message.success('删除成功');

              this._getCommentsList();

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
