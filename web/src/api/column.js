import fetch from './fetch'

export default {
  // 专栏列表
  list(params) {
    return fetch.get('/column', params)
  },
  // 专栏详情
  detail(params) {
    const id = params.id
    delete params.id
    return fetch.get('/column/' + id, params)
  }
}
