<template>
  <div class="category">
    <div class="search">
      <el-form
        ref="searchForm"
        v-loading="listLoading"
        :model="searchForm"
        inline
      >
        <el-form-item label="文章ID" prop="id">
          <el-input
            v-model.trim="searchForm.id"
            placeholder="文章ID"
            class="input"
            clearable
          />
        </el-form-item>

        <el-form-item label="文章状态：" prop="status">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option label="隐藏" value="0" />
            <el-option label="正常" value="1" />
          </el-select>
        </el-form-item>

        <el-form-item label="分类" prop="category_id">
          <el-select v-model="searchForm.category_id" placeholder="请选择分类">
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model.trim="searchForm.title"
            placeholder="文章名称"
            class="input"
            clearable
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="medium" @click="searchData">
            搜索
          </el-button>
          <el-button type="primary" size="medium" @click="resetSearchData">
            重置
          </el-button>
          <el-button type="primary" size="medium" @click="create">
            新增文章
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="ID" width="80" align="center">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="文章标题" width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="文章图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img_url" width="80" height="80" alt="">
          </template>
        </el-table-column>
        <el-table-column label="作者" width="80" align="center">
          <template slot-scope="scope">
            {{ scope.row.admin_info.nickname }}
          </template>
        </el-table-column>
        <el-table-column label="分类" align="center">
          <template slot-scope="scope">
            {{ scope.row.category_info.name }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.created_at }}
          </template>
        </el-table-column>
        <el-table-column label="文章描述" align="center">
          <template slot-scope="scope">
            {{ scope.row.description }}
          </template>
        </el-table-column>
        <el-table-column label="文章喜欢数量" align="center">
          <template slot-scope="scope">
            {{ scope.row.favorite_num }}
          </template>
        </el-table-column>
        <el-table-column label="文章SEO关键字" align="center">
          <template slot-scope="scope">
            {{ scope.row.seo_keyword }}
          </template>
        </el-table-column>

        <el-table-column label="排序" align="center">
          <template slot-scope="scope">
            {{ scope.row.sort_order }}
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{
              scope.row.status | statusFilterText
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="180" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row.id)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          :current-page.sync="searchForm.page"
          layout="total, prev, pager, next"
          :total="count"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { list, detele } from '@/api/article'
import { list as getCategoryList } from '@/api/category'

export default {
  name: 'ArticleList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'success'
      }
      return statusMap[status]
    },
    statusFilterText(status) {
      const statusMap = {
        0: '隐藏',
        1: '正常'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      categoryList: [],
      list: null,
      listLoading: true,
      count: 0,
      searchForm: {
        id: '',
        title: '',
        status: '',
        page: 1,
        category_id: ''
      }
    }
  },
  mounted() {
    this.getArticleList()
    this.getCategoryList()
  },
  methods: {
    create() {
      this.$router.push('/article/create')
    },
    // 获取分类列表
    async getCategoryList() {
      try {
        this.listLoading = true
        const res = await getCategoryList()
        this.categoryList = res.data.data
      } catch (err) {
        console.log(err)
      } finally {
        this.listLoading = false
      }
    },
    // 获取文章列表
    async getArticleList() {
      try {
        this.listLoading = true
        const res = await list(this.searchForm)
        this.list = res.data.data
        this.count = res.data.meta.count
      } catch (err) {
        console.log(err)
      } finally {
        this.listLoading = false
      }
    },
    // 文章编辑
    handleEdit(id) {
      this.$router.push('/article/edit?id=' + id)
    },
    // 删除文章
    handleDelete(id) {
      try {
        this.$msgbox
          .confirm('确定需要删除这个文章吗', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'error'
          })
          .then(async() => {
            const r = await detele({ id })
            this.$message.success(r.msg)
            await this.getArticleList()
          })
      } catch (err) {
        this.$message.error(err)
      }
    },
    // 搜索
    searchData() {
      this.searchForm.page = 1
      this.getArticleList()
    },
    // 点击页码
    handleCurrentChange(page) {
      this.searchForm.page = page
      this.getArticleList()
    },
    // 重置表单
    resetSearchData() {
      this.$refs['searchForm'].resetFields()
      this.getArticleList()
    }
  }
}
</script>

<style scoped lang="scss">
.category {
  box-sizing: border-box;
  margin: 24px;
}
.search {
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
}
.pagination {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}
</style>
