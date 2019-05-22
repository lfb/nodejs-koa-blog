import fetch from './fetch';

export default {
  // 登录
  login(params) {
    return fetch.get('/user/login', params)
  },

  // 注册
  register(params) {
    return fetch.get('/user/register', params);
  },

  // 用户信息
  info() {
    return fetch.get('/user/info')
  }
}
