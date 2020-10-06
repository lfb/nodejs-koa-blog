import fetch from './fetch'

export default {
  // 获取广告列表
  list(params) {
    return fetch.get('/advertise', params)
  }
}
