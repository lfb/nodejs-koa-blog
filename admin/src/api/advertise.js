import fetch from './fetch';

export default {
  // 获取广告列表
  list(params) {
    return fetch.get('/advertise', params)
  },

  // 更新广告
  update(params) {
    const {id} = params;
    delete params.id;
    return fetch.put('/advertise/' + id, params)
  },

  // 删除广告
  destroy(id) {
    return fetch.delete('/advertise/' + id)
  },

  // 广告详情
  detail(params) {
    const {id} = params;
    delete params.id;
    return fetch.get('/advertise/' + id, params);
  },

  // 创建广告
  create(params) {
    return fetch.post('/advertise', params);
  }
}
