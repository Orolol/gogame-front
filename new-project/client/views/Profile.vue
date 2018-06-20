<template>
    <div>
        <div class="page">
            <div class="profile">
                <div class="profileInfo">
                    <p>{{profile.Name}}</p>
                    <p>ELO : {{profile.ELO}}</p>
                </div>
                <div class="profileInfo">
                    <label>Login</label>
                    <input type="text" v-model="profile.Login" disabled/>
                </div>
                <div class="profileInfo">
                    <label>Password</label>
                    <input type="password" v-model="profile.Password" required/>
                </div>
                <div class="profileInfo">
                    <label>Repeat Password</label>
                    <input type="password" v-model="profile.Password2" required/>
                </div>
                <div class="profileInfo">
                    <label>Nickname</label>
                    <input type="text" v-model="profile.Name" required/>
                </div>
                <br>
                <button @click="editAccount"> Save account </button>
                <div class="error-box" v-if="isError">
                    {{errorMessage}}
                </div>
            </div>
        </div>
        <div class="gameHistory">
            <span class="historyTitle">Game History</span>
            <div v-for="v in cmpList" class="historyList">
                <span class="historyData"> {{v.Created_at | formatDate}} </span>
                <span class="historyData" :class="{winner: v.WinnerNick == profile.Name}"> {{v.WinnerNick }} </span>
                <span class="historyData " :class="{loser: v.LoserNick == profile.Name}"> {{v.LoserNick }} </span>
                <span class="historyData"> {{v.ELODiff }} </span>
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
        editAccount() {
            let baseUrl
            switch (process.env.NODE_ENV) {
                case 'production':
                    baseUrl = 'http://0r0.fr:8081'
                case 'development':
                    baseUrl = 'http://localhost:8081'
            }
            axios
                .post(baseUrl + '/EditAccount', {
                    ...this.profile
                })
                .then(function(response) {
                    console.log(response)
                })
                .catch(function(error) {
                    console.log(error)
                })
        },
        getHistory() {
            let baseUrl
            switch (process.env.NODE_ENV) {
                case 'production':
                    baseUrl = 'http://0r0.fr:8081'
                case 'development':
                    baseUrl = 'http://localhost:8081'
            }
            axios
                .post(baseUrl + '/GetHistory', {
                    ...this.profile
                })
                .then(
                    function(response) {
                        this.gameList = response.data
                    }.bind(this)
                )
                .catch(function(error) {
                    console.log('AAAAAAAAAAAAAAA', error)
                })
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
.profile {
    position: relative;
    left: 35%;
    width: 30%;
}
.profileInfo {
    padding: 5px;
    /* width: 30%; */
    margin-bottom: 20px;
}
.profileInfo label {
    float: left;
}
.profileInfo input {
    float: right;
}

.gameHistory {
    padding-top: 50px;
}

.profile-name {
    width: 10%;
}

.historyList {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-bottom: 8px;
}
.historyTitle {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-bottom: 20px;
}

.winner {
    color: green;
    font-weight: 600;
}

.loser {
    color: red;
    font-weight: 600;
}

.historyData {
    display: flex;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid grey;
}
</style>
