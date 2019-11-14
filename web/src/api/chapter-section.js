import fetch from './fetch'

export default {
  // 专栏文章详情
  detail(params) {
    const id = params.id
    delete params.id
    return fetch.get('/chapter/section/' + id, params)
  }
}
