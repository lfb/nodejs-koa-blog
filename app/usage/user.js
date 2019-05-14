const {User} = require('../models/user')

class UserUsage {
    // 创建文章
    async create(cxt) {
        return await User.create(cxt)
    }
}

module.exports = {
    UserUsage
}
