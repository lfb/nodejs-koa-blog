const {
  Rule,
  LinValidator
} = require('../../core/lin-validator-v2')

class ColumnChapterValidator extends LinValidator {
  constructor() {
    super();

    this.title = [new Rule("isLength", "章节 title 不能为空", {min: 1})];
    this.column_id = [new Rule("isLength", "章节 column_id 不能为空", {min: 1})];
  }
}

class PositiveIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', 'id需要正整数', {min: 1})
    ]
  }
}

class PositiveColumnIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.column_id = [
      new Rule('isInt', '专栏 column_id 需要正整数', {min: 1})
    ]
  }
}

module.exports = {
  ColumnChapterValidator,
  PositiveColumnIdParamsValidator,
  PositiveIdParamsValidator
}
