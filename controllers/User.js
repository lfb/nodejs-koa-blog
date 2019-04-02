const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const bcrypt = require('bcryptjs');
const util = require('util')
const verify = util.promisify(jwt.verify)

class User {
    /**
     * 创建用户
     * @param ctx username     用户名字
     * @param ctx password     用户密码
     * @param ctx email        用户邮箱
     * @param ctx roles_id     用户权限组 （未写）
     *
     * @returns 创建成功返回用户信息，失败返回错误信息
     */
    static async create(ctx) {
        let {username, password, email, roles_id = 0} = ctx.request.body;

        let params = {
            username,
            password,
            email
        }

        // 检测参数是否存在为空
        let errors = [];
        for (let item in params) {
            if (params[item] === undefined) {
                let index = errors.length + 1;
                errors.push("错误" + index + ": 参数: " + item + "不能为空")
            }
        }

        if (errors.length > 0) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: errors
            }
            return false;
        }

        params.roles_id = roles_id;
        // 查询用户名是否重复
        const existUser = await UserModel.findUserByName(params.username)

        if (existUser) {
            ctx.response.status = 403;
            ctx.body = {
                code: 403,
                message: "用户已经存在"
            }

        } else {

            try {
                // 加密密码
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(params.password, salt);
                params.password = hash;

                // 创建用户
                await UserModel.create(params);
                const newUser = await UserModel.username(params.username)

                // 签发token
                const userToken = {
                    username: newUser.username,
                    email: newUser.email,
                    id: newUser.id
                }

                // 储存token失效有效期1小时
                const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'});

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    message: `创建用户成功`,
                    data: token
                }

            } catch (err) {
                ctx.response.status = 500;
                ctx.body = {
                    code: 500,
                    message: err
                }
            }
        }

    }

    /**
     * 查询用户信息
     * @param ctx token 分发的用户token
     *
     * @returns 查询成功返回用户信息，失败返回错误原因
     */
    static async info(ctx) {
        // 获取jwt
        const token = ctx.header.authorization;

        if (!token) {
            ctx.response.status = 403;
            ctx.body = {
                code: 403,
                message: "Headers Token不能为空"
            }
        }

        let payload
        try {
            // 解密payload，获取用户名和ID
            payload = await verify(token.split(' ')[1], secret.sign)
            const user = {
                id: payload.id,
                email: payload.email,
                username: payload.username
            }

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: '查询成功！',
                data: user
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }
    }

    /**
     * 删除用户
     * @param ctx id 用户ID
     * @returns  删除成功返回true，失败返回错误原因
     */
    static async delete(ctx) {
        let {id} = ctx.params;

        // 检测是否传入ID
        if (!id) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `ID不能为空`
            }

            return false;
        }

        if (isNaN(id)) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `请传入正确的ID`
            }

            return false;
        }

        try {
            await UserModel.delete(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "删除成功"
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }
    }

    /**
     * 登录
     * @param ctx username     用户名字
     * @param ctx password     用户密码
     *
     * @returns 登录成功返回用户信息，失败返回错误原因
     */
    static async login(ctx) {
        const {username, email, password} = ctx.request.body
        // 查询用户
        const userDetail = await UserModel.username(username)

        if (!userDetail) {
            ctx.response.status = 403;
            ctx.body = {
                code: 403,
                message: "用户不存在"
            }

            return false;
        }


        // 判断前端传递的用户密码是否与数据库密码一致
        if (bcrypt.compareSync(password, userDetail.password)) {
            // 用户token
            const userToken = {
                username: userDetail.username,
                id: userDetail.id,
                email: userDetail.email,
            }
            // 签发token
            const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'});

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "登录成功",
                data: {
                    id: userDetail.id,
                    username: userDetail.username,
                    email: userDetail.email,
                    token: token
                }
            }

        } else {
            ctx.response.status = 401;
            ctx.body = {
                code: 401,
                message: "用户名或密码错误"
            }
        }
    }

    /**
     * 获取用户列表
     * @param ctx
     *
     * @returns 用户列表数据
     */
    static
    async list(ctx) {
        try {
            const data = await UserModel.findAllUserList();

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "获取成功",
                data
            }
        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }
    }
}

module.exports = User