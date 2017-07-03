<template>
  <div class="page">
    <p>
      Welcome
    </p>
  </div>
  <div class="game-lobby">
    <div class="button create-game" @click="JoinGame">Join Game</div>
    <div class="button game-history">View game history</div>
  </div>
</template>

<script>
import Counter from 'components/Counter'

export default {
  mounted() {
    if(!this.$store.state.token){
      console.log("We don't have token :(");
      this.$router.push('Login')
    },
    methods: {
      JoinGame() {
        console.log("JoinGame : ", this.$store.state.account);
      }
    }
  }
}
</script>
