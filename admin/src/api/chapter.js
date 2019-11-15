import fetch from './fetch';

export default {
  // 获取章节列表
  list(params) {
    const {column_id} = params;
    delete params.column_id;
    return fetch.get('/column/chapter-list/' + column_id, params)
  },

  // 更新章节
  update(params) {
    const {id} = params;
    delete params.id;
    return fetch.put('/column/chapter/' + id, params)
  },

  // 删除章节
  destroy(id) {
    return fetch.delete('/column/chapter/' + id)
  },

  // 章节详情
  detail(params) {
    const {id} = params;
    delete params.id;
    return fetch.get('/column/chapter/' + id, params);
  },

  // 创建章节
  create(params) {
    return fetch.post('/column/chapter', params);
  }
}
