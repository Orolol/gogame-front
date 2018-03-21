<template>
  <div>
    <div class="page">
      <p>
        Welcome {{this.profile.Name}} {{this.profile.ELO}}
      </p>
    </div>
    <div class="game-lobby" v-if="this.currentGame.State != 'Running'">
      <q-btn class="button create-game" @click="JoinGame">Join Game</q-btn>
      <q-btn class="button game-history">View game history</q-btn>
    </div>
    <Game v-if="this.currentGame.State == 'Running'" :currentGame="this.$store.state.currentGame"></Game>
  </div>
</template>

<script>
import Game from 'components/Game'
import axios from "axios"

export default {
    components: {
      Game
    },
    data() {
        return {
            
        }
    },
    computed: {
      currentGame(){
        return this.$store.state.currentGame
      },
      profile(){
        return this.$store.state.playerProfile
      },
    },
    mounted() {
      if(!this.$store.state.token){
        this.$router.push('Login')
      }
    },
    methods: {
      JoinGame() {
        console.log("JoinGame : ", this.$store.state.playerProfile);

        axios.post('http://localhost:8081/JoinGame', {
          ID: this.profile.ID,
          })
          .then(function (response) {
            this.$store.commit("LOAD_POLICIES", response.data.policies)
            this.$store.commit("LOAD_ACTIONS", response.data.actions)
            this.$store.commit("LOAD_TECH", response.data.technology)
            this.$store.commit("LOAD_EVENTS", response.data.events)
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
        this.initSocket()
      },
      initSocket() {
        if (window["WebSocket"] && this.$store.state.playerProfile) {
            this.conn = new WebSocket("ws://localhost:5001/ws?id=" + this.$store.state.playerProfile.ID);
            console.log("CONNECTED");
            this.conn.onclose = function (evt) {
              console.log("DC");
              this.conn = false
              // clearInterval(time);
            }.bind(this);
            this.conn.onmessage = function (evt) {
                var messages = evt.data.split('\n');
                for (var i = 0; i < messages.length; i++) {
                  if( messages[i] != '"pong"'){
                    this.$store.commit("LOAD_GAME", JSON.parse(messages[i]))
                    if(this.$store.state.currentGame.State =="END"){
                      console.log("END GAME ! ");
                      this.conn.close()
                    } 
                    console.log(JSON.parse(messages[i]))
                  } else {
                    console.log("ECV PONG");
                  }
                }
            }.bind(this);
            // let time=setInterval(function(){
            //   console.log("SEND PONG");
            //   this.conn.send('"pong"')
            //   console.log(this.$store.state.currentGame.State);
            //   if(this.$store.state.currentGame.State =="END"){
            //     console.log("END GAME ! ");
            //     this.conn.close()
            //   }
            // }.bind(this),5000);
        } else {
            console.log("No web socket :(");
        }

      }
    }
  }
</script>
