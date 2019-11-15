import fetch from './fetch';

export default {
  // 获取专栏列表
  list(params) {
    return fetch.get('/column', params)
  },

  // 获取专栏详情
  detail(params) {
    const {id} = params;
    delete params.id;

    return fetch.get('/column/' + id, params);
  },

  // 更新专栏
  update(params) {
    const {id} = params;
    delete params.id;
    return fetch.put('/column/' + id, params)
  },

  // 删除专栏
  destroy(id) {
    return fetch.delete('/column/' + id)
  },

  // 创建专栏
  create(params) {
    return fetch.post('/column', params);
  }
}
