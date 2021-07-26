import { GET, POST } from '../http.js'
import user from '../urls/user'

// 用户登录
export function login(data) {
  return POST({
    url: user.login,
    data
  })
}

// 用户注册
export function register(data) {
  return POST({
    url: user.register,
    data
  })
}
// 用户信息
export function info(data) {
  return GET({
    url: user.auth,
    data
  })
}
