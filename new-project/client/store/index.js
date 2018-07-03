import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  token: '',
  playerProfile: {},
  enemyProfile: null,
  currentGame: {},
  ecoPolicies: [],
  milPolicies: [],
  actions: [],
  technology: [],
  myBoard: {},
  board: {},
  infos: {},
  events: {},
  rangeValues: {},
  translations: {}
}

const mutations = {
  LOAD_TOKEN(state, payload) {
    state.token = payload
  },
  LOAD_PROFILE(state, payload) {
    state.playerProfile = payload
  },
  LOAD_GAME(state, payload) {
    state.currentGame = payload
  },
  LOAD_RANGE_VALUES(state, payload) {
    state.rangeValues[payload.name] = payload.value
  },
  LOAD_TRANSLATIONS(state, payload) {
    state.translations[payload.name] = payload.value
  },
  LOAD_POLICIES(state, payload) {
    state.ecoPolicies = []
    state.milPolicies = []
    for (let i in payload) {
      if (payload[i]['TypePolicy'] == 'ECO') {
        state.ecoPolicies.push(payload[i])
      }
      if (payload[i]['TypePolicy'] == 'MIL') {
        state.milPolicies.push(payload[i])
      }
    }
  },
  LOAD_ACTIONS(state, payload) {
    state.actions = payload
  },
  LOAD_TECH(state, payload) {
    state.technology = payload
  },
  LOAD_EVENTS(state, payload) {
    state.events = payload
  },
  LOAD_BOARD_NEW(state, payload) {
    state.board = payload
  },
  LOAD_INFOS(state, payload) {
    state.infos = payload
  },
  LOAD_BOARD(state, payload) {
    state.myBoard = payload
    for (let i in payload.Policies) {
      for (let j in state.ecoPolicies) {
        if (state.ecoPolicies[j].ActionName == payload.Policies[i].ActionName) {
          state.ecoPolicies[j].DefaultValue = payload.Policies[i].Value
        }
      }
    }
    for (let i in payload.Policies) {
      for (let j in state.milPolicies) {
        if (state.milPolicies[j].ActionName == payload.Policies[i].ActionName) {
          state.milPolicies[j].DefaultValue = payload.Policies[i].Value
        }
      }
    }
  }
}

const actions = {
  getToken({ commit }, data) {
    return new Promise((resolve, reject) => {
      let dt = new Date(state.token.expire)
      let now = new Date()

      if (dt.valueOf() < now.valueOf() + 3000) {
        axios({ method: 'get', url: '/auth/RefreshToken', headers: { Authorization: 'Bearer ' + state.token.token } }).then(response => {})
      }
      resolve(state.token.token)
    })
  }
}

const getters = {
  myBoard: state => {
    if (!state.currentGame.ListPlayers) return {}

    if (state.currentGame.ListPlayers[0].PlayerID == state.playerProfile.ID) return state.currentGame.ListPlayers[0]
    else return state.currentGame.ListPlayers[1]
  },
  token: state => {}
}

const store = new Vuex.Store({
  getters,
  state,
  mutations,
  actions
})

export default store
