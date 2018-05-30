<template>
    <div class="gameLobby qpage">
      <div v-if="status == 'off'">
        <button class="button" @click="JoinGame">Join PVP Game</button>
        <button class="button">Join AI Game</button>
      </div>
      <div v-if="status == 'pending'">
        Looking for an opponent
      </div>
      <gameBoard ></gameBoard>
    </div>
</template>

<script>
import gameBoard from "../components/GameBoard"
import axios from "axios"
export default {
    name: "Game",
    data() {
        return {
            status: "off",
            profile: this.$store.state.playerProfile
        }
    },
    components: {
        gameBoard
    },
    computed: {
        currentGame() {
            return this.$store.state.currentGame
        }
    },
    created() {},
    methods: {
        JoinGame() {
            this.status = "pending"
            axios
                .post("http://localhost:8081/JoinGame", {
                    ID: this.profile.ID
                })
                .then(
                    function(response) {
                        let cats = {}
                        for (let i in response.data.policies) {
                            let pl = response.data.policies[i]
                            console.log(pl)
                            if (!cats[pl.TypePolicy]) {
                                cats[pl.TypePolicy] = {}
                                console.log(1)
                            }
                            if (!cats[pl.TypePolicy][pl.SubType]) {
                                cats[pl.TypePolicy][pl.SubType] = {}
                                console.log(2)
                            }
                            if (!cats[pl.TypePolicy][pl.SubType]["policies"]) {
                                cats[pl.TypePolicy][pl.SubType]["policies"] = []
                                console.log(3)
                            }
                            cats[pl.TypePolicy][pl.SubType]["policies"].push(pl)
                            console.log(4)
                        }
                        for (let i in response.data.actions) {
                            let pl = response.data.actions[i]
                            if (!cats[pl.Type]) {
                                cats[pl.Type] = {}
                            }

                            if (!cats[pl.Type][pl.SubType]) {
                                cats[pl.Type][pl.SubType] = {}
                            }
                            if (!cats[pl.Type][pl.SubType]["actions"]) {
                                cats[pl.Type][pl.SubType]["actions"] = []
                            }
                            cats[pl.Type][pl.SubType]["actions"].push(pl)
                        }

                        console.log(cats)

                        this.$store.commit("LOAD_BOARD_NEW", cats)

                        this.$store.commit(
                            "LOAD_POLICIES",
                            response.data.policies
                        )
                        this.$store.commit(
                            "LOAD_ACTIONS",
                            response.data.actions
                        )
                        this.$store.commit(
                            "LOAD_TECH",
                            response.data.technology
                        )
                        this.$store.commit("LOAD_EVENTS", response.data.events)
                    }.bind(this)
                )
                .catch(function(error) {
                    console.log(error)
                })
            this.initSocket()
        },
        initSocket() {
            if (window["WebSocket"] && this.$store.state.playerProfile) {
                this.conn = new WebSocket(
                    "ws://localhost:5001/ws?id=" +
                        this.$store.state.playerProfile.ID
                )
                console.log("CONNECTED")
                this.conn.onclose = function(evt) {
                    console.log("DC")
                    this.conn = false
                    // clearInterval(time);
                }.bind(this)
                this.conn.onmessage = function(evt) {
                    this.status = "playing"
                    var messages = evt.data.split("\n")
                    for (var i = 0; i < messages.length; i++) {
                        if (messages[i] != '"pong"') {
                            this.$store.commit(
                                "LOAD_GAME",
                                JSON.parse(messages[i])
                            )
                            if (this.$store.state.currentGame.State == "END") {
                                console.log("END GAME ! ")
                                this.conn.close()
                            }
                        } else {
                            console.log("ECV PONG")
                        }
                    }
                }.bind(this)
            } else {
                console.log("No web socket :(")
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
</style>
