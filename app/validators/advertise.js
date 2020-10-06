const {
  Rule,
  LinValidator
} = require('../../core/lin-validator-v2')

class AdvertiseValidator extends LinValidator {
  constructor() {
    super()
    this.title = [
      new Rule("isLength", "广告标题 title 不能为空", {min: 1})
    ]
    this.link = [
      new Rule("isLength", "广告链接 link 不能为空", {min: 1})
    ]
  }
}

class PositiveArticleIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', 'ID需要正整数', {min: 1})
    ]
  }
}

module.exports = {
  AdvertiseValidator,
  PositiveArticleIdParamsValidator
}
