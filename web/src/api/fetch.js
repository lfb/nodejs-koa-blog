import Util from '../libs/util'
import qs from 'qs'
import Vue from 'vue'
import store from '../store/index'

Util.ajax.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
};

Util.ajax.interceptors.request.use(config => {
  /**
   * 在这里做loading ...
   * @type {string}
   */
  if (config.isLoading) {
    // 开启loading
    store.dispatch('loading/openLoading')
  }

  // 获取token
  return config

}, error => {
  return Promise.reject(error)

});

Util.ajax.interceptors.response.use(response => {

  // 关闭loading
  closeLoading()

  return response;

}, error => {

  if (error.response.status === 403) {
    store.commit('user/SET_USER_INFO', null);
    Vue.ls.remove('BOBLOG_FE_TOKEN');

    if (error.response.data.request !== 'GET /v1/user/info') {
      store.commit('user/SHOW_USER_MANAGER_MODEL', true);
    }
  }

  let errMsg = error.response.data.msg;

  Vue.prototype.$message({
    message: errMsg,
    type: 'error'
  });

  // 关闭loading
  closeLoading()
  return Promise.reject(error)

});

export default {
  post(url, params = {}) {
    const {username} = params;
    const {isLoading = true} = params;

    return Util.ajax({
      method: 'post',
      url: url,
      data: qs.stringify(params),
      timeout: 30000,
      auth: {
        username
      },
      isLoading,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },

  get(url, params = {}) {
    const {username} = params;
    const {isLoading = true} = params;

    return Util.ajax({
      method: 'get',
      url: url,
      params,
      auth: {
        username
      },
      isLoading
    })
  },

  delete(url, params = {}) {
    let {isLoading = true} = params;
    return Util.ajax({
      method: 'delete',
      url: url,
      params,
      isLoading
    })
  },

  put(url, params = {}) {
    let {isLoading = true} = params;
    return Util.ajax({
      method: 'put',
      url: url,
      data: qs.stringify(params),
      isLoading,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  }
}

/**
 * 关闭loading
 */
function closeLoading() {
  // 延迟100毫秒关闭
  setTimeout(() => {
    // 关闭loading
    store.dispatch('loading/closeLoading')
  }, 100)
}
