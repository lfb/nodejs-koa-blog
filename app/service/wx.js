const util = require('util')
const axios = require('axios/index')

const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')

class WXManager {
    static async codeToToken(code) {
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)

        const result = await axios.get(url)

        if (result.status !== 200) {
            throw new global.errs.AuthFailed("openid获取失败")
        }

        const errCode = result.data.errcode
        const errMsg = result.data.errmsg
        if (errCode) {
            throw new global.errs.AuthFailed("openid获取失败: " + errMsg)
        }

        // 判断数据库是否存在微信用户 openId
        let user = await User.getUserByOpenid(result.data.openid)

        // 如果不存在，就创建一个微信小程序用户
        if (!user) {
            user = await User.createUserByOpenid(result.data.openid)
        }

        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WXManager
}