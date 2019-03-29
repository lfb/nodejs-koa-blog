const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const Article = Sequelize.import('../schema/article');
const Category = Sequelize.import('../schema/category');

Category.hasMany(Article); // 将会添加 category_id 到 Article 模型
Article.belongsTo(Category, {foreignKey: 'categoryId'});

Article.sync({force: false});

class ArticleModel {
    /**
     * 创建文章
     * @param data
     * @returns {Promise<*>}
     */
    static async createArticle(data) {
        return await Article.create(data)
    }

    /**
     * 更新文章数据
     * @param id
     * @param data
     */
    static async updateArticle(id, data) {
        return await Article.update(data, {
            where: {
                id
            },
            fields: ['title', 'author', 'introduction', 'categoryId', 'is_del', 'tag', 'cover', 'content']
        });
    }

    /**
     * 搜索
     * @param params
     * @return {Promise<void>}
     */
    static async search(params) {
        let {page = 1, keyword} = params;

        let ret = await Article.findAndCountAll({
            limit: 10,//每页10条
            offset: (page - 1) * 10,
            where: {
                title: {
                    // 模糊查询
                    [Op.like]: '%' + keyword + '%'
                }
            },
            include: {
                model: Category,
                where: {
                    categoryId: Sequelize.col('article.categoryId')
                }
            },
            'order': [
                ['id', 'DESC']
            ],
            attributes: {exclude: ['content', 'is_del']}
        });


        return {
            code: 200,
            data: ret.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: ret.count,
                total: ret.count,
                total_pages: Math.ceil(ret.count / 10),
            }
        }
    }

    /**
     * 获取文章列表
     * @returns {Promise<*>}
     */
    static async getArticleList(params) {
        let ret = null;
        let {page = 1, category_id, title} = params;

        if (category_id) {
            ret = await Article.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                where: {
                    category_id: category_id
                },
                include: [{
                    model: Category,
                    where: {categoryId: Sequelize.col('article.categoryId')}
                }],
                'order': [
                    ['id', 'DESC']
                ],
                attributes: {exclude: ['content', 'is_del']}
            });

        } else if (title) {
            ret = await Article.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                where: {
                    title
                },
                include: [{
                    model: Category,
                    where: {categoryId: Sequelize.col('article.categoryId')}
                }],
                'order': [
                    ['id', 'DESC']
                ],
                attributes: {exclude: ['content', 'is_del']}
            });

        } else {
            ret = await Article.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                'order': [
                    ['id', 'DESC']
                ],
                include: [{
                    model: Category,
                    where: {categoryId: Sequelize.col('article.categoryId')}
                }],
                attributes: {exclude: ['content', 'is_del']}

            });
        }

        return {
            code: 200,
            data: ret.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: ret.count,
                total: ret.count,
                total_pages: Math.ceil(ret.count / 10),
            }
        }
    }

    /**
     * 获取文章详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getArticleDetail(id) {
        return await Article.findOne({
            where: {
                id,
            },
            include: [{
                model: Category,
                where: {categoryId: Sequelize.col('article.categoryId')}
            }],
            attributes: {exclude: ['is_del']}
        })
    }

    /**
     * 删除文章
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteArticle(id) {
        await Article.destroy({
            where: {
                id,
            }
        })
        return true
    }

}

module.exports = ArticleModel
