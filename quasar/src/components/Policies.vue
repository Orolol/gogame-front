<template>
  <div class="policies decision-panel">
    <div class="eco-policies policies">
        <div class="army-panel">
          <div v-for="v, k in ecoPolicies" >
            <span>{{v.Name}}</span>
            <q-select  v-model="v.Value" :options="Qparse(v.PossibleValue2)" @change="sendNewPolicy()" />
         </div>
        </div>
    </div>
    <div class="mil-policies policies">
        <div class="army-panel">

          <div v-for="v, k in milPolicies" >
            <span>{{v.Name}}</span>
            <q-select v-model="v.Value" :options="Qparse(v.PossibleValue2)" />
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
    watch: {
      ecoPolicies: {
        handler: function (after, before) {
          console.log('CACHANGE BORDDEL')
          for(let i in before){
            for(let j in after){
              console.log("TEST BEFORE ", before[i].ActionName, "AFTER",  after[j].ActionName)
              console.log("TEST BEFORE ", before[i].DefaultValue, "AFTER",  after[j].DefaultValue)
              if(before[i].ActionName == after[j].ActionName && before[i].DefaultValue != after[j].DefaultValue){
                sendNewPolicy(after[j], after[j].DefaultValue)
              }
            }
          }
          console.log("BEFORE ", before, "AFTER", after)
        },
        deep: true,
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
    created() {
      console.log('mounted')
      for (let e in this.ecoPolicies ){
        this.ecoPolicies[e].Value = this.ecoPolicies[e].DefaultValue
      }
      for (let e in this.milPolicies ){
        this.milPolicies[e].Value = this.milPolicies[e].DefaultValue
      }
     
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
        console.log(policy, event)
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
