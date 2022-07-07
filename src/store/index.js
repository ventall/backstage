import Vue from 'vue'
import Vuex from 'vuex'
import store from "store"
import http from "@/api/http"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: store.get(process.env.VUE_APP_TOKEN_NAME),
    userInfo: {}
  },
  getters: {
    userInfo (state) {
      if (state.token) {
        return state.userInfo
      }
    }
  },
  mutations: {
    SET_USERINFO (state, { userInfo, token }) {
      store.set(process.env.VUE_APP_TOKEN_NAME, token)
      state.token = store.get(process.env.VUE_APP_TOKEN_NAME)
      state.userInfo = userInfo
    },
    DELETE_TOKEN (state) {
      state.token = ''
      store.remove(process.env.VUE_APP_TOKEN_NAME)
    }
  },
  actions: {
    async logOut ({ commit }) {
      commit('DELETE_TOKEN')
    },
    async login ({ commit }, formData) {
      try {
        let result = await http({ type: "login", data: formData })
        let userInfo = {
          username: result.data.username,
          userId: result.data.userId
        }, token = result.data.token

        commit('SET_USERINFO', { userInfo, token })
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})
