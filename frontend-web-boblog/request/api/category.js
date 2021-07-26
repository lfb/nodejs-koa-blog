import { GET } from '../http.js'
import category from '../urls/category'

// 获取分类列表信息
export function getCategory(params) {
  return GET({
    url: category.list,
    params
  })
}
