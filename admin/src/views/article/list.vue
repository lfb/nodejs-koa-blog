<template>
  <!--list-->
  <!--@author: 梁凤波-->
  <!--@date  2018/11/22 22:16-->
  <section class="list-wrap">
    <div class="list" v-if="list.length > 0">
      <Table border :columns="columns" :data="list"></Table>
      <div class="page">
        <pagination :page="page" @on-change="fetchData"></pagination>
      </div>

    </div>
    <div class="model">
      <Modal
        v-model="showModel"
        title="提示"
        @on-ok="remove(id)">
        <p>{{tipsText}}</p>
      </Modal>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import pagination from '../../components/pagination'

  export default {
    components: {
      pagination
    },
    data() {
      return {
        // 文章ID
        id: '',
        showModel: false,
        tipsText: '',
        // 是否软删除
        is_del: 0,
        list: [],
        page: null,
        pagination: '',
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 50,
            align: 'center'
          },

          {
            title: '文章封面',
            key: 'cover',
            width: 110,
            render: (h, params) => {
              return h('div', {
                  style: {
                    padding: "10px 0px"
                  }
                }, [
                  h('img', {
                      attrs: {
                        src: `${params.row.cover}?imageView2/1/w/150/h/150`
                      },
                      style: {
                        width: '75px',
                      }
                    }
                  ),
                  h('h2', params.row.name),
                ]
              );
            }
          },
          {
            title: '文章标题',
            key: 'title',
            render: (h, params) => {
              return h('div', [
                h('div', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    fontWeight: 800,
                    fontSize: 20,
                    color: "#000"
                  },
                }, params.row.title)
              ]);
            }
          },
          {
            title: '标签',
            key: 'tag',
            width: 120
          },
          {
            title: '分类',
            key: 'category',
            width: 120,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                }, params.row.category.name)
              ]);
            }
          },

          {
            title: '是否被删除',
            key: "is_del",
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: params.row.is_del ? 'error' : 'success',
                    size: 'small'
                  },
                }, params.row.is_del ? '已被隐藏' : '正常显示中')
              ]);
            }
          },
          {
            title: '浏览',
            key: "browser",
            width: 80,
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
                    size: 'small',
                    disabled: params.row.is_del
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
                    type: params.row.is_del ? 'warning' : 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.id = params.row.id;
                      this.showModel = true;
                      this.tipsText = params.row.is_del ? '确定恢复文章吗' : '确定隐藏文章吗'
                      this.is_del = params.row.is_del ? 0 : 1
                    }
                  }
                }, params.row.is_del ? '恢复文章' : '隐藏文章')
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
      this.fetchData()
    },
    methods: {
      ...mapActions({
        articleList: 'article/articleList',
        hiddenArticle: 'article/hiddenArticle'
      }),
      // 获取用户列表
      async fetchData(page) {
        try {
          this.pagination = page;
          const ret = await this.articleList({
            include: 'is_del',
            page
          });
          this.page = ret.meta;
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
          await this.hiddenArticle({
            id,
            is_del: this.is_del
          });
          this.$Message.success('删除文章成功');
          this.fetchData(this.pagination);

        } catch (e) {
          console.log(e);
          this.$Message.error('删除文章失败');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    text-align: center;
    padding: 32px 0;
  }
</style>
