<template>
  <div>
    <div v-if="isClear" class="clear-refresh">
      <a href="/">清空搜索条件</a>
    </div>
    <div v-if="article" class="article">
      <div
        v-for="item in article.data"
        :key="item.id"
        class="article-item"
        @click="jumpURL(item.id)"
      >
        <div class="article-image">
          <img :src="item.img_url" :alt="item.title" />
        </div>
        <div class="article-intro">
          <h1 class="article-title">
            {{ item.title }}
          </h1>
          <div class="article-create">
            {{ item.created_at }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoad" class="more" @click="loadMore">
      <div class="more-text">点击加载更多</div>
      <div class="more-arrow">
        <img src="https://cdn.boblog.com/arrow.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getArticleList } from '@/request/api/article'

export default {
  async asyncData(context) {
    // eslint-disable-next-line camelcase
    const { id, keyword, category_id, page = 1 } = context.query

    const [err, res] = await getArticleList({
      id,
      category_id,
      keyword,
      page,
      is_category: 1,
      is_admin: 1,
    })

    if (!err) {
      const isLoad = res.data.data.meta.total_pages > page
      return {
        isClear: !!keyword,
        page,
        isLoad,
        categoryId: category_id,
        article: res.data.data,
      }
    }
  },
  async fetch({ store }) {
    await store.dispatch('category/getCategoryData')
  },
  head() {
    return {
      title: '波波博客 - boblog.com - 技术博客',
      meta: [
        {
          name: 'keywords',
          content:
            '波波,博客,波波博客,梁凤波,bo,blog,boblog,前端开发工程师,前端性能优化,JavaScript,css,html',
        },
        {
          name: 'description',
          content: '波波博客 - BoBlog.com，专注于前端开发技术，前端性能优化！',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.category.categoryList,
    }),
    // 是否为空数据
    isEmptyData() {
      return (
        this.article &&
        Array.isArray(this.article.data) &&
        this.article.data.length === 0
      )
    },
  },
  methods: {
    // 获取新数据
    async fetchData(id) {
      const [err, res] = await getArticleList({
        category_id: id,
        is_category: 1,
        is_admin: 1,
        page: this.page,
      })
      if (!err) {
        this.categoryId = id
        this.article.push(...res.data.data)
        this.isLoad = res.data.data.meta.total_pages > this.page
      }
    },
    // 加载更多分页
    loadMore() {
      this.page++
      this.fetchData()
    },
    // 跳转URL
    jumpURL(id) {
      this.$router.push('/article?id=' + id)
    },
  },
}
</script>

<style scoped lang="scss">
.clear-refresh {
  margin-top: 16px;
  text-align: center;
}
.article {
  box-sizing: border-box;
  width: 1280px;
  margin: 32px auto;
  display: flex;
  flex-wrap: wrap;
}

.article-item {
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
  display: inline-block;
  margin-right: 40px;
  margin-bottom: 40px;
  width: 400px;
  height: 280px;
  background: #ffffff;
  box-shadow: 2px 4px 24px 0 rgba(0, 0, 0, 0.06);
}
.article-item:nth-child(3n) {
  margin-right: 0;
}

.article-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.article-image img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.article-intro {
  box-sizing: border-box;
  padding: 16px;
}
.article-title {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  height: 22px;
  font-size: 16px;
  font-weight: 400;
  color: #222222;
  line-height: 22px;
}
.article-create {
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
  margin-top: 8px;
}

.more {
  cursor: pointer;
  width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.more-text {
  font-size: 16px;
  font-weight: 400;
  color: #222222;
  line-height: 22px;
}
.more-arrow {
  width: 16px;
  margin-top: 24px;
}
.more-arrow img {
  width: 100%;
}
</style>
