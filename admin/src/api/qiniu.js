import fetch from './fetch';

/**
 * qiniu -> 获取上传token
 */
export default {
	// 获取token
	getToken () {
		return fetch.get('/upload/token')
	},
}