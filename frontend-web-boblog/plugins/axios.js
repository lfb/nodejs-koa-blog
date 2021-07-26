import Vue from 'vue'
import { removeToken, encodeToken } from "@/lib/auth";

export default ({ $axios, store }) => {
  $axios.onRequest(config => {
    config.baseURL = process.env.BASE_URL
    config.headers.Authorization = encodeToken()
  })

  $axios.onResponse(res => {
    if (res.status === 200 && res.data.code === 200) {
      return res
    } else {
      Vue.prototype.$message.error(res.data.msg || '获取失败')
      return Promise.reject(res)
    }
  })

  $axios.onError(err => {
    const { response } = err

    // 处理token过期无效情况，清除token，初始化store数据
    if ([401, 403].includes(response.status)) {
      removeToken()
      store.commit('user/SET_LOGIN_STATUS', false)
      store.commit('user/SET_USERINFO', null)
    }

    const msg = Array.isArray(response.data.msg) ? response.data.msg.join(',') : response.data.msg
    Vue.prototype.$message.error(msg || '获取失败')
    return Promise.reject(err)
  })
}
