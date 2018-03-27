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
  events: [],
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
    state.ecoPolicies = []
    state.milPolicies = []
    for (let i in payload) {
      if (payload[i]["TypePolicy"] == "ECO") {
        state.ecoPolicies.push(payload[i])
      }
      if (payload[i]["TypePolicy"] == "MIL") {
        state.milPolicies.push(payload[i])
      }
    }
  },
  LOAD_ACTIONS (state, payload) {
    state.actions = payload
  },
  LOAD_TECH (state, payload) {
    state.technology = payload
  },
  LOAD_EVENTS(state, payload) {
    state.events = payload
  },
  LOAD_BOARD (state, payload) {
    state.myBoard = payload
    for (let i in payload.Policies) {
      for(let j in state.ecoPolicies){
        if(state.ecoPolicies[j].ActionName == payload.Policies[i].ActionName){
          state.ecoPolicies[j].DefaultValue =  payload.Policies[i].Value
        }
      }
    }
    for (let i in payload.Policies) {
      for(let j in state.milPolicies){
        if(state.milPolicies[j].ActionName == payload.Policies[i].ActionName){
          state.milPolicies[j].DefaultValue =  payload.Policies[i].Value
        }
      }
    }
  },

}



const actions = {
  checkConstraint(constraints){
    console.log('AAAA' , constraints)
    if(!constraints){
      return true
    }
    let player = state.myBoard
    let game = state.currentGame
    for (let c in constraints) {
      
      let t = constraints[c]
      console.log('CHECK C', t)
      if (t.Type == "tech" && ((player.Technologies && player.Technologies.indexOf(t.Value) !== -1) || !player.Technologies )){
        console.log('SHOULD HAVE ', t.Value)
        return false
      } else if (t.Type == "turn") {
        return CheckOperator(t.Value, t.Operator,game.CurrentTurn)
      } else if (t.Type == "isWar" && !game.IsWar ){
        return false
      } else if( t.Type == "isNotWar" && game.IsWar ){
        return false
      } else if( t.Type == "Modifier") {
        
        for (key in player.Modifiers ){
          if (key == t.Key ){
            return CheckOperator(ft.Value, t.Operator, player.Modifiers[key])
          }
        }
        return false
      } else if( t.Type == "ModifierTurn" ){
        for (key in player.Modifiers ){
          if( key == t.Key) {
            return CheckOperator(player.Modifiers[key], t.Operator,game.CurrentTurn)
          }
        }
        return false
      }

    }
    return true
  },
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
