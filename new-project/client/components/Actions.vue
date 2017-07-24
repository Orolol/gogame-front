<template>
    <div class="actions">
        <div v-for="v, k in actions" >
          <button v-if="!actionUsed[v.ID] || actionUsed[v.ID] < this.$store.state.currentGame.CurrentTurn"
                  @click="sendNewAction(v.ID, v.Cooldown)">{{v.Name}}</button>
       </div>
    </div>
</template>

<script>
import axios from "axios"
import Vue from 'vue';
export default {

    computed: {
      actions: function() {
        return this.$store.state.actions
      },
      actionUsed: function() {
        return {}
      },
    },
    methods: {
      jsonParse(jsonList) {
          return JSON.parse(jsonList)
      },
      sendNewAction(action, cd){
        axios.post('http://localhost:8081/Actions', {
          ID: action,
          Value: 1,
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
  position: absolute;
  left: 20%;
  top: 75%;
  font-size: 14px;
  box-shadow: 5px 0 12px #D8D8D8;

}



</style>
