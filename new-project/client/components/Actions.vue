<template>
    <div class="actions">
        <div v-for="v, k in actions" >
          <button @click="sendNewAction(v.ID)">{{v.Name}}</button>
       </div>
    </div>
</template>

<script>
import axios from "axios"
export default {

    computed: {
      actions: function() {
        return this.$store.state.actions
      },
    },
    methods: {
      jsonParse(jsonList) {
          return JSON.parse(jsonList)
      },
      sendNewPolicy(policy, event){
        axios.post('http://localhost:8081/ChangePolicy', {
          ID: Number(policy),
          Value: Number(event.target.value),
          PlayerID: this.$store.state.playerProfile.ID,
          GameID: this.$store.state.currentGame.GameID,
          })
          .then(function (response) {
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
      sendNewAction(action){
        axios.post('http://localhost:8081/Actions', {
          ID: action,
          Value: 1,
          PlayerID: this.$store.state.playerProfile.ID,
          GameID: this.$store.state.currentGame.GameID,
          })
          .then(function (response) {
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
