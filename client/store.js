import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: {},
    users: []
  },
  mutations: {
    setLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users;
    }
  },
  actions: {
    start({ dispatch }) {
      return dispatch('checkLogin');
    },
    login({ commit }, userInfo) {
      return Vue.axios.post('/users/login', userInfo)
          .then(response => {
              commit('setLoggedIn', true);
              commit('setUser', response.data);
          })
          .catch(err => {
              console.log(err);
              commit('setLoggedIn', false);
              commit('setUser', null);
              return Promise.reject(err.response);
          })
    },
    checkLogin({ state, commit }) {
      return Vue.axios.get('/users/isLoggedIn')
        .then(response => {
          commit('setLoggedIn', true);
          commit('setUser', response.data);
        })
        .catch(err => {
          commit('setLoggedIn', false);
          commit('setUser', {});
        });
    },
    logout({ commit }) {
      return Vue.axios.post('/users/logout')
        .then(() => {
          commit('setLoggedIn', false);
          commit('setUser', {});
        });
    },

    getUsers({ commit }) {
      return Vue.axios.get('/users')
        .then(response => {
          commit('setUsers', response.data);
        });
    },
  },

  getters: {
    getUserByUsername(state) {
      return username => state.users.find(user => user.username === username);
    }
  }
});