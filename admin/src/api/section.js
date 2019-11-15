import fetch from './fetch';

export default {
  // 获取章节下的文章列表
  list(params) {
    const {column_chapter_id} = params;
    delete params.column_chapter_id;
    return fetch.get('/chapter/section-list/' + column_chapter_id, params)
  },

  // 更新章节下的文章
  update(params) {
    const {id} = params;
    delete params.id;
    return fetch.put('/chapter/section/' + id, params)
  },

  // 删除章节下的文章
  destroy(id) {
    return fetch.delete('/chapter/section/' + id)
  },

  // 章节下的文章详情
  detail(params) {
    const {id} = params;
    delete params.id;
    return fetch.get('/chapter/section/' + id, params);
  },

  // 创建章节下的文章
  create(params) {
    return fetch.post('/chapter/section', params);
  }
}
