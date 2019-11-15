<template>
  <section>
    <div class="empty" v-if="list.length === 0">
      暂无回复
    </div>
    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
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
        comment_id: this.$route.params.comment_id,
        list: [],
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
            title: 'Action',
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
        getReplyList: 'reply/list',
        destroyReply: 'reply/destroy'
      }),
      // 获取分类
      async fetchData() {
        const res = await this.getReplyList({
          comment_id: this.comment_id
        });
        this.list = res.data.data;
      },
      reply(){

      },
      // 删除分类
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此回复评论吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyReply(id);
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
  .empty {
    padding: 32px 0;
    text-align: center;
  }
</style>
