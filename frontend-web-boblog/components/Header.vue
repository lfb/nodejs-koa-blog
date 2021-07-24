<template>
  <div>
    <div class="header">
      <div class="header-inner">
        <a href="/" class="logo"></a>
        <div class="navigator-fix">
          <div class="navigator-box">
            <div class="navigator-inner">
              <form class="search-box" action="/">
                <input
                  name="keyword"
                  type="text"
                  class="search"
                  placeholder="搜索"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isCategory" class="category">
        <ul v-if="Array.isArray(categoryList)" class="category-box">
          <li v-for="item in categoryList" :key="item.id" class="category-item">
            <NuxtLink
              class="category-item-link"
              :to="'/?category_id=' + item.id"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  props: {
    isCategory: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.category.categoryList,
    }),
  },
}
</script>

<style scoped lang="scss">
.header {
  box-sizing: border-box;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
}

.header-inner {
  height: 64px;
  width: 1024px;
  margin: 0 auto;
}

.logo {
  position: relative;
  float: left;
  display: inline-block;
  box-sizing: border-box;
  width: 150px;
  height: 64px;
  background: url(https://cdn.boblog.com/boblog.png) -16px center no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  text-align: center;
}

.category {
  border-top: 1px solid #e6e6e6;

  &-box {
    padding: 0;
    display: flex;
    align-items: center;
    width: 1024px;
    margin: 0 auto;
    height: 54px;
  }

  &-item {
    &-link {
      margin-right: 24px;
      height: 54px;
      line-height: 54px;
      font-size: 13px;
      color: #757575;
      text-decoration: none;
      display: inline-block;
    }
  }
}

.navigator-fix {
  width: 100%;
  height: 64px;
  float: right;
  margin-left: -150px;
}

.navigator-box {
  height: 56px;
  padding-left: 150px;
}

.navigator-inner {
  text-align: right;
  height: 64px;
  clear: both;
}

.search-box {
  position: relative;
  height: 100%;
  width: 100%;
}

.search {
  box-sizing: border-box;
  width: 320px;
  padding: 0 12px;
  margin-top: 14px;
  height: 36px;
  line-height: 36px;
  color: #404040;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}
</style>
