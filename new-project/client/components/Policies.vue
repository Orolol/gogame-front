<template>
  <div >
    <div class="eco-policies policies">
        <div class="army-panel">
          <div v-for="v, k in ecoPolicies" >
            <span>{{v.Name}}</span>
            <select v-model="v.DefaultValue" @change="sendNewPolicy(v.ID , $event)">
              <option v-for="elem in jsonParse(v.PossibleValue)" v-bind:value="elem">{{elem}}</option>
            </select>
         </div>
        </div>
    </div>
    <div class="mil-policies policies">
        <div class="army-panel">
          <div v-for="v, k in milPolicies" >
            <span>{{v.Name}}</span>
            <select v-model="v.DefaultValue" @change="sendNewPolicy(v.ID , $event)">
              <option  v-for="elem in jsonParse(v.PossibleValue)" v-bind:value="elem">{{elem}}</option>
            </select>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {

    computed: {
      ecoPolicies: function() {
        return this.$store.state.ecoPolicies
      },
      milPolicies: function() {
        return this.$store.state.milPolicies
      },
    },
    methods: {
      jsonParse(jsonList) {
          return JSON.parse(jsonList)
      },
      sendNewPolicy(policy, event){
        axios.post('http://localhost:8081/ChangePolicy', {
          ID: policy,
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
    }



}
</script>

<style>

.policies {
  text-align: left;
  left: 50px;
  font-size: 14px;
  box-shadow: 5px 0 12px #D8D8D8;

}
.eco-policies {
  position: absolute;
  bottom:10%;
}
.mil-policies {
  position: absolute;
  bottom:5%;
}


</style>
