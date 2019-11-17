<template>
  <section class="chapter-detail">
    <div class="chapter-table" v-if="chapter.length > 0">
      <h1 class="chapter-table-title">
        <Icon type="md-book" /> {{columnTitle}}
      </h1>
      <v-column-chapter @getSection="getSection" :chapter="chapter"/>
    </div>
    <article class="chapter-container" v-if="section">
      <h1 class="chapter-title">
        {{section.title}}
      </h1>
      <ul class="chapter-intro">
        <li>
          <Icon size="16" type="ios-person-outline"/>
          {{section.author}}
        </li>
      </ul>
      <div class="chapter-content">
        <mavon-editor
          style="height: 100%"
          :ishljs="true"
          v-model="section.content"
          :defaultOpen="'preview'"
          :editable="false"
          :subfield="false"
          :toolbarsFlag="false"/>
      </div>
      <!-- 新建评论-->
      <div class="comment-header">
        <Icon type="ios-create-outline" />
        欢迎评论
      </div>
      <v-comment-create @updateComment="updateComment" target_type="column" :target_id="parseInt(sectionId)"/>
      <!-- 评论列表-->
      <div v-if="section && section.section_comment && section.section_comment.data.length > 0">
        <v-comment-list @updateComment="updateComment" :target_id="parseInt(sectionId)" target_type="column"/>
      </div>
    </article>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import VColumnChapter from '../../components/column-chapter'
  import VCommentList from '../../components/comment-list'
  import VCommentCreate from '../../components/comment-create'

  export default {
    components: {
      VColumnChapter,
      VCommentList,
      VCommentCreate
    },
    name: 'chapterSection',
    computed: {
      ...mapState({
        section: state => state['chapter-section'].section
      })
    },
    data() {
      return {
        content: '呢绒',
        sectionId: this.$route.query.sectionId,
        columnId: this.$route.query.columnId,
        chapter: [],
        columnTitle: ''
      }
    },
    created() {
      this.fetchData()
      this.getSection()
    },
    methods: {
      ...mapActions({
        getColumnChapter: 'column-chapter/list',
        getSectionDetail: 'chapter-section/detail'
      }),
      // 获取数据
      async fetchData() {
        const r = await this.getColumnChapter({
          column_id: this.columnId
        })
        this.columnTitle = r.data.data.title
        this.chapter = r.data.data.chapter_list
      },
      // 获取专栏文章详情
      async getSection(id) {
        const r = await this.getSectionDetail({
          id: id || this.sectionId
        })
        this.$store.commit('comment/SET_COMMENT_LIST', r.data.data.section_comment.data)
        this.$store.commit('comment/SET_COMMENT_PAGE', r.data.data.section_comment.meta)
      },
      // 更新评论
      updateComment() {
        this.getSection()
      }
    }
  }
</script>

<style scoped lang="less">
  .chapter-detail {
    position: relative;
    width: @window-Width;
    overflow: hidden;
    margin: 24px;
    left: 20%;
    height: 100%;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 32px;
    background: #fff;
  }

  .chapter-table {
    position: fixed;
    height: 100%;
    width: 20%;
    top: 120px;
    left: 0;
    overflow: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 24px;
    border-radius: 0 6px 6px 0;
    background: #fff;
  }

  .chapter-table-title {
    color: #17233d;
    font-size: 24px;
    padding-bottom: 24px;
    font-weight: 500;
    border-bottom: 1px solid #f0f0f0;
  }

  .chapter-container {
    flex: 1;
    background: #fff;
  }

  .chapter-box {
    width: 350px;
    margin-right: 32px;
  }

  .chapter-icon {
    position: fixed;
    left: 0;
    top: 120px;
    background: transparent;
  }

  .chapter-title {
    color: #17233d;
    text-align: center;
    font-size: 40px;
    font-weight: 500;
    margin-top: 16px;
  }

  .chapter-intro {
    color: #515a6e;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0;
  }

  .chapter-intro li {
    display: inline-block;
    margin-right: 24px;
    font-size: 16px;
    color: #9ea7b4;
    white-space: nowrap;
  }

  .comment-header {
    font-size: 28px;
    font-weight: 500;
    color: #2d8cf0;
    padding: 32px 0 16px;
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .chapter-detail {
      position: relative;
      width: 100%;
      overflow: hidden;
      margin: 24px 0;
      left: 0;
      height: 100%;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 32px;
      background: #fff;
    }

    .chapter-table {
      display: none;
      position: fixed;
      height: 100%;
      width: 20%;
      top: 120px;
      left: 0;
      overflow: hidden;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 24px;
      border-radius: 0 6px 6px 0;
      background: #fff;
    }
  }
</style>
