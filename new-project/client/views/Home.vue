<template>
  <div>
    <div class="page">

      <div class='homeTutorial'>
        Welcome.

        <p> {{'HomeTutorial1'  | getTranslationShortName}} </p>
        <p> {{'HomeTutorial2'  | getTranslationShortName}}</p>
        <p> {{'HomeTutorial3'  | getTranslationShortName}}</p>
        <p> {{'HomeTutorial4'  | getTranslationShortName}}</p>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    components: {},
    data() {
        return {
            profile: this.$store.state.playerProfile,
            currentGame: this.$store.state.currentGame
        }
    },
    mounted() {
        if (!this.$store.state.token) {
            this.$router.push('Login')
        }
    }
}
</script>
<style>
html,
body,
#app {
    height: 100vh;
}

.homeTutorial {
    width: 50%;
    left: 25%;
    top: 10vh;
    position: relative;
}
</style>
