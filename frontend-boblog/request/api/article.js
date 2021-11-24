import { GET } from '../http.js'
import article from '../urls/article'

// 获取文章详情
export function getArticleDetail(params) {
  return GET({
    url: article.detail + '/' + params.id,
    params
  })
}

// 获取文章列表
export function getArticleList(params) {
  return GET({
    url: article.list,
    params
  })
}
