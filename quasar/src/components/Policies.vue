<template>
  <div class="policies decision-panel">
    <div class="eco-policies policies">
        <div class="army-panel">
          <div v-for="v, k in ecoPolicies" >
            <span>{{v.Name}}</span>
            <q-select v-model="v.DefaultValue" @change="sendNewPolicy(v.ActionName , $event)" :options="Qparse(v.PossibleValue)" />
         </div>
        </div>
    </div>
    <div class="mil-policies policies">
        <div class="army-panel">
          <div v-for="v, k in milPolicies" >
            <span>{{v.Name}}</span>
            <q-select v-model="v.DefaultValue" @change="sendNewPolicy(v.ActionName , $event)" :options="Qparse(v.PossibleValue)" />
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {

    data(){
      return {
        select:  null,
      }
    },
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
      Qparse(possibleValue){
        let obj = JSON.parse(possibleValue)
        let ret = []
        console.log(obj)
        for (let x in obj) {
          let a = {"label" : x , "value": String(obj[x])}
          ret.push(a)
        }
        console.log(ret)
        return ret
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
