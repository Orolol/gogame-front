<template>
    <div class="technology decision-panel">
        <div v-for="type, k in technology" >
          {{k}}
            <div v-for="tier, k in type" >
              Tier {{k}}
              <div v-for="vtech, k in tier" >
                <button :disabled="techAlreadyKnown(vtech.ActionName) || !vtech.isValid || !vtech.isCostValid"
                        @click="sendGetTech(vtech.ActionName)">{{vtech.Name}} ({{vtech.Cost}})</button>
              </div>
            </div>
       </div>
    </div>
</template>

<script>
import axios from "axios"
import Vue from 'vue';
export default {


    computed: {
      technology() {
        let techArray = {
          "INDUS" : {1 : [], 2: [], 3: []},
          "MIL" : {1 : [], 2: [], 3: []},
          "ECO" : {1 : [], 2: [], 3: []},
        }
        for (let tech in this.$store.state.technology) {
          if (this.checkConstraint(this.$store.state.technology[tech].Constraints)) {
            this.$store.state.technology[tech].isValid = true
          } else {
            this.$store.state.technology[tech].isValid = false
          }
          if (this.checkCosts(this.$store.state.technology[tech].Costs)) {
            this.$store.state.technology[tech].isCostValid = true
          } else {
            this.$store.state.technology[tech].isCostValid = false
          }
          if(techArray[this.$store.state.technology[tech]["TypeTechnology"]])
            techArray[this.$store.state.technology[tech]["TypeTechnology"]][this.$store.state.technology[tech]["Tier"]].push(this.$store.state.technology[tech])
        }
        return techArray
      },
      knownTechnology() {
        return this.$store.state.myBoard.Technologies
      },


    },
    methods: {
      jsonParse(jsonList) {
          return JSON.parse(jsonList)
      },
      techAlreadyKnown: function(name) {
        if (this.knownTechnology) {
          if(this.knownTechnology.indexOf(name) === -1){
            return false
          } else {
            return true
          }
        }
        return false
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
          if (t.Type == "tech" && ((this.knownTechnology && this.knownTechnology.indexOf(t.Value) !== -1) || !this.knownTechnology )){
            return false
          } else if (t.Type == "turn") {
            return this.CheckOperator(t.Value, t.Operator,game.CurrentTurn)
          } else if (t.Type == "isWar" && !game.IsWar ){
            return false
          } else if( t.Type == "isNotWar" && game.IsWar ){
            return false
          } else if( t.Type == "Modifier") {
            
            for (key in player.Modifiers ){
              if (key == t.Key ){
                return this.CheckOperator(ft.Value, t.Operator, player.Modifiers[key])
              }
            }
            return false
          } else if( t.Type == "ModifierTurn" ){
            for (key in player.Modifiers ){
              if( key == t.Key) {
                return this.CheckOperator(player.Modifiers[key], t.Operator,game.CurrentTurn)
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
      sendGetTech(tech){
        axios.post('http://localhost:8081/GetTechnology', {
          ID: tech,
          Value: 1,
          PlayerID: this.$store.state.playerProfile.ID,
          GameID: this.$store.state.currentGame.GameID,
          })
          .then(function (response) {
            console.log(response);
            }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
    }



}
</script>

<style>

.technology {
  text-align: left;
  font-size: 14px;

}


</style>
