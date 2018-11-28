import fetch from './fetch';

export default {
  // 获取医生列表
  list(params) {
    return fetch.get('/doctor/list', params)
  },

  // 获取医生详情信息
  detail(id) {
    return fetch.post('/doctor/detail/' + id);
  },

}
