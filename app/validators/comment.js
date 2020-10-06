const {
  Rule,
  LinValidator
} = require('../../core/lin-validator-v2')

class CommentValidator extends LinValidator {
  constructor() {
    super()

    this.nickname = [
      new Rule("isLength", "评论人名字 nickname 不能为空", {min: 1})
    ]
    this.email = [
      new Rule('isEmail', '电子邮箱 email 不符合规范，请输入正确的邮箱')
    ]
    this.content = [
      new Rule("isLength", "评论内容 content 不能为空", {min: 1})
    ]
    this.target_id = [
      new Rule("isLength", "目标 target_id 不能为空", {min: 1})
    ]
    this.target_type = [
      new Rule("isLength", "目标 target_type 不能为空", {min: 1})
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
  CommentValidator,
  PositiveArticleIdParamsValidator
}
