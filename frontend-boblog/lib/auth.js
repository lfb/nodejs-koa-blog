import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'
const BOBLOG_TOKEN = process.env.BOBLOG_TOKEN

export function encodeToken() {
  const token = getToken()
  const base64 = Base64.encode(token + ':')
  return 'Basic ' + base64
}

export function getToken() {
  return Cookies.get(BOBLOG_TOKEN)
}

export function setToken(token) {
  return Cookies.set(BOBLOG_TOKEN, token)
}

export function removeToken() {
  return Cookies.remove(BOBLOG_TOKEN)
}
