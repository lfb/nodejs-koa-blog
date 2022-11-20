const xss = require('xss')

const { Comment } = require('@models/comment')
const { Article } = require('@models/article')
const { User } = require('@models/user')
const { Reply } = require('@models/reply')
const { isArray, unique } = require('@lib/utils')
// const {sequelize} = require('@core/db')
const { Sequelize, Op } = require('sequelize')

class CommentDao {
  // 创建评论
  static async create(v) {
    const comment = new Comment();
    comment.article_id = v.get('body.article_id');
    comment.user_id = v.get('body.user_id');
    comment.email = v.get('body.email') || 0;
    comment.content = xss(v.get('body.content'));

    try {
      const res = await comment.save();
      return [null, res]

    } catch (err) {
      return [err, null]
    }
  }

  // 删除评论
  static async destroy(id) {
    const comment = await Comment.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论');

    }
    try {
      const res = await comment.destroy()
      return [null, res]
    } catch (err) {
      return [err, null]
    }
  }

  // 获取评论详情
  static async detail(id, query) {
    const { is_replay = 0, is_article = 0, is_user = 0 } = query
    try {
      let comment = await Comment.scope('iv').findOne({
        where: {
          id,
          deleted_at: null
        },
        attributes: {
          exclude: ['updated_at']
        }

      });
      if (!comment) {
        throw new global.errs.NotFound('没有找到相关评论信息');
      }

      // 查询评论
      if (parseInt(is_replay, 10) === 1) {
        comment = await CommentDao._handleReply(comment)
      }

      // 查询文章
      if (parseInt(is_article, 10) === 1) {
        comment = await CommentDao._handleArticle(comment)
      }

      // 查询用户
      if (parseInt(is_user, 10) === 1) {
        comment = await CommentDao._handleUser(comment)
      }

      return [null, comment]

    } catch (err) {
      return [err, null]
    }
  }

  // 更新评论
  static async update(id, v) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }
    const aid = v.get('body.article_id')
    const uid = v.get('body.user_id')
    const status = v.get('body.status')
    const content = v.get('body.content')
    if (aid) {
      comment.article_id = aid
    }
    if (uid) {
      comment.user_id = uid
    }
    if (status) {
      comment.status = status
    }
    if (content) {
      comment.content = content
    }

    try {
      const res = await comment.save();
      return [null, res]

    } catch (err) {
      return [err, null]
    }
  }

  // 评论列表
  static async list(query) {
    const {
      page = 1,
      is_replay = 0,
      is_article = 0,
      content,
      id,
      status,
      article_id,
      is_user = 0
    } = query

    try {
      const finner = {
        deleted_at: null
      }
      if (id) {
        finner.id = id
      }
      if (article_id) {
        finner.article_id = article_id
      }
      if (status != null) {
        finner.status = status
      }
      if (content) {
        finner.content = {
          [Op.like]: `%${content}%`
        }
      }

      const pageSize = 10;
      const comment = await Comment.scope('bh').findAndCountAll({
        // 每页10条
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: finner,
        order: [
          ['created_at', 'DESC']
        ],
        attributes: {
          exclude: ['updated_at']
        },
      })

      let rows = comment.rows

      // 查询评论
      if (parseInt(is_replay, 10) === 1) {
        rows = await CommentDao._handleReply(rows)
      }

      // 查询文章
      if (parseInt(is_article, 10) === 1) {
        rows = await CommentDao._handleArticle(rows)
      }

      // 查询用户
      if (parseInt(is_user, 10) === 1) {
        rows = await CommentDao._handleUser(rows)
      }

      const data = {
        data: rows,
        meta: {
          current_page: parseInt(page),
          per_page: 10,
          count: comment.count,
          total: comment.count,
          total_pages: Math.ceil(comment.count / 10),
        }
      };
      return [null, data]

    } catch (err) {
      return [err, null]
    }
  }

  // 关联目标下的评论
  static async targetComment(params = {}) {
    try {
      const {
        article_id = 0,
        user_id = 0,
        is_replay = 0,
        is_article = 0,
        is_user = 0,
        page_size = 10,
        status = -1,
        page = 1,
        desc = 'created_at'
      } = params;

      // if (!article_id) {
      //   throw new global.errs.NotFound('必须传入article id');
      // }

      const finner = {
        status: 1,
        deleted_at: null
      }

      if (user_id) {
        finner.user_id = user_id
      }

      if (article_id) {
        finner.article_id = article_id
      }

      if (status === -1) {
        delete finner.status
      }

      const comment = await Comment.findAndCountAll({
        where: finner,
        // 每页10条
        limit: page_size,
        offset: (page - 1) * page_size,
        order: [
          [desc, 'DESC']
        ],
        attributes: {
          exclude: ['updated_at']
        },
      })

      let rows = comment.rows
      // 查询评论
      if (parseInt(is_replay, 10) === 1) {
        rows = await CommentDao._handleReply(rows)
      }

      // 查询文章
      if (parseInt(is_article, 10) === 1) {
        rows = await CommentDao._handleArticle(rows)
      }

      // 用户
      if (parseInt(is_user, 10) === 1) {
        rows = await CommentDao._handleUser(rows)
      }

      const data = {
        data: rows,
        // 分页
        meta: {
          current_page: parseInt(page),
          per_page: 10,
          count: comment.count,
          total: comment.count,
          total_pages: Math.ceil(comment.count / 10),
        }
      }
      return [null, data]

    } catch (err) {
      console.log(err)
      return [err, null]
    }
  }

  /**
   * 查询回复id，且处理数据为 key-value 形式
   * @param ids 评论id | Array | Object
   * @returns 根据传入的ids查询出来的回复数据
   */
  static async getReplyData(ids) {
    const scope = 'bh'
    const finner = {
      where: {
        status: 1,
        deleted_at: null
      },
      attributes: ['id', 'content', 'comment_id', 'status', 'user_id', 'reply_user_id', 'created_at']
    }
    const isArrayIds = isArray(ids)

    if (isArrayIds) {
      finner.where.comment_id = {
        [Op.in]: ids
      }
    } else if (ids) {
      finner.where.comment_id = ids
    }

    try {
      const fn = isArrayIds ? 'findAll' : 'findOne'
      const res = await Reply.scope(scope)[fn](finner)

      if (isArrayIds) {
        let reply = {}
        // 进行数组拆分成 Map 结构
        // 目的：为了下次[ _setCommentByDataValue 函数]拼接时，算法复杂度 由 O(n²) 降为 0(n)
        res.forEach(item => {
          // 如果有重复的map key 则直接装进去
          if (reply[item.comment_id]) {
            reply[item.comment_id].push(item)
          } else {
            // 反之，初始化数组
            reply[item.comment_id] = [item]
          }
        })
        return [null, reply]
      }

      return [null, res]

    } catch (err) {
      return [err, null]
    }
  }


  /**
   * 查询文章id，且处理数据为 key-value 形式
   * @param ids 文章id | Array | Object
   * @returns 根据传入的ids查询出来的文章数据
   */
  static async getArticleData(ids) {
    const scope = 'bh'
    const finner = {
      where: {},
      attributes: ['id', 'title']
    }
    const isArrayIds = isArray(ids)
    // 如果ids是数组，则使用 Op.in 查询
    if (isArrayIds) {
      finner.where.id = {
        [Op.in]: ids
      }
    } else if (ids) {
      // 反之id索引查询
      finner.where.id = ids
    }

    try {
      // 如果ids是数组，则使用 Op.in 查询，反之id索引查询
      if (isArrayIds) {
        const res = await Article.scope(scope).findAll(finner)
        const article = {}
        res.forEach(item => {
            article[item.id] = item
        })
        return [null, article]
      } else {
        const res = await Article.scope(scope).findOne(finner)

        return [null, res]
      }

    } catch (err) {
      console.log(err)
      return [err, null]
    }
  }
  /**
   * 查询用户id，且处理数据为 key-value 形式
   * @param ids 用户id | Array | Object
   * @returns 根据传入的ids查询出来的用户数据
   */
  static async getUserData(ids) {
    if (ids === 0) {
      return [null, null]
    }

    const scope = 'bh'
    const finner = {
      where: {
        id: {}
      }
      // attributes: ['id', 'title']
    }
    const isArrayIds = isArray(ids)
    // 如果ids是数组，则使用 Op.in 查询
    if (isArrayIds) {
      finner.where.id = {
        [Op.in]: ids
      }
    } else if (ids) {
      // 反之id索引查询
      finner.where.id = ids
    }

    try {
      // 如果ids是数组，则使用 Op.in 查询，反之id索引查询
      const fn = isArrayIds ? 'findAll' : 'findOne'
      const res = await User.scope(scope)[fn](finner)

      if (isArrayIds) {
        const user = {}
        res.forEach(item => {
          user[item.id] = item
        })
        return [null, user]
      }

      return [null, res]

    } catch (err) {
      return [err, null]
    }
  }

  /**
   * 新增设置评论下的属性
   *
   * @param comment 评论数据
   * @param data 需要设置的数据
   * @param id 评论表和设置数据的关联id
   * @param key 新增设置评论下的属性 key
   * @returns 新的评论数据
   * @private
   */
  static _setCommentByDataValue(comment, data = {}, id = 'id', key = 'key') {
    // 处理数组和对象的情况
    if (isArray(comment)) {
      // 查询数据列表的id是否有匹配的 map key: 如 reply[commentItem.id]
      // 有直接赋值，反之默认数组
      comment.forEach(commentItem => {
        commentItem.setDataValue(key, data[commentItem[id]] || null)
      })
    } else {
      comment.setDataValue(key, data)
    }

    // console.log('comment', comment)

    return comment
  }

  /**
   * 处理评论下的回复
   * @param comment 评论数据 Array | Object
   * @returns 新的评论数据
   * @private
   */
  static async _handleReply(comment) {
    try {
      const isArrayData = isArray(comment)
      const commentIds = isArrayData ? unique(comment.map(c => c.id)) : comment.id
      const [replyErr, replyData] = await CommentDao.getReplyData(commentIds)

      if (!replyErr) {
        const userIds = [];
        let newUserIds = [];

        if (isArrayData) {
          Object.keys(replyData).forEach(key => {
            userIds.push(
              ...replyData[key].map(item => item.user_id),
              ...replyData[key].map(item => item.reply_user_id)
            )
          })
        } else {
          userIds.push(replyData.user_id, replyData.reply_user_id)
        }


        newUserIds = unique(userIds).filter(v => v !== 0)

        const [userErr1, userData1] = await CommentDao.getUserData(newUserIds)
        if (!userErr1) {
          CommentDao._handleReplyUserInfo(replyData, userData1)
        }

        return CommentDao._setCommentByDataValue(comment, replyData, 'id', 'reply_list')
      } else {
        throw new global.errs.Existing(JSON.stringify(replyErr));
      }
    } catch (err) {
      console.log(err)
    }
  }

  static _handleReplyUserInfo(data, user = {}) {
    try {
      const USER_INFO = 'user_info'
      const REPLY_USER_INFO = 'replay_user_info'
      Object.keys(data).forEach(key => {
        const item = data[key]
        if (isArray(item)) {
          item.forEach(v => {
            v.setDataValue(USER_INFO, user[v.user_id] || null)
            v.setDataValue(REPLY_USER_INFO, user[v.reply_user_id] || null)
          })
        } else {
          if (item.user_id) {
            item[USER_INFO] = user[item.user_id] || null
          }
          if (item.reply_user_id) {
            item[REPLY_USER_INFO] = user[item.reply_user_id] || null
          }
        }
      })

      return data
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * 处理评论下的管理文章
   * @param comment 评论数据 Array | Object
   * @returns 新的评论数据
   * @private
   */
  static async _handleArticle(comment) {
    // 判断评论数据是否是数组或者对象
    // 如果是数组，遍历去到评论下的文章id列表
    // 如果是对象，直接取该评论的id
    const isArrayData = isArray(comment)
    const articleIds = isArrayData ? unique(comment.map(c => c.article_id)) : comment.article_id

    // 进行查询
    const [articleErr, articleData] = await CommentDao.getArticleData(articleIds)

    if (!articleErr) {
      return CommentDao._setCommentByDataValue(comment, articleData, 'article_id', 'article')
    } else {
      throw new global.errs.Existing(JSON.stringify(articleErr));
    }
  }
  /**
   * 处理评论下的用户
   * @param comment 评论数据 Array | Object
   * @returns 新的评论数据
   * @private
   */
  static async _handleUser(comment) {
    // 判断评论数据是否是数组或者对象
    // 如果是数组，遍历去到评论下的文章id列表
    // 如果是对象，直接取该评论的id
    const isArrayData = isArray(comment)
    const userIds = isArrayData
      ? unique(comment.map(c => c.user_id)).filter(v => v !== 0)
      : comment.user_id

    // 进行查询
    const [userErr, userData] = await CommentDao.getUserData(userIds)

    if (!userErr) {
      return CommentDao._setCommentByDataValue(comment, userData, 'user_id', 'user_info')

    } else {
      throw new global.errs.Existing(JSON.stringify(userErr));
    }
  }
}

module.exports = {
  CommentDao
}
