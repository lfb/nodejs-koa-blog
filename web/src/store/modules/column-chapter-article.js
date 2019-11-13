import chapter from '../../api/column-chapter-article'

const state = {
  article: null,
  comments: []
}

const mutations = {
  SET_COLUMN_CHAPTER_ARTICLE(state, data) {
    state.article = data
  },
  SET_COLUMN_CHAPTER_ARTICLE_COMMENTS(state, list) {
    state.comments = list
  }
}

const actions = {
  /**
   * 获取专栏章节详情
   *
   */
  async detail({ state, commit }, params) {
    const r = await chapter.detail(params)
    commit('SET_COLUMN_CHAPTER_ARTICLE', r.data.data)
    commit('SET_COLUMN_CHAPTER_ARTICLE_COMMENTS', r.data.data.comments)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
