const {Comments} = require('../models/comments')
const {User} = require('../models/user')


class CommentsDao {
    // 创建评论
    static async createComments(v) {
        const comments = new Comments();

        const user = await User.findOne({
            where: {
                id: v.get('body.user_id'),
                delete_at: null
            },
            attributes: {
                exclude: [
                    'password',
                    'delete_at',
                    'update_at',
                    'create_at'
                ]
            }
        })

        if (!user) {
            throw new global.errs.NotFound('没有找到相关用户');
        }

        comments.user_id = v.get('body.user_id');
        comments.content = v.get('body.content');
        comments.article_id = v.get('body.article_id');
        comments.parent_id = v.get('body.parent_id');

        return comments.save();
    }

    // 删除评论
    static async destroyComments(id) {
        const comments = await Comments.findOne({
            where: {
                id,
                delete_at: null
            }
        });
        if (!comments) {
            throw new global.errs.NotFound('没有找到相关评论');

        }
        comments.destroy()
    }

    // 获取评论详情
    static async getComments(id) {
        const comments = await Comments.findOne({
            where: {
                id,
                delete_at: null
            }
        });
        if (!comments) {
            throw new global.errs.NotFound('没有找到相关评论');
        }

        return comments
    }

    // 更新分类
    static async updateComments(id, v) {
        const comments = await Comments.findByPk(id);
        if (!comments) {
            throw new global.errs.NotFound('没有找到相关分类');
        }
        comments.uid = v.get('body.uid');
        comments.content = v.get('body.content');
        comments.article_id = v.get('body.article_id');
        comments.parent_id = v.get('body.parent_id');

        comments.save();
    }


    // 评论列表
    static async getCommentsList() {
        return await Comments.findAll({
            where: {
                delete_at: null
            }
        })
    }

    // 文章下的评论
    static async getArticleComments(articleId) {
        return await Comments.findAll({
            where: {
                article_id: articleId,
                delete_at: null
            },
            attributes: {
                exclude: [
                    'UserId'
                ]
            },
            // 把文章关联的分类也查询出来
            include: [{
                model: User,
                where: {
                    delete_at: null
                },
                attributes: {
                    exclude: [
                        'password',
                        'delete_at',
                        'update_at',
                        'create_at'
                    ]
                }
            }]
        })
    }
}

module.exports = {
    CommentsDao
}