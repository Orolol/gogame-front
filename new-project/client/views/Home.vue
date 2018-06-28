<template>
    <div class="page">

      <div class='homeTutorial' v-if="profile.Step < 3 && !showStep">
        Welcome.

        <p> {{'HomeTutorial1'  | getTranslationShortName}} </p>
        <p> {{'HomeTutorial2'  | getTranslationShortName}}</p>
        <p> {{'HomeTutorial3'  | getTranslationShortName}}</p>
        <p> {{'HomeTutorial4'  | getTranslationShortName}}</p>

        <button class="button" @click="showStepTuto">Ok, let's start !</button>

      </div>
      <div class='homeTutorial' v-if="profile.Step == 0 && showStep">
        Step 1: complete your profile.
                <div class="profileInfo">
                    <img class="profilePic" :src="profile.ProfilePic + '.png'">
                    <button class="button" @click="showPPS = !showPPS">Edit</button>
                    <div v-for="i in pplist"  v-if="showPPS">
                        <img class="profilePic" :src="i.Name + '.png'"/>
                        <button class="button" @click="profile.ProfilePic = i.Name">Select</button>
                    </div>
                </div>
                <div class="profileInfo">
                    <label>Nickname</label>
                    <input type="text" v-model="profile.Name" required/>
                </div>
      

        <button class="button" @click="goStep(1)">Next step</button>

      </div>
      <div class='homeTutorial' v-if="profile.Step == 1 && showStep">
        Step 2: basic tutorial.
         <p> {{'BasicTutorial1'  | getTranslationShortName}} </p>
        <p> {{'BasicTutorial2'  | getTranslationShortName}}</p>
        <p> {{'BasicTutorial3'  | getTranslationShortName}}</p>
        <p> {{'BasicTutorial4'  | getTranslationShortName}}</p>
      

        <button class="button" @click="goStep(2)">Next step</button>

      </div>
      <div class='homeTutorial' v-if="profile.Step == 2 && showStep">
        Step 3: tips.
        <p> {{'Tips1'  | getTranslationShortName}} </p>
        <p> {{'Tips2'  | getTranslationShortName}}</p>
        <p> {{'Tips3'  | getTranslationShortName}}</p>
        <p> {{'Tips4'  | getTranslationShortName}}</p>
      

        <button class="button" @click="goStep(3)">Understood, i'm ready !</button>

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
            currentGame: this.$store.state.currentGame,
            showStep: false,
            pplist: []
        }
    },
    mounted() {
        if (!this.$store.state.token) {
            this.$router.push('Login')
        }
        if (this.profile.Step < 3) {
            this.getPP()
        }
    },
    methods: {
        showStepTuto() {
            this.showStep = true
        },
        goStep(n) {
            this.profile.Step = n
            let baseUrl
            if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081/auth'
            if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081/auth'
            this.$store.dispatch('getToken').then(
                function(token) {
                    axios({
                        url: baseUrl + '/EditAccount',
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + token },
                        data: {
                            ...this.profile
                        }
                    })
                        .then(
                            function(response) {
                                console.log(response)
                            }.bind(this)
                        )
                        .catch(function(error) {
                            console.log(error)
                        })
                }.bind(this)
            )
        },
        getPP() {
            let baseUrl
            if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081'
            if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081'
            this.$store.dispatch('getToken').then(
                function(token) {
                    axios({
                        url: baseUrl + '/GetPP',
                        method: 'GET',
                        headers: { Authorization: 'Bearer ' + token }
                    })
                        .then(
                            function(response) {
                                this.pplist = d.data
                            }.bind(this)
                        )
                        .catch(function(error) {
                            console.log(error)
                        })
                }.bind(this)
            )
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
