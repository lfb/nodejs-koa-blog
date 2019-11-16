<template>
  <section>
    <Button type="primary" @click="showCreateChapter" icon="md-add" style="margin-bottom: 16px;">新增章节
    </Button>
    <section v-if="list.length > 0">
      <Table :loading="loading" border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="warning" size="small" style="margin-right: 5px" @click="chapterSection(row.id)">章节文章</Button>
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row.title, row.id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>
    </section>

    <Modal
      v-model="isCreateChapter"
      :z-index="zIndex"
      title="创建章节">
      <v-create-chapter @showCreateChapter="showCreateChapter"/>
    </Modal>

    <Modal
      v-model="isUpdateChapter"
      :z-index="zIndex"
      title="更新章节">
      <v-update-chapter :chapter_id="chapterId" :title="chapterTitle" @showUpdateChapter="showUpdateChapter"/>
    </Modal>

  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import VCreateChapter from './create'
  import VUpdateChapter from './update'

  export default {
    components: {
      VCreateChapter,
      VUpdateChapter
    },
    name: "list",
    data() {
      return {
        isCreateChapter: false,
        isUpdateChapter: false,
        column_id: this.$route.params.column_id,
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
            title: '章节标题',
            key: 'title'
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
        getChapterList: 'chapter/list',
        destroyChapter: 'chapter/destroy'
      }),
      // 获取文章
      async fetchData() {
        const res = await this.getChapterList({
          column_id: this.column_id
        });
        this.list = res.data.data.chapter_list;
        this.loading = false;
      },
      // 出现更新章节模态框
      showUpdateChapter() {
        this.isUpdateChapter = !this.isUpdateChapter;
        this.fetchData()
      },
      // 更新
      update(title, id) {
        this.chapterTitle = title;
        this.chapterId = id;
        this.isUpdateChapter = !this.isUpdateChapter;
      },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 出现创建章节模态框
      showCreateChapter() {
        this.isCreateChapter = !this.isCreateChapter
        this.fetchData()
      },
      // 查看当前章节下的文章
      chapterSection(id) {
        this.$router.push('/chapter/section/' + id)
      },
      // 删除
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此章节吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyChapter(id);
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
</style>
