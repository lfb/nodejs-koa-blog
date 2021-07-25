import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { encodeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = encodeToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log('interceptors') // for debug
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const { response } = error
    if (response) {
      if ([401, 403].includes(response.status)) {
        MessageBox.confirm('您已退出，您可以取消停留在此页面，或重新登录', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          store.dispatch('admin/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        Message(Array.isArray(response.data.msg) ? response.data.msg.join('') : response.data.msg)
      }
    }
    return Promise.reject(error)
  }
)

export default service
