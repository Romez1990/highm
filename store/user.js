import VuexPersist from 'vuex-persist';

export const state = () => ({
  token: '',
});

export const actions = {
  async login({ commit }, data) {
    const url = `${process.env.SERVER_URL}/api/login/`;
    let response;
    try {
      response = await this.$axios.$post(url, data);
    } catch {
      return false;
    }
    const token = response.auth_token;
    commit('setToken', token);
    return true;
  },
};

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

export const getters = {
  token(state) {
    return state.token;
  },
};

export const plugins = [process.browser ? new VuexPersist().plugin : undefined];
