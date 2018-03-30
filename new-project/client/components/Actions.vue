<template>
    <div class="actions">
      <div class="technology-switch" >
       <button class="button" v-for="t, y in actions" @click="actionType = y">{{y}}</button>
      </div>
      <transition name="slide-fade">
        <div v-for="t, y in actions" v-if="actionType == y" >
          <div v-for="v, k in t">
            <button   class="button" :disabled="!actionUsedCheck(v.ActionName) || !v.isCostOk"
                    @click="sendNewAction(v.ActionName, v.Cooldown)">{{v.Name}}</button>
            <br>
            <span class="description">{{v.Description}}</span>
            <span v-if="!actionUsedCheck(v.ActionName)">{{ actionUsed[v.ActionName] - $store.state.currentGame.CurrentTurn}}</span>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import axios from "axios"
import Vue from 'vue';
export default {
    data() {
      return {
        actionUsed : {},
        actionType: "ECONOMIC",
      }
    },
    computed: {
      actions: function() {
        let acts = []

        let sortedActions = {}
        for (let action in this.$store.state.actions){
          let a = this.$store.state.actions[action]
          if(!sortedActions[a.Type]) {
            sortedActions[a.Type] = []
          } 
          if( this.checkCosts(a.Costs) ) {
            a.isCostOk = true
          } else {
            a.isCostOk = false
          }
          if( this.checkConstraint(a.Constraints) ) {
            sortedActions[a.Type].push(a)
          } 
        }

        // for (let action in sortedActions){
        //   let a = sortedActions[action]
        //   if( this.checkCosts(a.Costs) ) {
        //     a.isCostOk = true
        //   } else {
        //     a.isCostOk = false
        //   }
        //   if( this.checkConstraint(a.Constraints) ) {
        //     acts.push(a)
        //   } 
        // }
        console.log(sortedActions)
        return sortedActions
      },

    },
    methods: {
      jsonParse(jsonList) {
          return JSON.parse(jsonList)
      },
      actionUsedCheck: function(id) {
        return !this.actionUsed[id] || this.actionUsed[id] < this.$store.state.currentGame.CurrentTurn
      },
      checkCosts(costs){
        let player = this.$store.state.myBoard
        if(player.Economy){
        	for (let cost in costs) {
            
            let c = costs[cost]
            switch (c.Type) {
              case "money":
                if (player.Economy.Money < c.Value) {
                  return false
                } else {
                  return true
                }
              case "science":
                if (player.Civilian.NbResearchPoint < c.Value) {
                  return false
                }else {
                  return true
                }
              case "manpower":
                if (player.Civilian.NbManpower < c.Value) {
                  return false
                }else {
                  return true
                }
              case "morale":
                if( player.Army.Morale < c.Value) {
                  return false
                }else {
                  return true
                }
            }
          }
          return true
        } else {
          return false
        }

      },
      checkConstraint(constraints){
        if(!constraints){
          return true
        }
        let player = this.$store.state.myBoard
        let game = this.$store.state.currentGame
        for (let c in constraints) {
          let t = constraints[c]
          if (t.Type == "tech" && ((player.Technologies && player.Technologies.indexOf(t.Value) === -1) || !player.Technologies )){
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
      CheckOperator(a, op, b){
        switch(op) {
        case ">":
          return a > b
        case "<":
          return a < b
        case "=":
          return a == b
        }
        return false
      },
      sendNewAction(action, cd){
        axios.post('http://localhost:8081/Actions', {
          ID: action,
          Value: -1999,
          PlayerID: this.$store.state.playerProfile.ID,
          GameID: this.$store.state.currentGame.GameID,
          })
          .then(function (response) {
            console.log(this.$store.state.currentGame.CurrentTurn);
            console.log(cd);
            Vue.set(this.actionUsed, action, cd + this.$store.state.currentGame.CurrentTurn)
            }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
    }



}
</script>

<style>

.actions {
  text-align: left;
  font-size: 14px;
}

.description {
  font-size: 10px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


</style>
