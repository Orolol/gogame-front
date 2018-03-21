<template>
  <div class="decisionBoard">
    <div class="decision-panel" v-if="myBoard">
        <div class="army-panel">
          <div v-for="v, k in myBoard.Army" >
              <label>{{k}}</label>
              <span>{{nFormatter(v, 2)}}</span>
          </div>
        </div>
        <br>
        <div class="army-panel">
          <div v-for="v, k in myBoard.Economy" >
              <label>{{k}}</label>
              <span>{{nFormatter(v, 2)}}</span>
          </div>
        </div>
        <br>
        <div class="army-panel">
          <div v-for="v, k in myBoard.Civilian" >
              <label>{{k}}</label>
              <span>{{nFormatter(v, 2)}}</span>
          </div>
        </div>
        <br>


        <div class="pop-panel">
        </div>

    </div>
        <policies></policies>
        <actions></actions>
        <technology></technology>
        
        
    <div class="decision-panel" v-if="hisBoard">
        <div class="army-panel">
          <div v-for="v, k in hisBoard.Army" >
              <label>{{k}}</label>
              <span>{{nFormatter(v, 2)}}</span>
          </div>
        </div>

        <div class="pop-panel">
        </div>

    </div>
    <event-log></event-log>
  </div>
</template>

<script>
import technology from "./Technology"
import actions from "./Actions"
import policies from "./Policies"
import eventLog from "./EventLog"

export default {
    components: {
      actions,
      policies,
      technology,
      eventLog,
    },
    props: ['currentGame'],
    computed: {
      myBoard: function() {
        for (let player in this.currentGame['ListPlayers']){
          if(this.currentGame['ListPlayers'][player]['PlayerID'] == this.$store.state.playerProfile.ID){
            this.$store.commit("LOAD_BOARD", this.currentGame['ListPlayers'][player])
            return this.currentGame['ListPlayers'][player]
          }
        }
      },
      hisBoard(){
        for (let player in this.currentGame['ListPlayers']){
          if(this.currentGame['ListPlayers'][player]['PlayerID'] != this.$store.state.playerProfile.ID){
            return this.currentGame['ListPlayers'][player]
          }
        }
      },
    },
    methods: {
      nFormatter: function (num, digits) {
          var si = [
            { value: 1E18, symbol: "E" },
            { value: 1E15, symbol: "P" },
            { value: 1E12, symbol: "T" },
            { value: 1E9,  symbol: "G" },
            { value: 1E6,  symbol: "M" },
            { value: 1E3,  symbol: "k" }
          ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
          for (i = 0; i < si.length; i++) {
            if (num >= si[i].value) {
              return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
            }
          }
          return num.toFixed(digits).replace(rx, "$1");
        }
      },


}
</script>

<style>

.myBoard {
  text-align: left;
  position: absolute;
  left: 50px;
  font-size: 14px;
  box-shadow: 5px 0 12px #D8D8D8;

}
.hisBoard {
  text-align: right;
  position: absolute;
  right: 50px;
  font-size: 14px;
  box-shadow: 0 5px 12px #D8D8D8;
}

</style>
