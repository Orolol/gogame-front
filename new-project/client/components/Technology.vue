<template>
    <div class="technology">
        <div class="technology-switch" >
          <button  v-for="type, t in technology" class="button" @click="switchType(t)">{{t}}</button>
        </div>
        <div v-for="type, t in technology" >
            <div v-for="tier, k in type" v-if="currentType==t" >
              Tier {{k}}
              <div class="technology-button">
                <button v-bind:key="vtech.Name" v-for="vtech, k in tier" class="button" :disabled="techAlreadyKnown(vtech.ActionName) || !vtech.isValid || !vtech.isCostValid"
                        @click="sendGetTech(vtech.ActionName)">{{vtech.Name}} ({{vtech.Costs[0].Value}})</button>
              </div>
            </div>
       </div>
    </div>
</template>

<script>
import axios from "axios"
import Vue from 'vue';
export default {
    data(){
      return {
        currentType : "INDUS",
      }
    },

    computed: {
      technology() {
        let techArray = { }

        for (let tech in this.$store.state.technology) {
          let t = this.$store.state.technology[tech]
          if(!techArray[t.TypeTechnology]) {
            techArray[t.TypeTechnology] = {}
          } 
          if(!techArray[t.TypeTechnology][t.Tier]){
            techArray[t.TypeTechnology][t.Tier] = []
          }
          if (this.checkConstraint(t.Constraints)) {
            t.isValid = true
          } else {
            t.isValid = false
          }
          if (this.checkCosts(t.Costs)) {
            t.isCostValid = true
          } else {
            t.isCostValid = false
          }
          if(techArray[t.TypeTechnology])
            techArray[t.TypeTechnology][t.Tier].push(t)
        }
        return techArray
      },
      knownTechnology() {
        return this.$store.state.myBoard.Technologies
      },


    },
    methods: {
      switchType(n){
        this.currentType = n
      },
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
          if (t.Type == "tech" && ((this.knownTechnology && this.knownTechnology.indexOf(t.Value) === -1) || !this.knownTechnology )){
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

.technology-switch {
  justify-content: center;
  display: flex;
}
.technology-button {
  display: flex;
}



.technology {
  text-align: left;
  font-size: 14px;

}


</style>
