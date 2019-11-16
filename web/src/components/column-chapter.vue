<template>
  <section>
    <div class="column-chapter" v-if="chapter.length > 0">
      <dl v-for="(item, index) in chapter" :key="index">
        <dt>
          <Icon type="md-list"/>
          第 {{index + 1}} 章：{{item.title}}
        </dt>
        <div v-if="item.chapter_section">
          <dd v-for="(section, index2) in item.chapter_section"
              :key="index2"
              @click="getSection(section.id)">
            <h1>
              <Icon type="md-git-commit"/>
              {{section.title}}
            </h1>
            <span></span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      chapter: {
        type: Array,
        default() {
          return []
        }
      }
    },
    name: 'Chapter',
    data() {
      return {
        sectionIndex: 0
      }
    },
    methods: {
      // 获取专栏文章详情
      getSection(id) {
        window.scroll(0, 0)
        this.$store.commit('chapter-section/SET_COLUMN_CHAPTER_SECTION', null)
        this.$store.commit('comment/SET_COMMENT_LIST', [])
        this.$store.commit('comment/SET_COMMENT_PAGE', null)
        this.$emit('getSection', id)
      }
    }
  }
</script>

<style scoped lang="less">
  .column-chapter dt {
    font-size: 20px;
    font-weight: 500;
    color: #17233d;
    padding-top: 24px;
  }

  .column-chapter dd {
    padding: 24px;
    cursor: pointer;
    color: #515a6e;
    display: flex;
    font-size: 18px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;

    &:hover {
      color: #2d8cf0;
    }

    & h1 {
      font-size: 18px;
      font-weight: 400;
    }

    & span {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-top: 1px solid #D9D9D9;
      border-right: 1px solid #D9D9D9;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }

    &.active {
      color: #2d8cf0;
    }
  }
</style>
