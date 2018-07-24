<template>
    <div class="page">

        <div class='homeTutorial' v-if="profile.Step < 4 && !showStep">
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
                <div v-for="i in pplist" v-if="showPPS">
                    <img class="profilePic" :src="i.Name + '.png'" />
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
            <div class="warOverview" style='position: initial;'>
                <span class="myProgress"></span>
                <span class="hisProgress"></span>
                <svg :width="warProgress.width" :height="warProgress.height">

                    <rect x="0" y="0" :width="myWarTerritory" :height="warProgress.height" fill="green" class="myTerritory" />

                    <rect :x="myWarTerritory" y="0" :width="hisWarTerritory" :height="warProgress.height" fill="red" class="hisTerritory" />

                    <text :x="warProgress.width - 150" :y="warProgress.height +15" class="progressText">Enemy Country</text>
                    <text :x="myWarTerritory" :y="45" class="progressText">{{15000 | number2digits}}</text>
                    <text :x="myWarTerritory" :y="28" class="progressText">
                        <<<</text>
                            <!-- <text :x="myWarTerritory - 25" :y="28" class="progressText"  v-if="warResult == 'TIE' || warResult == 'WON'" >>>></text> -->
                            <text :x="myWarTerritory - 50" :y="15" class="progressText">{{12000| number2digits}}</text>
                            <text :x="0" :y="warProgress.height +15" class="progressText">Your Country</text>
                </svg>
            </div>

            <p> {{'BasicTutorial2'  | getTranslationShortName}}</p>
            <img class="tutorialImg tuto-actions" src="actions.png">
            <button class="button" @click="goStep(2)">Next step</button>
        </div>

        <div class='homeTutorial' v-if="profile.Step == 2 && showStep">
            Step 2.5: basic tutorial.
            <p> {{'BasicTutorial3'  | getTranslationShortName}}</p>
            <img class="tutorialImg tuto-actions" src="events.png">
            <p> {{'BasicTutorial4'  | getTranslationShortName}}</p>
            <img class="tutorialImg tuto-actions" src="techno.png">

            <button class="button" @click="goStep(3)">Next step</button>
        </div>
        <div class='homeTutorial' v-if="profile.Step == 3 && showStep">
            Step 3: tips.
            <p> {{'Tips1'  | getTranslationDescription}} </p>
            <p> {{'Tips2'  | getTranslationDescription}}</p>
            <p> {{'Tips3'  | getTranslationDescription}}</p>

            <p> {{'Tips4'  | getTranslationDescription}}</p>

            <button class="button" @click="goStep(4)">Understood, i'm ready !</button>

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
            pplist: [],
            showPPS: false,
            warProgress: {
                width: window.innerWidth / 2,
                height: window.innerHeight / 20
            },
            lastTurn: {
                myTerritory: 100,
                hisTerritory: 100
            },
            warResult: 'TIE'
        }
    },
    computed: {
        myWarTerritory() {
            return 90 * (this.warProgress.width / 2 / 100)
        },
        hisWarTerritory() {
            return 110 * (this.warProgress.width / 2 / 100)
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
                                this.profile.Step = n
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
    top: 5vh;
    position: relative;
}

.tutorialImg {
    max-height: 45vh;
}
</style>
