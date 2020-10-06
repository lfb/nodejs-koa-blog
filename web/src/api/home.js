import fetch from './fetch'

export default {
  // 首页的文章和专栏
  data(params) {
    return fetch.get('/home', params)
  }
}
