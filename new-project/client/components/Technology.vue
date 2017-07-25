<template>
    <div class="technology">
        <div v-for="type, k in technology" >
          {{k}}
            <div v-for="tier, k in type" >
              Tier {{k}}
              <div v-for="vtech, k in tier" >
                <button :disabled="techAlreadyKnown(vtech.ActionName) "
                        @click="sendGetTech(vtech.ID)">{{vtech.Name}} ({{vtech.Cost}})</button>
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
          if(techArray[this.$store.state.technology[tech]["TypeTechnology"]])
            techArray[this.$store.state.technology[tech]["TypeTechnology"]][this.$store.state.technology[tech]["Tier"]].push(this.$store.state.technology[tech])
        }
        return techArray
      },
      knownTechnology() {
        return this.$store.state.myBoard.PlayerTechnology
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
  position: absolute;
  left: 30%;
  top: 65%;
  font-size: 14px;
  box-shadow: 5px 0 12px #D8D8D8;

}



</style>
