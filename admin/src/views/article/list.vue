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
        <p>确定删除文章吗</p>
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
            title: '文章标题',
            key: 'title'
          },
          {
            title: '推荐',
            key: 'recommend',
            width: 120,
            align: 'center'
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
      this.getArticleList()
    },
    methods: {
      ...mapActions({
        articleList: 'article/articleList',
        deleteArticle: 'article/deleteArticle'
      }),
      // 获取用户列表
      async getArticleList() {
        try {
          const ret = await this.articleList();
          this.$Message.success('获取文章列表成功');
          this.list = ret.data;
        } catch (e) {
          this.$Message.error('获取文章列表失败');

        }
      },
      // 更新文章
      async update(id) {
        this.$router.push("/article/update/" + id);
      },

      // 移除文章
      async remove(id) {
        try {
          await this.deleteArticle(id);
          this.$Message.success('删除文章成功');
          this.getArticleList();

        } catch (e) {
          console.log(e);
          this.$Message.error('删除文章失败');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
