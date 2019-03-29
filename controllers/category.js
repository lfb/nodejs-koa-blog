const CategoryModel = require('../modules/category')

class categoryController {
    /**
     * 创建分类
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        let {name, icon, parent_id, z_index} = ctx.request.body;

        let params = {
            name,
            icon,
            parent_id
        }


        // 检测参数是否存在为空
        let errors = [];
        for (let item in params) {
            if (params[item] === undefined) {
                let index = errors.length + 1;
                errors.push("错误" + index + ": 参数: " + item + "不能为空")
            }
        }
        if (errors.length > 0) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: errors
            }
            return false;
        }


        try {
            params.z_index = z_index || "10";
            const {id} = await CategoryModel.createCategory(params);
            const data = await CategoryModel.getCategoryDetail(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `创建分类成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `创建分类失败`,
                data: err
            }
        }

    }

    // 分类树结构
    categoryTree(list) {
        // 对源数据深度克隆
        let cloneData = JSON.parse(JSON.stringify(list))
        //循环所有项
        let tree = cloneData.filter(father => {
            let branchArr = cloneData.filter(child => {
                //返回每一项的子级数组
                return father.id == child.parent_id
            });
            if (branchArr.length > 0) {
                //如果存在子级，则给父级添加一个children属性，并赋值
                father.sub_category = branchArr;
            }
            //返回第一层
            return father.parent_id == 0;
        });
        //返回树形数据
        return tree
    }


    /**
     * 获取分类列表
     * @returns {Promise.<void>}
     */
    static async list(ctx) {
        let {include} = ctx.query;

        try {
            let data = null;

            if (include === 'tree') {
                // 获取完分类数据后，进行树结构遍历
                data = new categoryController().categoryTree(
                    await CategoryModel.getCategoryList()
                );

            } else {
                data = await CategoryModel.getCategoryList()
            }


            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `获取分类列表成功！`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `获取分类列表失败`,
                data: err
            }
        }
    }


    /**
     * 查询ID分类下的所有文章
     * @returns {Promise.<void>}
     */
    static async getCategoryArticle(ctx) {
        let {id} = ctx.params;

        // 检测是否传入ID
        if (!id) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `分类ID不能为空`
            }

            return false;
        }

        if (isNaN(id)) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `请传入正确的分类ID`
            }

            return false;
        }


        try {
            const data = await CategoryModel.getCategoryArticleList(id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `查询成功！`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `获取分类列表失败`,
                data: err
            }
        }
    }

    /**
     * 查询单条分类数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let {id} = ctx.params;

        // 检测是否传入ID
        if (!id) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `ID不能为空`
            }

            return false;
        }

        if (isNaN(id)) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `请传入正确的ID`
            }

            return false;
        }

        try {
            let data = await CategoryModel.getCategoryDetail(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 500,
                message: `查询成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `获取分类列表失败`,
                data: err
            }
        }
    }


    /**
     * 删除分类数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        let {id} = ctx.params;

        // 检测是否传入ID
        if (!id) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `ID不能为空`
            }

            return false;
        }

        if (isNaN(id)) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `请传入正确的ID`
            }

            return false;
        }

        try {
            await CategoryModel.deleteCategory(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `删除成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `获取失败`,
                data: err
            }
        }

    }

    /**
     * 更新分类数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        let {id} = ctx.params;

        // 检测是否传入ID
        if (!id) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `ID不能为空`
            }

            return false;
        }

        if (isNaN(id)) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: `请传入正确的ID`
            }

            return false;
        }

        let {name, icon, parent_id, z_index = 10} = ctx.request.body;

        let params = {
            name,
            icon,
            parent_id,
            z_index
        }

        try {
            await CategoryModel.updateCategory(id, params);
            let data = await CategoryModel.getCategoryDetail(id);

            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `更新分类成功`,
                data
            }

        } catch (err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: `更新失败`,
                data: err
            }
        }


    }
}

module.exports = categoryController
