const ArticleModel = require('../modules/article')
const CategoryModel = require('../modules/category')

class articleController {
    /**
     * 创建文章
     * @param ctx
     */
    static async create(ctx) {
        // 接收参数
        let {title, author, introduction, categoryId, tag, cover, content} = ctx.request.body;

        let params = {
            title,
            author,
            introduction,
            categoryId,
            tag,
            cover,
            content
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


        try {

            // 查询分类是否存在
            let detail = await CategoryModel.getCategoryDetail(categoryId);

            if (!detail) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    message: `分类ID${categoryId}不存在！`
                }
            }

            // 创建文章
            const {id} = await ArticleModel.createArticle(params);
            // 查询文章
            const data = await ArticleModel.getArticleDetail(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `创建文章成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `创建文章失败`,
                data: err
            }
        }

    }

    // 搜索文章
    static async search(ctx) {
        try {
            let data = await ArticleModel.search(ctx.query);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `查询文章成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `搜索文章失败`,
                data: err
            }
        }
    }

    /**
     * 获取文章列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async list(ctx) {
        let params = ctx.query;
        try {
            const data = await ArticleModel.getArticleList(params);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `查询文章列表成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `查询文章列表失败`,
                data: err
            }
        }
    }

    /**
     * 查询单条文章数据
     * @param ctx
     * @returns {Promise<boolean>}
     */
    static async detail(ctx) {
        let {id} = ctx.params;

        // 检测是否传入ID
        if (!id) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `文章ID为空，请传入查询的文章ID`
            }

            return false;
        }

        if (isNaN(id)) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `请传入正确的文章ID`
            }

            return false;
        }

        try {
            let data = await ArticleModel.getArticleDetail(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `查询文章成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `查询文章失败`,
                data: err
            }
        }

    }


    /**
     * 删除文章数据
     * @param ctx
     * @returns {Promise<boolean>}
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
            await ArticleModel.deleteArticle(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `删除文章成功`
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `删除文章失败`,
                data: err
            }
        }

    }

    /**
     * 更新导航条数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
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

        // 接收参数
        let {title, author, introduction, category_id, tag, cover, content} = ctx.request.body;

        let params = {
            title,
            author,
            introduction,
            category_id,
            tag,
            cover,
            content
        }

        try {
            await ArticleModel.updateArticle(id, params);
            let data = await ArticleModel.getArticleDetail(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 500,
                message: `更新文章成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `更新文章失败`,
                data: err
            }
        }
    }
}

module.exports = articleController
