import section from '../../api/chapter-section'

const state = {
  section: null,
  comment: null
}

const mutations = {
  SET_COLUMN_CHAPTER_SECTION(state, data) {
    state.section = data
  },
  SET_COLUMN_CHAPTER_SECTION_COMMENT(state, list) {
    state.comment = list
  }
}

const actions = {
  /**
   * 获取专栏章节详情
   *
   */
  async detail({ state, commit }, params) {
    const r = await section.detail(params)
    commit('SET_COLUMN_CHAPTER_SECTION', r.data.data)
    commit('SET_COLUMN_CHAPTER_SECTION_COMMENT', r.data.data.section_comment)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
