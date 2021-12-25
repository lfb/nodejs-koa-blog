<template>
  <div class="category">
    <div class="search">
      <el-form
        ref="searchForm"
        v-loading="listLoading"
        :model="searchForm"
        inline
      >
        <el-form-item label="回复ID" prop="id">
          <el-input
            v-model.trim="searchForm.id"
            placeholder="回复ID"
            class="input"
            clearable
          />
        </el-form-item>
        <el-form-item label="文章ID" prop="article_id">
          <el-input
            v-model.trim="searchForm.article_id"
            placeholder="文章ID"
            class="input"
            clearable
          />
        </el-form-item>

        <el-form-item label="回复状态：" prop="status">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option label="审核中" value="0" />
            <el-option label="审核通过" value="1" />
            <el-option label="审核不通过" value="2" />
          </el-select>
        </el-form-item>

        <el-form-item label="回复名称" prop="content">
          <el-input
            v-model.trim="searchForm.content"
            placeholder="回复内容"
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
        <el-table-column label="回复内容">
          <template slot-scope="scope">
            <div v-html="mdRender(scope.row.content)" />
          </template>
        </el-table-column>
        <el-table-column label="回复人信息" align="center">
          <template slot-scope="scope">
            {{ scope.row.user_info || "匿名" }}
          </template>
        </el-table-column>
        <el-table-column label="回复文章" align="center">
          <template slot-scope="scope">
            {{ scope.row.article && scope.row.article[0].id }} -
            {{ scope.row.article && scope.row.article[0].title }}
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
              @click="changeStatus(scope.row.id, 1)"
            >
              审核通过
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="changeStatus(scope.row.id, 2)"
            >
              审核不通过
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
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
import { list, detele, update } from '@/api/reply'

const hljs = require('highlight.js')
const md = require('markdown-it')({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, {
            language: lang,
            ignoreIllegals: true
          }).value +
          '</code></pre>'
        )
      } catch (__) {
        console.log(__)
      }
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    )
  }
})

export default {
  name: 'ReplyList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'success',
        2: 'warning'
      }
      return statusMap[status]
    },
    // 回复状态：0-审核中,1-审核通过,2-审核不通过
    statusFilterText(status) {
      const statusMap = {
        0: '待审核',
        1: '审核通过',
        2: '审核不通过'
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
        article_id: '',
        content: '',
        status: '',
        page: 1,
        is_user: 1,
        is_article: 1
      }
    }
  },
  mounted() {
    this.getReply()
  },
  methods: {
    // 获取回复列表
    async getReply() {
      try {
        this.listLoading = true
        const res = await list(this.searchForm)
        console.log(res)
        this.list = res.data.data
        this.count = res.data.meta.count
      } catch (err) {
        console.log(err)
      } finally {
        this.listLoading = false
      }
    },
    // 更新回复评论-审核状态
    async changeStatus(id, status) {
      await update({
        id: id,
        status
      })
      await this.getReply()
      this.$message.success('更新成功')
    },
    // 删除回复数据
    handleDelete(id) {
      try {
        this.$msgbox
          .confirm('确定需要删除这个回复吗', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'error'
          })
          .then(async() => {
            const r = await detele({ id })
            this.$message.success(r.msg)
            await this.getReply()
          })
      } catch (err) {
        this.$message.error(err)
      }
    },
    // Markdown语法解析
    mdRender(content) {
      return md.render(content)
    },
    // 搜索
    searchData() {
      this.searchForm.page = 1
      this.getReply()
    },
    // 点击页码
    handleCurrentChange(page) {
      this.searchForm.page = page
      this.getReply()
    },
    // 重置表单
    resetSearchData() {
      this.$refs['searchForm'].resetFields()
      this.getReply()
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
<style>
/*highlight.js*/
/*Syntax highlighting for the Web*/
pre {
  padding: 1em;
}
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  color: #abb2bf;
  background: #282c34;
}

.hljs-comment,
.hljs-quote {
  color: #5c6370;
  font-style: italic;
}

.hljs-doctag,
.hljs-formula,
.hljs-keyword {
  color: #c678dd;
}

.hljs-deletion,
.hljs-name,
.hljs-section,
.hljs-selector-tag,
.hljs-subst {
  color: #e06c75;
}

.hljs-literal {
  color: #56b6c2;
}

.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string,
.hljs-regexp,
.hljs-string {
  color: #98c379;
}

.hljs-attr,
.hljs-number,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-selector-pseudo,
.hljs-template-variable,
.hljs-type,
.hljs-variable {
  color: #d19a66;
}

.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-symbol,
.hljs-title {
  color: #61aeee;
}

.hljs-built_in,
.hljs-class .hljs-title,
.hljs-title.class_ {
  color: #e6c07b;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: 700;
}

.hljs-link {
  text-decoration: underline;
}
</style>
