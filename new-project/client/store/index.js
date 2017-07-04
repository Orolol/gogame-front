import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: "",
  playerProfile : {},
  currentGame : {},
}

const mutations = {
  LOAD_TOKEN (state, payload) {
    state.token = payload
  },
  LOAD_PROFILE (state, payload) {
    state.playerProfile = payload
  },
  LOAD_GAME (state, payload) {
    state.currentGame = payload
    console.log("GAME COMMITED");
  }
}

const actions = {

}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
