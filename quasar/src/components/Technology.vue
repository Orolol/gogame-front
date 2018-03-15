<template>
    <div class="technology decision-panel">
      Research
      <q-tabs>
          <q-tab slot="title" :name="k"  v-for="type, k in technology" >{{k}}</q-tab>
          <q-tab-pane :name="k" v-for="type, k in technology" >
              <div v-for="tier, k in type" >
                Tier {{k}}
                <div v-for="vtech, k in tier" >
                  <q-btn :disabled="techAlreadyKnown(vtech.ActionName) "
                          @click="sendGetTech(vtech.ActionName)">
                  <span>{{vtech.Name}}</span> 
                  <span v-if="!techAlreadyKnown(vtech.ActionName)">({{vtech.Costs[0].Value}})</span>
                  <span v-else> (Done) </span>
                  
                  </q-btn>
                </div>
              </div>
        </q-tab-pane>
       </q-tabs>
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
  font-size: 14px;

}



</style>
