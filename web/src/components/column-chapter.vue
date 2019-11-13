<template>
  <section>
    <div class="column-chapter" v-if="chapter.length > 0">
      <dl v-for="(item, index) in chapter" :key="index">
        <dt>Chapter {{index + 1}}：{{item.title}}</dt>
        <div v-if="item.column_chapter_article">
          <dd v-for="(article, index2) in item.column_chapter_article"
              :key="index2"
              @click="getArticle(article.id)">
            <h1>{{article.title}}</h1>
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
    name: 'Chapter',
    data() {
      return {
        isButton: false,
        list: [],
        id: -1
      }
    },
    methods: {
      // 获取专栏文章详情
      getArticle(id) {
        if (this.id !== id) {
          this.id = id
          this.$emit('getArticle', id)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .column-chapter dt {
    font-size: 18px;
    font-weight: 500;
    color: #17233d;
    padding-top: 24px;
  }

  .column-chapter dd {
    padding: 16px;
    cursor: pointer;
    transition: 0.28s ease;
    color: #515a6e;
    display: flex;
    justify-content: space-between;

    &:hover {
      color: #2d8cf0;
      padding-left: 32px;
      box-shadow: 1px 2px 3px #f0f0f0;
    }

    & h1 {
      font-size: 16px;
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
