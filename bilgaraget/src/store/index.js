import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    currentUser: Object,
  },
  getters: {
    currentUser(state){
      return state.currentUser
    },
    loggedInStatus(state){
      return state.isLoggedIn
    }
  },
  mutations: {
    setCurrentUser(state, user){
      state.currentUser = user
    },
    setIsLoggedIn(state, isLoggedIn){
      state.isLoggedIn = isLoggedIn
    }
  },
  actions: {
  },
  modules: {
  }
})
