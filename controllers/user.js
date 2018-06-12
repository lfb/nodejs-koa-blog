const userModel = require('../modules/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const bcrypt = require('bcryptjs');
const util = require('util')
const verify = util.promisify(jwt.verify)
const statusCode = require('../util/status-code')

class UserController {
    /**
     * 创建用户
     * @param ctx
     * @returns {Promise<void>}
     */
    static async create(ctx) {
        const user = ctx.request.body;

        if (user.username && user.password) {
            // 查询用户名是否重复
            const existUser = await userModel.findUserByName(user.username)

            if (existUser) {
                // 反馈存在用户名
                ctx.response.status = 403;
                ctx.body = statusCode.ERROR_403('用户已经存在')
            } else {

                // 加密密码
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(user.password, salt);
                user.password = hash;

                // 创建用户
                await userModel.create(user);
                const newUser = await userModel.findUserByName(user.username)

                // 签发token
                const userToken = {
                    username: newUser.username,
                    id: newUser.id
                }

                // 储存token失效有效期1小时
                const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'});

                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('创建用户成功', token)
            }
        } else {

            // 参数错误
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('创建失败，参数错误');
        }
    }

    /**
     * 查询用户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getUserInfo(ctx) {
        // 获取jwt
        const token = ctx.header.authorization;

        if (token) {
            let payload
            try {
                // 解密payload，获取用户名和ID
                payload = await verify(token.split(' ')[1], secret.sign)

                const user = {
                    id: payload.id,
                    username: payload.username,
                }

                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('查询成功', user)
            } catch (err) {

                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412('查询失败，authorization error!')
            }
        }
    }

    /**
     * 删除用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        let id = ctx.params.id;

        if (id && !isNaN(id)) {
            await userModel.delete(id);

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('删除用户成功')
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('用户ID必须传')
        }
    }

    /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async login(ctx) {
        const data = ctx.request.body
        // 查询用户
        const user = await userModel.findUserByName(data.username)
        // 判断用户是否存在
        if (user) {
            // 判断前端传递的用户密码是否与数据库密码一致
            if (bcrypt.compareSync(data.password, user.password)) {
                // 用户token
                const userToken = {
                    username: user.username,
                    id: user.id
                }
                // 签发token
                const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'})

                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('登录成功', {
                    id: user.id,
                    username: user.username,
                    token: token
                })
            } else {

                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412('用户名或密码错误');
            }
        } else {

            ctx.response.status = 403;
            ctx.body = statusCode.ERROR_403('用户不存在');
        }
    }

    /**
     * 获取用户列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getUserList(ctx) {
        let userList = ctx.request.body;

        if (userList) {
            const data = await userModel.findAllUserList();

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('查询成功', data)
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('获取失败')

        }
    }
}

module.exports = UserController