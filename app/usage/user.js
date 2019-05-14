const {User} = require('../models/user')

class UserModelUsage {
    // 创建文章
    async create(cxt) {
        return await User.create(cxt)
    }
}

module.exports = {
    UserModelUsage
}
