import fetch from './fetch';

export default {
  // 获取分类列表
  list(params) {
    return fetch.get('/category', params)
  },

  // 更新分类
  update(params) {
    const {id} = params;
    delete params.id;
    return fetch.put('/category/' + id, params)
  },

  // 删除分类
  destroy(id) {
    return fetch.delete('/category/' + id)
  },

  // 分类详情
  detail(params) {
    const {id} = params;
    delete params.id;
    return fetch.get('/category/' + id, params);
  },

  // 创建分类
  create(params) {
    return fetch.post('/category', params);
  },

  // 查询分类ID下的所有文章列表
  article(params) {
    const {id} = params;
    delete params.id;

    return fetch.get('/category/' + id + '/article', params);
  }
}
