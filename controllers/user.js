const userModel = require('../modules/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const bcrypt = require('bcryptjs');
const util = require('util')
const verify = util.promisify(jwt.verify)


class UserController {

    /**
     * 查询用户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getUserInfo(ctx) {
        const token = ctx.header.authorization  // 获取jwt
        if (token) {
            let payload
            try {
                payload = await verify(token.split(' ')[1], secret.sign)  // 解密payload，获取用户名和ID
                const user = {
                    id: payload.id,
                    username: payload.username,
                }
                ctx.body = {
                    code: 200,
                    data: user,
                }
            } catch (err) {
                console.log('token verify fail: ', err)
            }
        }
    }

    /**
     * 删除用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async deleteUser(ctx) {
        let id = ctx.params.id;
        if (id && !isNaN(id)) {
            await userModel.deleteUser(id);
            ctx.body = {
                code: 200,
                message: '删除成功'
            }
        } else {
            ctx.body = {
                code: -1,
                message: '删除失败'
            }
        }
    }

    /**
     * 创建用户
     * @param ctx
     * @returns {Promise<void>}
     */
    static async createUser(ctx) {
        const user = ctx.request.body;

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
     * 检查用户名是否可以使用
     * @param cxt
     * @returns {Promise<void>}
     */
    static async checkUsername(ctx) {
        const username = ctx.query.username;
        if (username) {
            const existUser = await userModel.findUserByName(username)
            if (existUser) {
                ctx.body = {
                    code: 412,
                    message: '用户已经存在！'
                }
            } else {
                ctx.body = {
                    code: 200,
                    message: '用户可以使用！'
                }
            }
        }


    }

    /**
     * 获取用户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getUserName(ctx) {
        let username = ctx.query.username;
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
     * 获取用户列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getUserList(ctx) {
        let userList = ctx.request.body;
        let list = [];

        if (userList) {
            const data = await userModel.findAllUserList();
            let index = data.rows.findIndex(item => item.username === 'adin@admin.com');
            data.rows.splice(index, 1);

            for (let i = 0; i < data.rows.length; i++) {
                list.push({id: data.rows[i].id, username: data.rows[i].username})
            }


            ctx.body = {
                code: 200,
                data: list,
                message: '查询成功'
            }
        } else {
            ctx.body = {
                code: -1,
                message: '获取失败'
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