<template>
<div>
  <div v-if="commentList" class="comment-list">
    <ul class="comment-box">
      <li
        v-for="(item, index) in commentList"
        :key="item.id"
        class="comment-item"
      >
        <div class="comment-info">
          <div class="comment-info-avatar">
            <el-avatar
              size="medium"
              icon="el-icon-user-solid"
            ></el-avatar>
          </div>
          <div>
            <p class="comment-info-user">
              {{ (item.user_info && item.user_info.username) || '匿名评论' }}
            </p>
            <p class="comment-info-timer">{{ item.created_at }}</p>
          </div>
        </div>
        <div
          class="comment-item-content"
          v-html="mdRender(item.content)"
        ></div>

        <ul v-if="item.reply_list" class="reply-list">
          <li
            v-for="reply in item.reply_list"
            :key="reply.id"
            class="reply-item"
          >
            <div class="comment-info">
              <div class="comment-info-avatar">
                <el-avatar size="small" icon="el-icon-user-solid"  />
              </div>
              <div>
                <p class="comment-info-user">
                  {{ (reply.user_info && reply.user_info.username) || '匿名回复' }}
                </p>
                <p class="comment-info-timer">{{ reply.created_at }}</p>
              </div>
            </div>
            <div class="comment-item-content" v-html="mdRender(reply.content)"></div>
          </li>
        </ul>

        <div class="reply-create">
          <div @click="showReplyUser(index)">
            <i v-if="!item.is_show_reply" class="el-icon-chat-dot-round"> 回复</i>
          </div>
          <div v-if="item.is_show_reply">
            <From  from-type="reply" :reply="{ comment_id: item.id,  reply_user_id: item.user_id}" @on-success="showReplyUser"/>
          </div>
        </div>

      </li>
    </ul>
  </div>

  <div class="pagination">
    <el-pagination
      background
      :current-page.sync="page"
      layout="total, prev, pager, next"
      :total="count"
      @current-change="handleCurrentChange"
    />
  </div>
</div>
</template>

<script>
import {mapState} from "vuex";

import { getCommentTarget } from '@/request/api/comment'

import From from "./From";

export default {
  name: "CommentList",
  components: {
    From
  },
  data() {
    return {
      page: 1,
      count: 0,
      commentList: null,
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLoginStatus: (state) => state.user.isLoginStatus,
    }),
    userId() {
      return (this.userInfo && this.userInfo.id) || 0
    }
  },
  methods: {
    // 点击页码
    async handleCurrentChange(page) {
      const drawerBody = document.querySelector('.el-drawer__body')
      const commentList = document.querySelector('.comment-list')
      const toTop = commentList.getBoundingClientRect().top + drawerBody.scrollTop

      this.page = page
      await this.getComment()
      this.$nextTick(() => {
        this.scrollTopTo(drawerBody, toTop, 0.3)
      })
    },
    // 简单滚动动画
    scrollTopTo(scroller, to, duration) {
      let count = 0
      const from = scroller.scrollTop
      const frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16)
      function animate() {
        scroller.scrollTop += (to - from) / frames
        if (++count < frames) {
          window.requestAnimationFrame(animate)
        }
      }
      animate()
    },

    // 获取评论数据
    async getComment() {
      const [err, res] = await getCommentTarget({
        article_id: this.$route.query.id,
        is_replay: 1,
        is_user: 1,
        status: 1,
        page: this.page
      })
      if (!err) {
        res.data.data.data.forEach((item) => {
          item.is_show_reply = false
        })

        this.commentList = res.data.data.data
        this.count = res.data.data.meta.count
      }
    },
    // 渲染markdown内容
    mdRender(content) {
      return content ? this.$md && this.$md.render(content) : content
    },
    // 预览内容
    onShowPreviewContent(content) {
      this.$emit('on-preview', content)
    },
    // 初始化 数据
    showReplyUser(index = -1) {
      this.commentList.forEach((item, itemIndex) => {
        item.is_show_reply = itemIndex === index
      })
    },


  }
}
</script>

<style scoped lang="scss">
.comment-box {
  .comment-item {
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .comment-info {
    display: flex;
    align-items: center;
  }
  .comment-info-avatar {
    margin-right: 12px;
  }
  .comment-info-user,
  .comment-info-timer {
    padding: 0;
    margin: 0;
  }
  .comment-info-user {
    color: #292929;
    font-size: 14px;
  }
  .comment-info-timer {
    color: #757575;
    font-size: 12px;
  }

  .comment-item-content {
    font-size: 14px;
  }

  .reply-list {
    box-sizing: border-box;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-left: 20px;
    background: #f0f0f0;
  }
  .reply-create {
    cursor: pointer;
    font-size: 14px;

    &:hover {
      color: #2d8cf0;
    }
  }
}
</style>
