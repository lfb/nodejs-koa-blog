const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const Article = Sequelize.import('../schema/article');
const Category = Sequelize.import('../schema/category');

Category.hasMany(Article); // 将会添加 categoryId 到 Article 模型
Article.belongsTo(Category, {as: 'Current', foreignKey: 'categoryId', constraints: false}); 

Article.sync({force: false});

class ArticleModel {
    /**
     * 创建文章
     * @param data
     * @returns {Promise<*>}
     */
    static async createArticle(data) {
        return await Article.create({
            title: data.title,
            author: data.author,
            introduce: data.introduce,
            category: data.category,
            banner: data.banner,
            content: data.content,
            categoryId: data.categoryId
        })
    }

    /**
     * 更新文章数据
     * @param id  用户ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateArticle(id, data) {
        await Article.update({
            title: data.title,
            author: data.author,
            introduce: data.introduce,
            category: data.category,
            banner: data.banner,
            recommend: data.recommend,
            content: data.content
        }, {
            where: {
                id
            },
            fields: ['title', 'author', 'introduce', 'category', 'banner', 'content', 'recommend']
        });
        return true
    }

    /**
     * 搜索
     * @param params
     * @return {Promise<void>}
     */
    static async search(params) {
        return await Article.findAll({
            raw: true,
            'order': [
                ['id', 'DESC']
            ],
            where: {
                title: {
                    // 模糊查询
                    [Op.like]: '%' + params.keyword + '%'
                }
            },
            attributes: {exclude: ['content']}
        })
    }

    /**
     * 获取文章列表
     * @returns {Promise<*>}
     */
    static async getArticleList(params) {
        let ret = null;
        let {page = 1, category, title, recommend} = params;

        if (category) {
            ret = await Article.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                where: {
                    category: category
                },
                'order': [
                    ['id', 'DESC']
                ],
                attributes: {exclude: ['content']}
            });

        } else if (title) {
            ret = await Article.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                where: {
                    title
                },
                'order': [
                    ['id', 'DESC']
                ],
                attributes: {exclude: ['content']}
            });

        } else if (recommend) {
            ret = await Article.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                where: {
                    recommend
                },
                'order': [
                    ['id', 'DESC']
                ],
                attributes: {exclude: ['content']}
            });

        } else {
            ret = await Article.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                'order': [
                    ['id', 'DESC']
                ],
                attributes: {exclude: ['content']}

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
