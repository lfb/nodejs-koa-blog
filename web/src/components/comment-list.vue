<template>
  <section class="comment">
    <div class="comment-header">
      评论列表
    </div>
    <ul class="comment-box" v-if="comment && comment.length > 0">
      <li class="comment-item" v-for="item in comment" :key="item.id">
        <div class="comment-avatar">
          <Avatar size="small" style="background-color: #2d8cf0" icon="ios-person"/>
        </div>
        <div class="comment-info">
          <h1 class="comment-username">{{item.nickname}}</h1>
          <p class="comment-content">
            {{item.content}}
          </p>
          <div class="comment-reply" v-if="item.reply && item.reply.length > 0">
            <ul class="comment-box">
              <li class="comment-item" v-for="reply in item.reply" :key="reply.id">
                <div class="comment-avatar">
                  <Avatar size="small" style="background-color: #2d8cf0" icon="ios-chatbubbles"/>
                </div>
                <div class="comment-info">
                  <h1 class="comment-username">来自「{{reply.nickname}}」的回复 {{reply.reply_username}}</h1>
                  <p class="comment-content">
                    {{reply.content}}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <p class="comment-reply-btn" @click="reply(item.id, item.nickname)">点击回复</p>
        </div>
      </li>
    </ul>

    <ul class="load-more-comment" @click="loadMoreComment" v-if="page && page.current_page < page.total_pages">
      <Icon type="md-ionic" style="color: #f00;" />
      点击加载更多
    </ul>

    <Modal
      v-model="show"
      :z-index="zIndex"
      :title="replyNickname">
      <v-comment-create
        @updateComment="updateComment"
        :comment_type="commentType"
        :comment_id="comment_id"/>
    </Modal>
  </section>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import VCommentCreate from './comment-create'

  export default {
    props: {
      target_id: {
        type: Number || String,
        default() {
          return -1
        }
      },
      target_type: {
        type: String,
        default() {
          return 'article'
        }
      }
    },
    components: {
      VCommentCreate
    },
    computed: {
      ...mapState({
        comment: state => state.comment.commentList,
        page: state => state.comment.commentPage
      })
    },
    data() {
      return {
        show: false,
        // 评论父级id
        comment_id: 0,
        // 回复昵称
        replyNickname: '',
        zIndex: 9999,
        replyArr: [],
        commentType: 'reply',
        currentPage: 2
      }
    },
    methods: {
      ...mapActions({
        getCommentList: 'comment/getCommentList'
      }),
      // 回复评论
      reply(id, name) {
        this.comment_id = id
        this.replyNickname = `回复 「${name}」：`
        this.show = !this.show
      },
      // 更新评论
      updateComment(newComment, type) {
        this.show = !this.show
        this.$emit('updateComment', newComment, type)
      },
      // 加载更多评论
      async loadMoreComment() {
        if (this.page && this.page.current_page !== this.page.total_pages) {
          const r = await this.getCommentList({
            target_id: this.target_id,
            target_type: this.target_type,
            page: this.currentPage
          })
          const newCommentList = [...this.comment, ...r.data.data.data]
          this.$store.commit('comment/SET_COMMENT_LIST', newCommentList)
          this.$store.commit('comment/SET_COMMENT_PAGE', r.data.data.meta)
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .comment-header {
    font-size: 28px;
    font-weight: 500;
    color: #2d8cf0;
    padding: 32px 0 16px;
  }

  .comment-item {
    margin: 16px 0;
    display: flex;
  }

  .comment-avatar {
    margin-right: 16px;
  }

  .comment-username {
    color: #17233d;
    font-size: 18px;
    font-weight: 500;
  }

  .comment-info {
    flex: 1;
  }

  .comment-content {
    color: #515a6e;
    line-height: 36px;
    font-size: 16px;
  }

  .comment-reply {
    padding: 12px 24px;
    margin: 24px 0;
    border-radius: 6px;
    background: #f8f8f8;
  }

  .comment-reply-btn {
    color: #2d8cf0;
    font-size: 16px;
    cursor: pointer;
  }

  .time {
    font-size: 14px;
    font-weight: bold;
  }

  .content {
    padding-left: 5px;
  }

  .load-more-comment {
    text-align: center;
    margin: 32px 0;
    font-size: 18px;
    color: #2d8cf0;
    cursor: pointer;
  }
</style>
