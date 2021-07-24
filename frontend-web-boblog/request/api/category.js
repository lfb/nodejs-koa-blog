import { GET } from '../http.js'
import category from '../urls/category'

export function getCategory(params) {
  return GET({
    url: category.list,
    params
  })
}
