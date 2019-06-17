<template>
  <section>
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
            title: '文章标题',
            key: 'title'
          },
          {
            title: '评论次数',
            align: 'center',
            key: 'comments_nums',
            width: 100
          },
          {
            title: '浏览次数',
            width: 100,
            align: 'center',
            key: 'browse'
          },
          {
            title: '分类ID',
            width: 100,
            align: 'center',
            key: 'category_id'
          },
          {
            title: '创建时间',
            width: 150,
            key: 'created_at',
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
      this._getArticleList();
    },
    methods: {
      ...mapActions({
        getArticleList: 'article/getArticleList',
        destroyArticle: 'article/destroyArticle'
      }),
      // 获取文章
      async _getArticleList() {
        // let {page, desc, category_id, keyword} = this.$route.query;

        const res = await this.getArticleList({
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
        this._getArticleList();
      },
      // 更新
      update(id) {
        this.$router.push(`/article/update/${id}`);
      },
      // 删除分类
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此文章吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyArticle(id);
              this.$Message.success('删除成功');

              this._getArticleList();

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
