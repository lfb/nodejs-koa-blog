const {Advertise} = require('../models/advertise')

class AdvertiseDao {
  // 新增广告
  static async create(v) {
    // 检测是否存在广告
    const hasAdvertise = await Advertise.findOne({
      where: {
        title: v.get('body.title'),
        deleted_at: null
      }
    });

    // 如果存在，抛出存在信息
    if (hasAdvertise) {
      throw new global.errs.Existing('广告已存在');
    }

    const advertise = new Advertise();
    advertise.title = v.get('body.title')
    advertise.link = v.get('body.link')

    return advertise.save();
  }

  // 删除广告
  static async destroy(id) {
    const advertise = await Advertise.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!advertise) {
      throw new global.errs.NotFound('没有找到相广告');
    }
    advertise.destroy()
  }

  // 获取广告详情
  static async detail(id) {
    const advertise = await Advertise.scope('iv').findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!advertise) {
      throw new global.errs.NotFound('没有找到相关广告信息');
    }

    return advertise
  }

  // 更新广告
  static async update(id, v) {
    const advertise = await Advertise.findByPk(id);
    if (!advertise) {
      throw new global.errs.NotFound('没有找到相关广告信息');
    }
    advertise.title = v.get('body.title');
    advertise.link = v.get('body.link');

    advertise.save();
  }


  // 广告列表
  static async list(page = 1) {
    const pageSize = 6;
    const advertise = await Advertise.scope('bh').findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where: {
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ],
      attributes: {
        exclude: ['email']
      }
    })

    return {
      data: advertise.rows,
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: advertise.count,
        total: advertise.count,
        total_pages: Math.ceil(advertise.count / 10),
      }
    };
  }
}

module.exports = {
  AdvertiseDao
}
