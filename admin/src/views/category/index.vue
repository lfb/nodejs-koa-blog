<template>
  <div class="category">
    <el-button type="primary" @click="create">新增分类</el-button>
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
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">
            {{ scope.row.sort_order }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusFilterText }}</el-tag>
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
    </div>
  </div>
</template>

<script>
import { list, detele } from '@/api/category'
export default {
  name: 'CategoryList',
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
      list: null,
      listLoading: true
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    create() {
      this.$router.push('/category/create')
    },
    async getCategoryList() {
      try {
        this.listLoading = true
        const res = await list()
        this.list = res.data
      } catch (err) {
        console.log(err)
      } finally {
        this.listLoading = false
      }
    },
    handleEdit(id) {
      this.$router.push('/category/edit?id=' + id)
    },
    handleDelete(id) {
      try {
        this.$msgbox.confirm('确定需要删除这个分类吗', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'error'
        }).then(async() => {
          const r = await detele({ id })
          this.$message.success(r.msg)
          await this.getCategoryList()
        })
      } catch (err) {
        this.$message.error(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
