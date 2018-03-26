<template>
  <div class="log bottom-panel">
    <div class="">
        <div class="">
          <div v-for="v, k in logs" >
            <span>Turn {{v.Turn}}</span> : <span>{{getDescription(v.ActionName)}}</span>
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
      logs: function() {
        return this.$store.state.myBoard.Logs
      },
    },
    methods: {
      getDescription(actionName){
        for (let e in this.$store.state.events) {
          let event = this.$store.state.events[e]
          if(event.ActionName == actionName) {
            return event.Description
          }
        }
      }
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
