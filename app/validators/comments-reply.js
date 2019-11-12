const {
  Rule,
  LinValidator
} = require('../../core/lin-validator-v2')

class CommentsReplyValidator extends LinValidator {
  constructor() {
    super()
    this.comment_id = [
      new Rule("isLength", "评论 id 不能为空", {min: 1})
    ]
    this.reply_id = [
      new Rule("isLength", "回复 id 不能为空", {min: 1})
    ]
  }
}

class PositiveArticleIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '评论ID需要正整数', {min: 1})
    ]
  }
}

module.exports = {
  CommentsReplyValidator,
  PositiveArticleIdParamsValidator
}
