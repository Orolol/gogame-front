<template>
    <div class="gameLobby qpage">
        <div class="playerSmallProfile">
            <p>{{profile.Name}}</p>
            <p>ELO : {{profile.ELO}}</p>
            <div v-if="status == 'off' || this.currentGame.State == 'End'">
                <button class="button" @click="JoinGame">Join PVP Game</button>
                <button class="button" @click="JoinGameAi">Join AI Game</button>
            </div>
            <div v-if="status == 'pending'">
                Looking for an opponent
            </div>
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
            if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081'
            if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081'
            axios
                .post(baseUrl + '/JoinGame', {
                    ID: this.profile.ID
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
                    console.log(error)
                })
            this.initSocket()
        },
        JoinGameAi() {
            this.status = 'pending'
            let baseUrl
            if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081'
            if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081'
            axios
                .post(baseUrl + '/JoinGameAi', {
                    ID: this.profile.ID
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
                    console.log(error)
                })
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
                            if (this.$store.state.currentGame.State == 'End') {
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
    position: fixed;
    z-index: 99;
    text-align: center;
    border: 1px solid grey;
    border-radius: 8px;
}
</style>
