const {
  Rule,
  LinValidator
} = require('@core/lin-validator-v2')

const { Category } = require('@models/category')

class ArticleValidator extends LinValidator {
  constructor() {
    super();

    this.title = [new Rule("isLength", "文章标题 title 不能为空", { min: 1 })];
    this.img_url = [new Rule("isLength", "文章封面 img_url 不能为空", { min: 1 })];
    this.content = [new Rule("isLength", "文章内容 content 不能为空", { min: 1 })];
    this.seo_keyword = [new Rule("isLength", "文章关键字 seo_keyword 不能为空", { min: 1 })];
    this.description = [new Rule("isLength", "文章简介 description 不能为空", { min: 1 })];
    this.category_id = [new Rule("isLength", "文章分类 category_id 不能为空", { min: 1 })];
    this.admin_id = [new Rule("isLength", "admin_id 不能为空", { min: 1 })];
  }

  async validateCategoryId(vals) {
    const categoryId = vals.body.category_id;

    const category = await Category.findOne({
      where: {
        id: categoryId
      }
    });

    if (!category) {
      throw new Error('暂无此分类ID')
    }
  }
}

class PositiveIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '文章ID需要正整数', { min: 1 })
    ]
  }
}

class ArticleSearchValidator extends LinValidator {
  constructor() {
    super();
    this.keyword = [
      new Rule('isLength', '必须传入搜索关键字', { min: 1 })
    ]
  }
}

module.exports = {
  ArticleValidator,
  PositiveIdParamsValidator,
  ArticleSearchValidator
}
