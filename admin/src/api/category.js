import fetch from './fetch';

export default {
  // 获取分类列表
  list(params) {
    return fetch.get('/category/list', params)
  },

  // 获取分类详情信息
  detail(id) {
    return fetch.get('/category/detail/' + id);
  },

  // 新建分类
  create(params) {
    return fetch.post('/category/create', params);
  },

  // 删除分类
  delete(id) {
    return fetch.delete('/category/delete/' + id);
  },

  // 更新分类
  update(params) {
    return fetch.put('/category/update/' + params.id, params);
  }
}
