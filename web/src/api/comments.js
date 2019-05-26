import fetch from './fetch';

export default {
  // 获取文章下的评论列表
  list(id) {
    return fetch.get('/article/comments/' + id)
  },

  // 新增评论
  create(params) {
    return fetch.post('/comments', params);
  }
}
