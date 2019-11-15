import fetch from './fetch'

export default {
  // 专栏章节列表
  list(params) {
    const id = params.column_id
    delete params.column_id
    return fetch.get('/column/chapter-list/' + id, params)
  },
  // 专栏章节详情
  detail(params) {
    const id = params.id
    delete params.id
    return fetch.get('/column/chapter/' + id, params)
  }
}
