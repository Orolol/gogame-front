<template>
    <div class="gameLobby qpage">
        <div class="playerSmallProfile">
            <img class="profilePic" :src="profile.ProfilePic + '.png'">
            <p>{{profile.Name}}</p>
            <p>ELO : {{profile.ELO}}</p>
            <div v-if="status == 'off' || this.currentGame.State == 'End'">
                <button class="button" @click="JoinGame">Join PVP Game</button>
                <button class="button" @click="JoinGameAi">Join AI Game</button>

            </div>
            <div v-if="status == 'pending'">
                <button class="button" @click="LeaveQueue">Looking for an opponent. Click to cancel.</button>
            </div>
        </div>
        <div class="playerSmallEnemyProfile" v-if="enemyProfile">
            <img class="profilePic" :src="enemyProfile.ProfilePic + '.png'">
            <p>{{enemyProfile.Name}}</p>
            <p>ELO : {{enemyProfile.ELO}}</p>
        </div>
        <gameBoard></gameBoard>
    </div>
</template>

<script>
import gameBoard from '../components/GameBoard'
import axios from 'axios'
export default {
    name: 'Game',
    data() {
        return {
            status: 'off'
        }
    },
    components: {
        gameBoard
    },
    computed: {
        currentGame() {
            return this.$store.state.currentGame
        },
        profile() {
            return this.$store.state.playerProfile
        },
        enemyProfile() {
            return this.$store.state.enemyProfile
        }
    },
    created() {
        if (!this.$store.state.token) {
            this.$router.push('Login')
        }
    },
    methods: {
        JoinGame() {
            this.status = 'pending'
            let baseUrl
            if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081/auth'
            if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081/auth'

            this.$store.dispatch('getToken').then(
                function(token) {
                    axios({
                        url: baseUrl + '/JoinGame',
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + token },
                        data: {
                            ID: this.profile.ID
                        }
                    })
                        .then(
                            function(response) {
                                let cats = {}
                                for (let i in response.data.policies) {
                                    let pl = response.data.policies[i]
                                    if (!cats[pl.TypePolicy]) {
                                        cats[pl.TypePolicy] = {}
                                    }
                                    if (!cats[pl.TypePolicy][pl.SubType]) {
                                        cats[pl.TypePolicy][pl.SubType] = {}
                                    }
                                    if (!cats[pl.TypePolicy][pl.SubType]['policies']) {
                                        cats[pl.TypePolicy][pl.SubType]['policies'] = []
                                    }
                                    cats[pl.TypePolicy][pl.SubType]['policies'].push(pl)
                                }
                                for (let i in response.data.actions) {
                                    let pl = response.data.actions[i]
                                    if (!cats[pl.Type]) {
                                        cats[pl.Type] = {}
                                    }

                                    if (!cats[pl.Type][pl.SubType]) {
                                        cats[pl.Type][pl.SubType] = {}
                                    }
                                    if (!cats[pl.Type][pl.SubType]['actions']) {
                                        cats[pl.Type][pl.SubType]['actions'] = []
                                    }
                                    cats[pl.Type][pl.SubType]['actions'].push(pl)
                                }
                                this.$store.commit('LOAD_BOARD_NEW', cats)
                                this.$store.commit('LOAD_POLICIES', response.data.policies)
                                this.$store.commit('LOAD_ACTIONS', response.data.actions)
                                this.$store.commit('LOAD_TECH', response.data.technology)
                                this.$store.commit('LOAD_EVENTS', response.data.events)
                            }.bind(this)
                        )
                        .catch(function(error) {
                            this.$router.push('/Login')
                            console.log(error)
                        })
                }.bind(this)
            )

            this.initSocket()
        },
        LeaveQueue() {
            let baseUrl
            if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081/auth'
            if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081/auth'
            this.$store.dispatch('getToken').then(
                function(token) {
                    axios({
                        url: baseUrl + '/LeaveQueue',
                        method: 'GET',
                        headers: { Authorization: 'Bearer ' + token }
                    }).then(
                        function(d) {
                            this.status = 'off'
                        }.bind(this)
                    )
                }.bind(this)
            )
        },
        JoinGameAi() {
            this.status = 'pending'
            let baseUrl
            if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081/auth'
            if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081/auth'
            this.$store.dispatch('getToken').then(
                function(token) {
                    axios({
                        url: baseUrl + '/JoinGameAi',
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + token },
                        data: {
                            ID: this.profile.ID
                        }
                    })
                        .then(
                            function(response) {
                                let cats = {}
                                for (let i in response.data.policies) {
                                    let pl = response.data.policies[i]
                                    if (!cats[pl.TypePolicy]) {
                                        cats[pl.TypePolicy] = {}
                                    }
                                    if (!cats[pl.TypePolicy][pl.SubType]) {
                                        cats[pl.TypePolicy][pl.SubType] = {}
                                    }
                                    if (!cats[pl.TypePolicy][pl.SubType]['policies']) {
                                        cats[pl.TypePolicy][pl.SubType]['policies'] = []
                                    }
                                    cats[pl.TypePolicy][pl.SubType]['policies'].push(pl)
                                }
                                for (let i in response.data.actions) {
                                    let pl = response.data.actions[i]
                                    if (!cats[pl.Type]) {
                                        cats[pl.Type] = {}
                                    }

                                    if (!cats[pl.Type][pl.SubType]) {
                                        cats[pl.Type][pl.SubType] = {}
                                    }
                                    if (!cats[pl.Type][pl.SubType]['actions']) {
                                        cats[pl.Type][pl.SubType]['actions'] = []
                                    }
                                    cats[pl.Type][pl.SubType]['actions'].push(pl)
                                }
                                this.$store.commit('LOAD_BOARD_NEW', cats)
                                this.$store.commit('LOAD_POLICIES', response.data.policies)
                                this.$store.commit('LOAD_ACTIONS', response.data.actions)
                                this.$store.commit('LOAD_TECH', response.data.technology)
                                this.$store.commit('LOAD_EVENTS', response.data.events)
                            }.bind(this)
                        )
                        .catch(function(error) {
                            this.$router.push('/Login')
                            console.log(error)
                        })
                }.bind(this)
            )
            this.initSocket()
        },
        initSocket() {
            let baseUrl
            if (process.env.NODE_ENV == 'production') baseUrl = '0r0.fr'
            if (process.env.NODE_ENV == 'development') baseUrl = 'localhost'

            if (window['WebSocket'] && this.$store.state.playerProfile) {
                this.conn = new WebSocket('ws://' + baseUrl + ':5001/ws?id=' + this.$store.state.playerProfile.ID)
                console.log('CONNECTED')
                this.conn.onclose = function(evt) {
                    console.log('DC')
                    this.conn = false
                    // clearInterval(time);
                }.bind(this)
                this.conn.onmessage = function(evt) {
                    this.status = 'playing'
                    var messages = evt.data.split('\n')
                    for (var i = 0; i < messages.length; i++) {
                        if (messages[i] != '"pong"') {
                            this.$store.commit('LOAD_GAME', JSON.parse(messages[i]))
                            if (!this.$store.state.enemyProfile) {
                                let id
                                if (this.$store.state.currentGame.ListPlayers[0].PlayerID == this.$store.state.playerProfile.ID)
                                    id = JSON.parse(messages[i]).ListPlayers[1].PlayerID
                                else id = JSON.parse(messages[i]).ListPlayers[0].PlayerID
                                if (id && id > 0) {
                                    this.$store.dispatch('getToken').then(
                                        function(token) {
                                            let baseUrlTemp
                                            if (process.env.NODE_ENV == 'production') baseUrlTemp = 'http://0r0.fr:8081/auth'
                                            if (process.env.NODE_ENV == 'development') baseUrlTemp = 'http://localhost:8081/auth'
                                            axios({
                                                url: baseUrlTemp + '/GetEnemyInfos/' + id,
                                                method: 'GET',
                                                headers: { Authorization: 'Bearer ' + token }
                                            }).then(
                                                function(d) {
                                                    this.$store.state.enemyProfile = d.data
                                                }.bind(this)
                                            )
                                        }.bind(this)
                                    )
                                }
                            } else {
                            }
                            if (this.$store.state.currentGame.State == 'End') {
                                this.$store.state.enemyProfile = null
                                this.$store.dispatch('getToken').then(
                                    function(token) {
                                        let baseUrlTemp
                                        if (process.env.NODE_ENV == 'production') baseUrlTemp = 'http://0r0.fr:8081/auth'
                                        if (process.env.NODE_ENV == 'development') baseUrlTemp = 'http://localhost:8081/auth'
                                        axios({
                                            method: 'POST',
                                            headers: { Authorization: 'Bearer ' + token },
                                            url: baseUrlTemp + '/GetProfileInfos'
                                        }).then(
                                            function(response) {
                                                console.log('GET PROFILE AGAIN OK')
                                                this.$store.commit('LOAD_PROFILE', response.data)
                                            }.bind(this)
                                        )
                                    }.bind(this)
                                )
                                console.log('END GAME ! ')
                                this.conn.close()
                            }
                        } else {
                            console.log('ECV PONG')
                        }
                    }
                }.bind(this)
            } else {
                console.log('No web socket :(')
            }
        }
    }
}
</script>

<style >
.counter {
    margin: 100px auto;
    border-radius: 3px;
    width: 200px;
    height: 200px;
    text-align: center;
    line-height: 200px;
    font-size: 5rem;
    background-color: #f0f0f0;
    user-select: none;
}

.gameLobby {
    display: flex;
}

.qpage {
    display: flex;
    height: 80vh;
}

.playerSmallProfile {
    width: 20%;
    top: 1%;
    position: absolute;
    z-index: 99;
    text-align: center;
    border: 1px solid grey;
    border-radius: 8px;
    left: 5px;
}
.playerSmallEnemyProfile {
    width: 20%;
    top: 1%;
    position: absolute;
    z-index: 99;
    text-align: center;
    border: 1px solid grey;
    border-radius: 8px;
    right: 5px;
}
</style>
