<template>
  <div>
    <Header :is-category="false" @fetchData="fetchData" />

    <div class="container">
      <div class="article">
        <div v-if="isEmptyData" class="empty-data">
          数据为空
          <a href="/">刷新</a>
        </div>
        <ul v-if="article" class="article-box">
          <li v-for="item in article.data" :key="item.id" class="article-list">
            <a :href="'/article/detail?id=' + item.id" class="article-item">
              <div class="article-content">
                <h1 class="article-title">
                  {{ item.title }}
                </h1>
                <div class="article-description">
                  {{ item.description }}
                </div>

                <div class="introduction">
                  <div class="article-category">
                    {{ item.category_info.name }}
                  </div>
                  <div class="article-date">
                    {{ item.created_at }}
                  </div>
                </div>
              </div>

              <div class="article-image">
                <img :src="item.img_url" alt="title" />
              </div>
            </a>
          </li>
        </ul>
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

      <div class="sidebar">
        <div class="category">
          <div class="category-title">CATEGORY LIST</div>
          <ul v-if="Array.isArray(categoryList)" class="category-list">
            <li
              v-for="item in categoryList"
              :key="item.id"
              :class="[
                'category-item',
                { 'category-item-active': categoryId === item.id },
              ]"
              @click="fetchData(item.id)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getArticleList } from '@/request/api/article'
import { mapState } from 'vuex'

export default {
  components: {
    Header,
    Footer,
  },
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
      return {
        page,
        count: res.data.data.meta.count,
        categoryId: category_id,
        article: res.data.data
      }
    }
  },
  head() {
    return {
      title: '波波博客 - boblog.com - 技术博客',
      meta: [
        { name: 'keywords', content: '波波,博客,波波博客,梁凤波,bo,blog,boblog,前端开发工程师,前端性能优化,JavaScript,css,html' },
        { name: 'description', content: '波波博客 - BoBlog.com，专注于前端开发技术，前端性能优化！' }
      ]
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
  async fetch({ store }) {
    await store.dispatch('category/getCategoryData')
  },
  methods: {
    async fetchData(id) {
      const [err, res] = await getArticleList({
        category_id: id,
        is_category: 1,
        is_admin: 1,
        page: this.page
      })
      if (!err) {
        this.categoryId = id
        this.article = res.data.data
      }
    },
    // 点击数字
    async handleCurrentChange(page) {
      this.page = page
      await this.fetchData()
      this.$scrollTo(0)
    }
  }
}
</script>

<style scoped lang="scss">
html,
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
a,
ul,
li {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

a {
  color: #0164da;
}

.container {
  box-sizing: border-box;
  width: 1024px;
  margin: 0 auto;
  display: flex;

  .article {
    flex: 1;
    padding-right: 24px;
    padding-top: 32px;
  }

  .sidebar {
    width: 280px;
    padding-left: 24px;
    padding-top: 32px;
    border-left: 1px solid #e6e6e6;
  }
}

.search-result {
  padding: 32px 0 24px;
  margin-bottom: 32px;
  font-size: 13px;
  color: #404040;
  border-bottom: 1px solid #e6e6e6;
}

.empty-data {
  text-align: center;
  padding: 24px 0;
  font-size: 13px;
  color: #989898;
}
.category {
  &-title {
    color: #757575;
    font-size: 13px;
    padding-bottom: 32px;
  }

  &-item {
    cursor: pointer;
    display: inline-block;
    padding: 8px 16px;
    font-size: 14px;
    color: #292929;
    margin-right: 8px;
    margin-bottom: 8px;
    border-radius: 100px;
    text-decoration: none;
    background-color: #f2f2f2;

    &-active {
      color: #2d8cf0;
      background: rgba(51, 119, 255, 0.1);
    }
  }
}

/*文章*/
.article-list {
  box-sizing: border-box;
  display: block;
  clear: both;
  margin-bottom: 48px;
}

.article-list:last-child {
  border: none;
}

.article-content {
  flex: 1;
}

.article-item {
  display: flex;
  height: 100%;
  width: 100%;
  text-decoration: none;
  -webkit-transition: background-color 0.35s, color 0.35s, margin 0.45s,
    -webkit-transform 0.5s;
  transition: background-color 0.35s, color 0.35s, margin 0.45s, transform 0.5s;
}

.article-image {
  width: 120px;
}

.article-image img {
  width: 100%;
  border-radius: 4px;
}

.article-title {
  font-weight: bold;
  font-size: 22px;
  color: #404040;
  line-height: 28px;
}

.article-description {
  font-size: 14px;
  color: #757575;
  margin: 4px 0 8px;
}

.introduction {
  .article-category {
    font-size: 14px;
    display: inline-block;
    padding: 2px 12px;
    border-radius: 100px;
    color: #2d8cf0;
    background: rgba(51, 119, 255, 0.1);
  }

  .article-date {
    display: inline-block;
    font-size: 14px;
    color: #757575;
    margin-left: 8px;
  }
}
</style>
