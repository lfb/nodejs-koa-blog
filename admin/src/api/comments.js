import fetch from './fetch';

export default {
  // 获取文章下的评论列表
  list(params) {
    const {article_id} = params;
    delete params.article_id;

    return fetch.get('/article/' + article_id + '/comments', params);
  },

  // 新增评论
  create(params) {
    return fetch.post('/comments', params);
  }
}
