import fetch from './fetch'

export default {
  // 文章列表
  list(params) {
    return fetch.get('/article', params)
  },
  // 文章详情
  detail(params) {
    const id = params.id
    delete params.id
    return fetch.get('/article/' + id, params)
  }
}
