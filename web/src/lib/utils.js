import axios from 'axios'

const util = {}

const ajaxUrl = process.env.VUE_APP_BASE_API

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
})

util.api = ajaxUrl
util.oauthUrl = ajaxUrl

export default util
