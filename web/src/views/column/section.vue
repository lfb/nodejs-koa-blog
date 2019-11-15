<template>
  <section class="chapter-detail">
    <div class="chapter-table" v-if="chapter.length > 0">
      <h1 class="chapter-table-title">
        {{columnTitle}}
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
      <v-comment-create @updateComment="updateComment" target_type="column" :target_id="parseInt(sectionId)"/>
      <!-- 评论列表-->
      <div v-if="comment">
        <v-comment-list :comment="comment"/>
      </div>
    </article>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import VColumnChapter from '../../components/column-chapter'
  import VCommentList from '../../components/comment-list'
  import VCommentCreate from '../../components/comment-create'

  export default {
    components: {
      mavonEditor,
      VColumnChapter,
      VCommentList,
      VCommentCreate
    },
    name: 'chapterSection',
    computed: {
      ...mapState({
        section: state => state['chapter-section'].section,
        comment: state => state['chapter-section'].comment
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
        await this.getSectionDetail({
          id: id || this.sectionId
        })
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
    font-size: 36px;
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
</style>
