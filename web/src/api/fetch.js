import qs from 'qs'
import Vue from 'vue'
import utils from '../lib/utils'
import store from '../store/index'

utils.ajax.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
}

utils.ajax.interceptors.request.use((config) => {
  const isLoading = config.isLoading || config.isLoading === undefined
  if (isLoading) {
    // 开启loading
    store.dispatch('loading/openLoading')
  }

  // 获取token
  config.headers.common.Authorization = `Bearer ${Vue.ls.get('WATCH_CHECK_TOKEN')}`
  return config
}, error => Promise.reject(error))

utils.ajax.interceptors.response.use((response) => {
  // 如果后端有新的token则重新缓存
  const newToken = response.headers['new-token']
  if (newToken) {
    Vue.ls.set('WATCH_CHECK_TOKEN', newToken)
  }
  // 关闭loading
  closeLoading()

  return response
}, (error) => {
  const res = error.response
  let extraErrors = []

  if (res && res.config && res.config.extraErrors) {
    extraErrors = res.config.extraErrors
  } else if (res & res.config && res.config.params && res.config.params.extraErrors) {
    extraErrors = res.config.params.extraErrors
  }

  const { code } = res ? res.data : {}

  // 错误代码如果不在'需要单独处理的错误代码数组'内的话
  if (extraErrors.indexOf(code) === -1) {
    switch (code) {
      case 401:
        Vue.ls.set('WATCH_CHECK_TOKEN', null)
        window.location.href = `${process.env.VUE_APP_BASE_API}/wechat-server/code?target_url=${encodeURIComponent(document.URL)}`
        break

      case 404:
        console.log('查询信息不存在')
        break

      case 413:
        console.log(res.data.message)
        break

      case 418:
        console.log(res.data.message)
        break

      case 422:
        if (res.data.errors) {
          let arr = []
          for (const key in res.data.errors) {
            res.data.errors[key].forEach((item) => {
              arr.push(item)
            })
          }
          const errors = arr.length > 0 ? arr.join('，') : arr
          console.log(errors)
        } else {
          console.log(res.data.message)
        }
        break

      case 500:
        console.log(res.data.message || '服务器开了一会小差~', 'error')
        break

      default:
        console.log(res.data.message)
    }
  }

  // 关闭loading
  closeLoading()

  return Promise.reject(error)
})

export default {
  post (url, params = {}) {
    const { isLoading = true, extraErrors = [] } = params

    return utils.ajax({
      method: 'post',
      url,
      data: qs.stringify(params),
      timeout: 30000,
      isLoading,
      extraErrors,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },

  get (url, params = {}) {
    const { isLoading = true, extraErrors = [] } = params
    return utils.ajax({
      method: 'get',
      url,
      params,
      paramsSerializer: query => qs.stringify(query),
      isLoading,
      extraErrors
    })
  },

  delete (url, params = {}) {
    const { isLoading = true, extraErrors = [] } = params
    return utils.ajax({
      method: 'delete',
      url,
      params,
      isLoading,
      extraErrors
    })
  },
  put (url, params = {}) {
    const { isLoading = true, extraErrors = [] } = params
    return utils.ajax({
      method: 'put',
      url,
      data: qs.stringify(params),
      isLoading,
      extraErrors,
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
function closeLoading () {
  // 延迟100毫秒关闭
  setTimeout(() => {
    // 关闭loading
    store.dispatch('loading/closeLoading')
  }, 100)
}
