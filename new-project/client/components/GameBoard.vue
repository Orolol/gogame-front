<template>
  <div >
    <div class="myBoard" v-if="myBoard">
        <div class="army-panel">
          <div v-for="v, k in myBoard.Army" >
              <label>{{k}}</label>
              <span>{{v}}</span>
          </div>
        </div>

        <div class="pop-panel">
        </div>

    </div>
    <div class="hisBoard" v-if="hisBoard">
        <div class="army-panel">
          <div v-for="v, k in hisBoard.Army" >
              <label>{{k}}</label>
              <span>{{v}}</span>
          </div>
        </div>

        <div class="pop-panel">
        </div>

    </div>
  </div>
</template>

<script>
export default {

    props: ['currentGame'],
    computed: {
      myBoard: function() {
        for (let player in this.currentGame['ListPlayers']){
          console.log("MYBOARD LOOP", this.currentGame['ListPlayers'][player]);
          if(this.currentGame['ListPlayers'][player]['PlayerID'] == this.$store.state.playerProfile.ID){
            console.log("That's me ! ");
            return this.currentGame['ListPlayers'][player]
          }
        }
      },
      hisBoard(){
        for (let player in this.currentGame['ListPlayers']){
          if(this.currentGame['ListPlayers'][player]['PlayerID'] != this.$store.state.playerProfile.ID){
            console.log("That's him ! ");
            return this.currentGame['ListPlayers'][player]
          }
        }
      },
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
