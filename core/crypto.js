/**
 * @description: 主要是生成md5加密
 * @author: BobbyLiang
 * @date: 2024-08-15 22:37:00
 */

const crypto = require('crypto')

// 生成随机盐值
function generateSalt() {
    return crypto.randomBytes(16).toString('hex')
}

/**
 * 创建一个md5 加密
 * @param str
 * @returns {string}
 */
function createMD5Hash(str) {
    if (!str) return str

    const md5 = crypto.createHash('md5')
    const salt = generateSalt()

    return md5.update(str + salt).digest('hex')
}

module.exports = {
    createMD5Hash
}
