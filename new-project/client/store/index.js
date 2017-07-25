import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: "",
  playerProfile : {},
  currentGame : {},
  ecoPolicies: [],
  milPolicies: [],
  actions: [],
  technology: [],
  myBoard: {},
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
  },
  LOAD_POLICIES (state, payload) {
    state.ecoPolicies = payload.ECO
    state.milPolicies = payload.MIL
  },
  LOAD_ACTIONS (state, payload) {
    state.actions = payload
  },
  LOAD_TECH (state, payload) {
    state.technology = payload
  },
  LOAD_BOARD (state, payload) {
    state.myBoard = payload
  },

}

const actions = {

}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
