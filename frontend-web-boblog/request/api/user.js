import { GET, POST } from '../http.js'
import user from '../urls/user'

export function login(data) {
  return POST({
    url: user.login,
    data
  })
}

export function register(data) {
  return POST({
    url: user.register,
    data
  })
}

export function info(data) {
  return GET({
    url: user.auth,
    data
  })
}
