import fetch from './fetch';

export default {
  // 获取文章列表
  list(params) {
    return fetch.get('/article/list', params)
  },

  // 获取文章详情信息
  detail(id) {
    return fetch.get('/article/detail/' + id);
  },

  // 搜索文章
  search(params) {
    return fetch.get('/article/search', params)
  },

  // 新建文章
  create(params) {
    return fetch.post('/article/create', params);
  },

  // 删除文章
  delete(id) {
    return fetch.delete('/article/delete/' + id);
  },

  // 更新文章
  update(params) {
    return fetch.put('/article/update/' + params.id, params);
  }
}
