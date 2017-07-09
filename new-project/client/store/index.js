import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: "",
  playerProfile : {},
  currentGame : {},
  ecoPolicies: [],
  milPolicies: [],
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
  },
  LOAD_POLICIES (state, payload) {
    state.ecoPolicies = payload.ECO
    state.milPolicies = payload.MIL
    console.log("POLICIES LOAD");
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
