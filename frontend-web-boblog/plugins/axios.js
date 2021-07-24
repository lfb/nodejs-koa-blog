import { Base64 } from 'js-base64'
import {getToken} from "@/lib/token";

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
  $axios.onResponse(response => {
    return response
  })
  $axios.onError(err => {
    return err
  })
}
