<template>
  <div class="policies decision-panel">
    <div class="eco-policies policies">
        <div class="army-panel">
          <div v-for="v, k in ecoPolicies" >
            <span>{{v.Name}}</span>
            <select v-model="v.DefaultValue" @change="sendNewPolicy(v.ActionName, $event)" class="select-policy">
              <option v-for="(elem, key) in v.PossibleValue2" v-bind:value="elem.Value">{{elem.Name}}</option>
            </select>
         </div>
        </div>
    </div>
    <div class="mil-policies policies">
        <div class="army-panel">
          <div v-for="v, k in milPolicies" >
            <span>{{v.Name}}</span>
            <select v-model="v.DefaultValue" @change="sendNewPolicy(v.ActionName , $event)">
              <option v-for="(elem, key) in v.PossibleValue2" v-bind:value="elem.Value">{{elem.Name}}</option>
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
    mounted(){
      for(let i in this.$store.state.myBoard.Policies) {
        for(let j in this.$store.state.ecoPolicies){
          if(this.$store.state.ecoPolicies[j].ActionName == this.$store.state.myBoard.Policies[i].ActionName){
            this.$store.state.ecoPolicies[j].DefaultValue = Number(this.$store.state.myBoard.Policies[i].Value)
          }
        }
        for(let j in this.$store.state.milPolicies){
          if(this.$store.state.milPolicies[j].ActionName == this.$store.state.myBoard.Policies[i].ActionName){
            this.$store.state.milPolicies[j].DefaultValue =  Number(this.$store.state.myBoard.Policies[i].Value)
          }
        }
      }
    },
    methods: {
      jsonParse(jsonList) {
          return JSON.parse(jsonList)
      },
      sendNewPolicy(policy, event){
        console.log(policy, event)
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
  font-size: 14px;
}
.eco-policies {
  bottom:15%;
}
.mil-policies {
  bottom:5%;
}

.select-policy {
padding-left: 0!important;
}

</style>
