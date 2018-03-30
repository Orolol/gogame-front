<template>
  <div>
    <div class="page">
      Welcome.
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
    components: {
    },
    data() {
        return {
            profile: this.$store.state.playerProfile,
            currentGame: this.$store.state.currentGame,
        }
    },
    mounted() {
      if(!this.$store.state.token){
        this.$router.push('Login')
      }
    },

  }
</script>
<style>

html, body, #app {
  height: 100vh;
}

</style>
