const {
  Rule,
  LinValidator
} = require('../../core/lin-validator-v2')

class ColumnValidator extends LinValidator {
  constructor() {
    super();

    this.title = [new Rule("isLength", "专栏 title 不能为空", {min: 1})];
    this.author = [new Rule("isLength", "专栏 author 不能为空", {min: 1})];
    this.cover = [new Rule("isLength", "专栏 cover 不能为空", {min: 1})];
    this.description = [new Rule("isLength", "专栏 description 不能为空", {min: 1})];
  }
}

class PositiveIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '专栏ID需要正整数', {min: 1})
    ]
  }
}


module.exports = {
  ColumnValidator,
  PositiveIdParamsValidator
}
