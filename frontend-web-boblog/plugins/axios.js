import { Base64 } from 'js-base64'
import {getToken, removeToken} from "@/lib/token";
import Vue from 'vue'

export function encodeToken() {
  const token = getToken()
  const base64 = Base64.encode(token + ':')
  return 'Basic ' + base64
}

export default ({ $axios, redirect, store, app, env, error, $sentry, route }) => {
  $axios.onRequest(config => {
    config.baseURL = process.env.BASE_URL

    // 判断登录信息
    if(process.client) {
      config.headers.Authorization = encodeToken()
    }

  })
  $axios.onResponse(res => {
    if(res.status === 200 && res.data.code === 200) {
      return res
    }else {
      Vue.prototype.$message.error(res.data.msg || '获取失败')
      return Promise.reject(res)
    }
  })
  $axios.onError(err => {
    const { response } = err
    if([401, 403].includes(response.status)) {
      removeToken()
      store.commit('user/SET_LOGIN_STATUS', false)
      store.commit('user/SET_USERINFO', null)
    }

    const msg = Array.isArray(response.data.msg) ? response.data.msg.join(',') : response.data.msg
    Vue.prototype.$message.error( msg || '获取失败')
    return Promise.reject(err)
  })
}
