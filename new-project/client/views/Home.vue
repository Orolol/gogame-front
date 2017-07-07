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
      <Game></Game>
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
            profile: this.$store.state.playerProfile
        }
    },
    mounted() {
      if(!this.$store.state.token){
        this.$router.push('Login')
      }
    },
    methods: {
      JoinGame() {
        console.log("JoinGame : ", this.$store.state.account);

        axios.post('http://localhost:8081/JoinGame', {
          ID: this.profile.ID,
          })
          .then(function (response) {
            console.log(response);
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>
