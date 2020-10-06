import fetch from './fetch'

export default {
  // 新增评论
  create(params) {
    return fetch.post('/reply', params)
  }
}
