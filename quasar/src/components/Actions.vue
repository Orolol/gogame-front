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
        return this.$store.state.actions
      },

    },
    methods: {
      jsonParse(jsonList) {
          return JSON.parse(jsonList)
      },
      actionUsedCheck: function(id) {
        return !this.actionUsed[id] || this.actionUsed[id] < this.$store.state.currentGame.CurrentTurn
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
