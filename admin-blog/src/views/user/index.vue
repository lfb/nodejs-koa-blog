<template>
  <div class="category">
    <div class="search">
      <el-form
        ref="searchForm"
        v-loading="listLoading"
        :model="searchForm"
        inline
      >
        <el-form-item label="用户ID" prop="id">
          <el-input
            v-model.trim="searchForm.id"
            placeholder="用户ID"
            class="input"
            clearable
          />
        </el-form-item>

        <el-form-item label="用户状态：" prop="status">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option label="隐藏" value="0" />
            <el-option label="正常" value="1" />
          </el-select>
        </el-form-item>

        <el-form-item label="用户名称" prop="username">
          <el-input
            v-model.trim="searchForm.username"
            placeholder="用户名称"
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
        <el-table-column label="用户名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{
              scope.row.status | statusFilterText
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
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
import { getUserList, deleteUser } from '@/api/user'

export default {
  name: 'UserList',
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
        0: '禁用',
        1: '正常'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      count: 0,
      searchForm: {
        id: '',
        username: '',
        status: '',
        page: 1
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 获取用户信息
    async fetchData() {
      try {
        this.listLoading = true
        const res = await getUserList(this.searchForm)
        this.list = res.data.data
        this.count = res.data.meta.count
      } catch (err) {
        console.log(err)
      } finally {
        this.listLoading = false
      }
    },
    // 跳转编辑
    handleEdit(id) {
      this.$router.push('/user/edit?id=' + id)
    },
    // 删除用户
    handleDelete(id) {
      try {
        this.$msgbox
          .confirm('确定需要删除这个用户吗', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'error'
          })
          .then(async() => {
            const r = await deleteUser({ id })
            this.$message.success(r.msg)
            await this.fetchData()
          })
      } catch (err) {
        this.$message.error(err)
      }
    },
    // 搜索
    searchData() {
      this.searchForm.page = 1
      this.fetchData()
    },
    // 点击页面
    handleCurrentChange(page) {
      this.searchForm.page = page
      this.fetchData()
    },
    // 重置表单
    resetSearchData() {
      this.$refs['searchForm'].resetFields()
      this.fetchData()
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
