<template>
    <div class="page">

        <div class="gameHistory">
            <span class="historyTitle">Game History</span>
            <div v-for="v, k in cmpList" class="historyList">
                <span class=" historyData "> {{ k + 1 }} </span>
                <span class="historyData profile-name" :class="{winner: v.Name == profile.Name}"> {{v.Name}} </span>
                <span class=" historyData "> {{v.ELO }} </span>
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
            currentGame: this.$store.state.currentGame,
            isError: false,
            gameList: []
        }
    },
    mounted() {
        if (!this.$store.state.token) {
            this.$router.push('Login')
        }
        this.getHistory()
    },
    computed: {
        cmpList() {
            return this.gameList
        }
    },
    methods: {
        getHistory() {
            let baseUrl
            if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081/auth'
            if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081/auth'
            this.$store.dispatch('getToken').then(
                function(token) {
                    axios({ url: baseUrl + '/GetLeaderBoard', method: 'POST', headers: { Authorization: 'Bearer ' + token } })
                        .then(
                            function(response) {
                                this.gameList = response.data
                            }.bind(this)
                        )
                        .catch(
                            function(error) {
                                this.$store.state.playerProfile = null
                                this.$store.state.token = null
                                localStorage.setItem('gogameToken', null)
                                localStorage.setItem('gogameProfile', null)
                            }.bind(this)
                        )
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
</style>
