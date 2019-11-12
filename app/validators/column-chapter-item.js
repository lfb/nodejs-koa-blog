const {
  Rule,
  LinValidator
} = require('../../core/lin-validator-v2')

class ColumnChapterItemValidator extends LinValidator {
  constructor() {
    super();

    this.title = [new Rule("isLength", "专栏文章 title 不能为空", {min: 1})];
    this.author = [new Rule("isLength", "专栏文章 author 不能为空", {min: 1})];
    this.cover = [new Rule("isLength", "专栏文章 cover 不能为空", {min: 1})];
    this.description = [new Rule("isLength", "专栏文章 description 不能为空", {min: 1})];
    this.content = [new Rule("isLength", "专栏文章 content 不能为空", {min: 1})];
    this.column_chapter_id = [new Rule("isLength", "专栏文章 column_chapter_id 不能为空", {min: 1})];
  }
}

class PositiveIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '专栏文章ID需要正整数', {min: 1})
    ]
  }
}

module.exports = {
  ColumnChapterItemValidator,
  PositiveIdParamsValidator
}
