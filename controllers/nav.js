const NavModel = require('../modules/nav')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

class navController {
    /**
     * 创建导航条列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async createNav(ctx) {
        let navList = ctx.request.body

        if (navList) {
            let title_cn = ctx.query.title_cn,
                title_en = ctx.query.title_en,
                path = ctx.query.path;

            navList = {
                title_cn,
                title_en,
                path
            }

            let ret = await NavModel.createNav(navList);
            let data = await NavModel.getNavDetail(ret.id);

            const token = jwt.sign(navList, secret.sign, {expiresIn: '1h'})  // 签发token

            ctx.body = {
                code: 200,
                data: token,
                message: '创建成功'
            }
        } else {
            ctx.body = {
                code: -1,
                message: '创建失败'
            }
        }
    }

    /**
     * 获取导航条列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getNavlist(ctx) {
        let navList = ctx.request.body

        if (navList) {
            const data = await NavModel.getNavlist()
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
                message: '获取失败'
            }
        }

    }

    /**
     * 查询单条导航条数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getNavDetail(ctx) {
        let id = ctx.params.id;

        if (id) {
            const data = await NavModel.getNavDetail(id)
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
                message: 'ID必须传'
            }
        }
    }


    /**
     * 删除导航条
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async deleteNav(ctx) {
        let id = ctx.params.id;
        if (id && !isNaN(id)) {
            await NavModel.deleteNav(id);
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
     * 更新导航条数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async updateNav(ctx) {
        let navList = ctx.request.body

        if (navList) {
            let id = ctx.params.id,
                title_cn = ctx.query.title_cn,
                title_en = ctx.query.title_en,
                path = ctx.query.path;

            navList = {
                id,
                title_cn,
                title_en,
                path
            }

            await NavModel.updateNav(navList.id, navList);
            let data = await NavModel.getNavDetail(navList.id);

            ctx.body = {
                code: 200,
                data: data,
                message: '更新成功'
            }

        } else {
            ctx.body = {
                code: -1,
                message: '更新失败'
            }
        }
    }
}

module.exports = navController
