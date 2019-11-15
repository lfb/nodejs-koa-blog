<template>
  <section>
    <div class="column-chapter" v-if="chapter.length > 0">
      <dl v-for="(item, index) in chapter" :key="index">
        <dt>
          <Icon type="md-list" />
          第 {{index + 1}} 章：{{item.title}}
        </dt>
        <div v-if="item.chapter_section">
          <dd v-for="(section, index2) in item.chapter_section"
              :key="index2"
              @click="toChapterSection(section.id)">
            <h1>
              <Icon type="md-git-commit" />
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
      },
      columnId: {
        type: String,
        default() {
          return '0'
        }
      }
    },
    name: 'ChapterDirectory',
    data() {
      return {
        isButton: false,
        list: [],
        id: -1
      }
    },
    methods: {
      toChapterSection(id) {
        this.$router.push(`/chapter/section?columnId=${this.columnId}&sectionId=${id}`)
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
  }
</style>
