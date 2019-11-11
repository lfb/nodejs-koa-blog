import fetch from './fetch'

export default {
  // 获取文章下的评论列表
  list(params) {
    const id = params.article_id
    delete params.article_id
    return fetch.get('/article/' + id + '/comments', params)
  },

  // 新增评论
  create(params) {
    return fetch.post('/comments', params)
  }
}
