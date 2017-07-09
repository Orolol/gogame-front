<template>
  <div>
    <div class="page">
      <p>
        Welcome {{this.profile.Name}} {{this.profile.ELO}}
      </p>
    </div>
    <div class="game-lobby">
      <div class="button create-game" @click="JoinGame">Join Game</div>
      <div class="button game-history">View game history</div>
    </div>
    <div>
      <Game :currentGame="currentGame"></Game>
    </div>
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
            profile: this.$store.state.playerProfile,
            currentGame: {},
        }
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
            this.$store.commit("LOAD_POLICIES", response.data)
            console.log("LOAD_POLICIES", response.data);
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
            }.bind(this);
            this.conn.onmessage = function (evt) {
                var messages = evt.data.split('\n');
                for (var i = 0; i < messages.length; i++) {
                  this.currentGame = JSON.parse(messages[i])
                  console.log(this.currentGame.State);
                  if(this.currentGame.State =="END"){
                    this.conn.close()
                  }
                }
            }.bind(this);
        } else {
            console.log("No web socket :(");
        }

      }
    }
  }
</script>
