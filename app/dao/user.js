const {User: User} = require('../models/user')
const bcrypt = require('bcryptjs')

// data access object
class UserDao {
    // 创建用户
    static async createUser(v) {
        const hasUser = await User.findOne({
            where: {
                email: v.get('body.email'),
                delete_at: null
            }
        });

        if (hasUser) {
            throw new global.errs.Forbidden('用户已存在');
        }

        const user = new User();
        user.email = v.get('body.email');
        user.password = v.get('body.password2');
        user.nickname = v.get('body.nickname');

        user.save();
    }

    // 验证密码
    static async verifyEmailPassword(email, plainPassword) {

        // 查询用户是否存在
        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!user) {
            throw new global.errs.AuthFailed('账号不存在')
        }

        // 验证密码是否正确
        const correct = bcrypt.compareSync(plainPassword, user.password);

        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }

        return user
    }

    // 查询用户信息
    static async getUserInfo(id) {
        // 查询用户是否存在
        const user = await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: [
                    'password',
                    'delete_at'
                ]
            }
        })

        if (!user) {
            throw new global.errs.AuthFailed('账号不存在')
        }

        return user
    }

    // 查询是否存在 openid 的小程序用户
    static async getUserByOpenid(openid) {
        // 查询用户
        const user = await User.findOne({
            where: {
                openid
            }
        })

        return user;
    }

    // 注册小程用户
    static async createUserByOpenid(openid) {
        // 查询用户
        const user = await User.create({
            openid
        })

        return user;
    }
}

module.exports = {
    UserDao
}