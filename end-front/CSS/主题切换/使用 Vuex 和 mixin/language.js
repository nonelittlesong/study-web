// store/modules/language.js
export default {
  state: {
    language: 'zh'
  },
  mutations: {
    SET_LANGUAGE(state, lang) {
      state.language = lang;
      document.documentElement.setAttribute('data-language', lang);
    }
  },
  actions: {
    setLanguage({ commit }, lang) {
      commit('SET_LANGUAGE', lang);
    }
  },
  getters: {
    currentLanguage: state => state.language
  }
}