const {
  Rule,
  LinValidator
} = require('@core/lin-validator-v2')

class CommentValidator extends LinValidator {
  constructor() {
    super()

    this.content = [
      new Rule("isLength", "content 不能为空", { min: 1 })
    ]

    // this.user_id = [
    //   new Rule("isLength", "user_id 不能为空", { min: 1 })
    // ]

    this.article_id = [
      new Rule("isLength", "article_id 不能为空", { min: 1 })
    ]
  }
}

class PositiveArticleIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '评论ID需要正整数', { min: 1 })
    ]
  }
}

module.exports = {
  CommentValidator,
  PositiveArticleIdParamsValidator
}
