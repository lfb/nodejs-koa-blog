<template>
  <section class="column">

    <article class="column-list">
      <!-- 专栏组件-->
      <v-column-item :isButton="isButton" :list="column"/>
      <div class="chapter">
        <v-chapter-directory :chapter="chapter" :columnId="id"/>
      </div>
    </article>

    <!-- 侧边栏 -->
    <v-main-sidebar/>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'
  import VColumnItem from '../../components/column-item'
  import VChapterDirectory from '../../components/chapter-directory'
  import VMainSidebar from '../../components/main-sidebar'

  export default {
    components: {
      VColumnItem,
      VChapterDirectory,
      VMainSidebar
    },
    name: 'list',
    data () {
      return {
        isButton: false,
        id: this.$route.query.id,
        column: [],
        chapter: [],
        columnId: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      ...mapActions({
        getColumnDetail: 'column/detail'
      }),
      async fetchData() {
        this.column = []
        const r = await this.getColumnDetail({
          id: this.id
        })
        this.column.push(r.data.data)
        this.chapter = r.data.data.column_chapter
      }
    }
  }
</script>

<style scoped lang="less">
  .column {
    width: @window-Width;
    display: flex;
    margin: 24px auto;
  }

  .column-list {
    flex: 1;
    margin-right: 32px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 1px 2px 3px #f0f0f0;
    background: #fff;
  }

  .chapter {
    padding: 24px;
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .column {
      width: 100%;
    }

    .column-list {
      margin-right: 0;
    }
  }
</style>
