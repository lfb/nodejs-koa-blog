import fetch from './fetch'

export default {

  // 上传token
  uploadToken() {
    return fetch.get('/upload/token')
  }
}
