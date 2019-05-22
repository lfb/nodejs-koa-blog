import upload from '../../api/uplpad'

const state = {
  uploadTokenData: {}
}

const mutations = {
  SET_UPLOAD_TOKEN(state, data) {
    state.uploadTokenData = data;
  }
}

const actions = {
  /**
   * 获取上传token
   * @param state
   * @param commit
   * @returns {Promise<void>}
   */
  async getUploadToken({state, commit}) {
    if (!state.uploadTokenData) {
      return state.uploadTokenData

    } else {
      let res = await upload.uploadToken();
      commit('SET_UPLOAD_TOKEN', res.data.data);

      return res.data.data;
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
