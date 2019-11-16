import section from '../../api/chapter-section'

const state = {
  section: null
}

const mutations = {
  SET_COLUMN_CHAPTER_SECTION(state, data) {
    state.section = data
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
    return r
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
