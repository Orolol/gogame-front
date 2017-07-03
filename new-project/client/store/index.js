import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: "",
  playerProfile : {},
}

const mutations = {
  LOAD_TOKEN (state, payload) {
    state.token = payload
  },
  LOAD_GAME (state, payload) {
    tate.token = payload
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
