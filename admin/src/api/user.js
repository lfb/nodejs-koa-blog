import fetch from './fetch'

export default {
  // 登录
  login(params) {
    return fetch.post('/user/login', params);
  },

  // 注册
  register(params) {
    return fetch.post('/user/register', params);
  },

  info() {
    return fetch.get('/user/info');
  },

  // 列表
  list(params) {
    return fetch.get('/user/list', params);
  },

  // 删除
  delete(id) {
    return fetch.delete('/user/delete/' + id);
  }

}
