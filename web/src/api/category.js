import fetch from './fetch';

export default {
  // 获取分类列表
  list(params) {
    return fetch.get('/category/list', params)
  },

  // 查询分类ID下的所有文章列表
  article(params) {
    return fetch.get('/category/article/' + params.id, params);
  }
}
