<template>
  <section>
    <Button type="primary" @click="create" icon="md-add" style="margin-bottom: 16px;">新增文章
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
    </section>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "list",
    data() {
      return {
        isCreateChapter: false,
        isUpdateChapter: false,
        column_chapter_id: this.$route.params.column_chapter_id,
        loading: true,
        chapterTitle: '',
        chapterId: -1,
        zIndex: 9999,
        list: [],
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
            title: '文章作者',
            key: 'author'
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
        getSectionList: 'section/list',
        destroySection: 'section/destroy'
      }),
      // 获取章节文章
      async fetchData() {
        const res = await this.getSectionList({
          column_chapter_id: this.column_chapter_id
        });
        this.list = res.data.data;
        this.loading = false;
      },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 创建
      create() {
        this.$router.push('/chapter/section/create/' + this.column_chapter_id)
      },
      // 更新
      update(id) {
        this.$router.push('/chapter/section/update/' + id + '?column_chapter_id=' + this.column_chapter_id)
      },
      // 删除
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此章节文章吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroySection(id);
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
</style>
