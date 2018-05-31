const userModel = require('../modules/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const bcrypt = require('bcryptjs');

class UserController {

    /**
     * 创建用户
     * @param ctx
     * @returns {Promise<void>}
     */
    static async createUser(ctx) {
        const user = ctx.request.body;

        user.username = ctx.query.username;
        user.password = ctx.query.password;

        if (user.username && user.password) {
            const existUser = await userModel.findUserByName(user.username)
            if (existUser) {
                ctx.body = {
                    code: 412,
                    message: '用户已经存在'
                }
            } else {
                const salt = bcrypt.genSaltSync();
                // 加密密码
                const hash = bcrypt.hashSync(user.password, salt);
                user.password = hash;
                await userModel.createUser(user);
                const newUser = await userModel.findUserByName(user.username)

                // 签发token
                const userToken = {
                    username: newUser.username,
                    id: newUser.id
                }

                const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'});

                ctx.body = {
                    code: 200,
                    message: '创建成功',
                    bean: {
                        token
                    }
                }
            }
        } else {
            ctx.body = {
                code: 412,
                message: '参数错误'
            }
        }
    }


    /**
     * 获取用户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getUserName(ctx) {
        let username = ctx.params.username;

        if (username) {
            const data = await userModel.findUserByName(username)
            ctx.body = {
                code: 200,
                data: {
                    data
                },
                message: '查询成功'
            }
        } else {
            ctx.body = {
                code: -1,
                message: '用户名必须传'
            }
        }
    }

    /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async postLogin(ctx) {
        const data = ctx.request.body

        data.username = ctx.query.username;
        data.password = ctx.query.password;

        const user = await userModel.findUserByName(data.username)  // 查询用户
        // 判断用户是否存在
        if (user) {
            // 判断前端传递的用户密码是否与数据库密码一致
            if (bcrypt.compareSync(data.password, user.password)) {
                // 用户token
                const userToken = {
                    username: user.username,
                    id: user.id
                }
                const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'})  // 签发token
                ctx.body = {
                    message: '登录成功！',
                    data: {
                        id: user.id,
                        username: user.username,
                        token: token
                    },
                    code: 200
                }
            } else {
                ctx.body = {
                    code: -1,
                    message: '用户名或密码错误'
                }
            }
        } else {
            ctx.body = {
                code: -1,
                message: '用户名不存在'
            }
        }
    }
}

module.exports = UserController