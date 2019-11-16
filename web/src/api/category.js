import fetch from './fetch'

export default {
  // 获取分类列表
  list(params) {
    return fetch.get('/category', params)
  }
}
