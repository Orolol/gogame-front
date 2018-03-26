<template>
  <div class="policies decision-panel">
    <div class="eco-policies policies">
        <div class="army-panel">
          <div v-for="v, k in ecoPolicies" >
            <span>{{v.Name}}</span>
            <q-select  v-model="v.DefaultValue" :value="v.Value" :options="Qparse(v.PossibleValue2)" />
         </div>
        </div>
    </div>
    <div class="mil-policies policies">
        <div class="army-panel">

          <div v-for="v, k in milPolicies" >
            <span>{{v.Name}}</span>
            <q-select v-model="v.DefaultValue" :value="v.Value" :options="Qparse(v.PossibleValue2)" />
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
        currentPolicies: [],

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
      cmpCurrentPolicies(){
        return this.currentPolicies
      }
    },
    mounted() {
      // console.log('mounted')
      // for (let e in this.ecoPolicies ){
      //   for (let pv in this.ecoPolicies[e].PossibleValue2) {
      //     if (this.ecoPolicies[e].PossibleValue2[pv].IsDefault) {
      //       let a = {}
      //       a['value']= this.ecoPolicies[e].PossibleValue2[pv].Value
      //       a['label']= this.ecoPolicies[e].PossibleValue2[pv].ActionName
      //       this.currentPolicies.push(a)
      //       // this.currentPolicies[this.ecoPolicies[e].PossibleValue2[pv].ActionName] = this.ecoPolicies[e].PossibleValue2[pv].Value
      //     }
      //   }
      // }
      // for (let e in this.milPolicies ){
      //   for (let pv in this.milPolicies[e].PossibleValue2) {
      //     if (this.milPolicies[e].PossibleValue2[pv].IsDefault) {
      //       this.currentPolicies[this.milPolicies[e].PossibleValue2[pv].ActionName] = this.milPolicies[e].PossibleValue2[pv].Value
      //     }
      //   }
      // }
    },
    methods: {
      jsonParse(jsonList) {
          return JSON.parse(jsonList)
      },
      Qparse(possibleValue){
        let ret = []
        for (let x in possibleValue) {
          let a = {"label" : possibleValue[x].Name , "value":possibleValue[x].Value }
          ret.push(a)
        }
        return ret
      },
      sendNewPolicy(policy, event){
        // axios.post('http://localhost:8081/ChangePolicy', {
        //   ID: policy,
        //   Value: Number(event.target.value),
        //   PlayerID: this.$store.state.playerProfile.ID,
        //   GameID: this.$store.state.currentGame.GameID,
        //   })
        //   .then(function (response) {
        //   }.bind(this))
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        
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
