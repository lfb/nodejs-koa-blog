import fetch from './fetch';

export default {
  // 登录
  login(params) {
    return fetch.post('/user/login', params)
  },

  // 注册
  register(params) {
    return fetch.post('/user/register', params);
  },

  // 用户信息
  info(params) {
    return fetch.get('/user/info', params)
  }
}
