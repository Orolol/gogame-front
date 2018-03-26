<template>
    <div class="actions decision-panel">
        <div v-for="v, k in actions" >
          <q-btn :disabled="!actionUsedCheck(v.ID)"
                  @click="sendNewAction(v.ActionName, v.Cooldown)">{{v.Name}}</q-btn>
          <br>
          <span class="description">{{v.Description}}</span>
          <span v-if="!actionUsedCheck(v.ID)">{{ actionUsed[v.ID] - $store.state.currentGame.CurrentTurn}}</span>
       </div>
    </div>
</template>

<script>
import axios from "axios"
import Vue from 'vue';
export default {
    data() {
      return {
        actionUsed : {}
      }
    },
    computed: {
      actions: function() {
        let acts = []
        for (let action in this.$store.state.actions){
          let a = this.$store.state.actions[action]
          if( this.checkCosts(a.Costs) ) {
            a.isCostOk = true
          } else {
            a.isCostOk = false
          }
          if( this.checkConstraint(a.Constraints) ) {
            acts.push(a)
          } 
        }
        return acts
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
        	for (let cost in costs) {
            let c = costs[cost]
            switch (c.Type) {
            case "money":
              if (player.Economy.Money < c.Value) {
                return false
              }
            case "science":
              if (player.Civilian.NbResearchPoint < c.Value) {
                return false
              }
            case "manpower":
              if (player.Civilian.NbManpower < c.Value) {
                return false
              }
            case "morale":
              if( player.Army.Morale < c.Value) {
                return false
              }

            }
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
          if (t.Type == "tech" && ((this.knownTechnology && this.knownTechnology.indexOf(t.Value) !== -1) || !this.knownTechnology )){
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



</style>
