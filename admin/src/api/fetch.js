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
  if (config.shouldLoading) {
    // 开启loading
    // store.dispatch('loading/openLoading')
  }

  // 获取token
  config.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get("BOBLOG_ADMIN_TOKEN");
  return config

}, error => {
  return Promise.reject(error)

});

Util.ajax.interceptors.response.use(response => {

  /**
   * 在这里做loading 关闭
   */

  // 如果后端有新的token则重新缓存
  // let newToken = response.headers['new-token'];
  //
  // if (newToken) {
  //   Vue.ls.set("web-token", newToken);
  // }
  // 关闭loading
  // closeLoading()

  return response;

}, error => {
  let response = error.response;

  // 处理401错误
  if (response.status == 401) {
    Vue.ls.remove('BOBLOG_ADMIN_TOKEN');
    window.location.href = '/login';

  } else if (response.status == 403) {
    // 处理403错误


  } else if (response.status == 412) {
    // 处理412错误

  } else if (response.status == 413) {
    // 处理413权限不足

  }
  // 关闭loading
  closeLoading()

  return Promise.reject(response)

});

export default {
  post(url, params = {}) {

    return Util.ajax({
      method: 'post',
      url: url,
      data: qs.stringify(params),
      timeout: 30000,
      shouldLoading: params.shouldLoading === undefined ? true : params.shouldLoading,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },

  get(url, params = {}) {
    return Util.ajax({
      method: 'get',
      url: url,
      params,
      shouldLoading: params.shouldLoading === undefined ? true : params.shouldLoading,
    })
  },

  delete(url, params = {}) {
    return Util.ajax({
      method: 'delete',
      url: url,
      params,
      shouldLoading: params.shouldLoading === undefined ? true : params.shouldLoading,
    })
  },

  put(url, params = {}) {

    return Util.ajax({
      method: 'put',
      url: url,
      data: qs.stringify(params),
      shouldLoading: params.shouldLoading === undefined ? true : params.shouldLoading,
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
    // store.dispatch('loading/closeLoading')
  }, 100)
}
