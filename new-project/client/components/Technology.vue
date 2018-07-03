<template>
    <div class="technology">
        <div class="technology-switch">
            <button v-for="type, t in technology" class="button" @click="switchType(t)"  :class="{'button-active': currentType == t}">{{t}} </button>
        </div>
        <div class="technologies-sub-box">
            <!-- <div class="" v-for="c, k in currentInfos">
                <label class="">{{k}}</label>
                <span class="span-infos"> {{c | number2digits}} </span>
            </div> -->

        </div>
        <div v-for="type, t in technology">
            <div v-for="tier, k in type" v-if="currentType==t">
                Tier {{k}}
                <div class="technology-tier">
                    <button @mouseover="setHover(v.ActionName)" @mouseleave="setHover('')" v-bind:key="v.Name" v-for="v, k in tier" class="button technology-button" :disabled="techAlreadyKnown(v.ActionName) || !v.isValid || !v.isCostValid" @click="sendGetTech(v.ActionName)">
                        <span v-if="hovered != v.ActionName">
                            {{v.ActionName | getTranslationShortName}}
                            <br>
                            <span class="costs" v-html="getCosts(v.Costs)"></span>
                        </span>
                        <span v-if="hovered == v.ActionName">{{v.Description}}</span>
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
export default {
    data() {
        return {
            currentType: 'INDUS',
            hovered: ''
        }
    },

    computed: {
        technology() {
            let techArray = {}

            for (let tech in this.$store.state.technology) {
                let t = this.$store.state.technology[tech]
                if (!techArray[t.TypeTechnology]) {
                    techArray[t.TypeTechnology] = {}
                }
                if (!techArray[t.TypeTechnology][t.Tier]) {
                    techArray[t.TypeTechnology][t.Tier] = []
                }
                if (this.checkConstraint(t.Constraints)) {
                    t.isValid = true
                } else {
                    t.isValid = false
                }
                if (this.checkCosts(t.Costs)) {
                    t.isCostValid = true
                } else {
                    t.isCostValid = false
                }
                if (techArray[t.TypeTechnology]) techArray[t.TypeTechnology][t.Tier].push(t)
            }
            return techArray
        },
        currentInfos() {
            return this.$store.getters.myBoard.Civilian
        },
        myBoard() {
            return this.$store.getters.myBoard
        },
        knownTechnology() {
            return this.$store.getters.myBoard.Technologies
        }
    },
    methods: {
        setHover(d) {
            this.hovered = d
        },
        getCosts(s) {
            let ret = ''
            for (let i in s) {
                this
                if (s[i].Type == 'money') {
                    ret += s[i].Value + "<img class='icon' src='money.png' />"
                }
                if (s[i].Type == 'morale') {
                    ret += s[i].Value + "% <img class='icon' src='morale.png' />"
                }
                if (s[i].Type == 'science') {
                    ret += s[i].Value + "<img class='icon' src='research.png' />"
                }
            }
            return ret
        },
        switchType(n) {
            this.currentType = n
        },
        jsonParse(jsonList) {
            return JSON.parse(jsonList)
        },
        techAlreadyKnown: function(name) {
            if (this.knownTechnology) {
                if (this.knownTechnology.indexOf(name) === -1) {
                    return false
                } else {
                    return true
                }
            }
            return false
        },
        checkCosts(costs) {
            let player = this.myBoard
            if (player.Economy) {
                for (let cost in costs) {
                    let c = costs[cost]
                    switch (c.Type) {
                        case 'money':
                            if (player.Economy.Money < c.Value) {
                                return false
                            } else {
                                return true
                            }
                        case 'science':
                            if (player.Civilian.NbResearchPoint < c.Value) {
                                return false
                            } else {
                                return true
                            }
                        case 'manpower':
                            if (player.Civilian.NbManpower < c.Value) {
                                return false
                            } else {
                                return true
                            }
                        case 'morale':
                            if (player.Army.Morale < c.Value) {
                                return false
                            } else {
                                return true
                            }
                    }
                }
                return true
            } else {
                return false
            }
        },
        checkConstraint(constraints) {
            if (!constraints) {
                return true
            }
            let player = this.myBoard
            let game = this.$store.state.currentGame
            for (let c in constraints) {
                let t = constraints[c]
                if (t.Type == 'tech' && ((this.knownTechnology && this.knownTechnology.indexOf(t.Value) === -1) || !this.knownTechnology)) {
                    return false
                } else if (t.Type == 'turn') {
                    return this.CheckOperator(t.Value, t.Operator, game.CurrentTurn)
                } else if (t.Type == 'isWar' && !game.IsWar) {
                    return false
                } else if (t.Type == 'isNotWar' && game.IsWar) {
                    return false
                } else if (t.Type == 'Modifier') {
                    for (key in player.Modifiers) {
                        if (key == t.Key) {
                            return this.CheckOperator(ft.Value, t.Operator, player.Modifiers[key])
                        }
                    }
                    return false
                } else if (t.Type == 'ModifierTurn') {
                    for (key in player.Modifiers) {
                        if (key == t.Key) {
                            return this.CheckOperator(player.Modifiers[key], t.Operator, game.CurrentTurn)
                        }
                    }
                    return false
                }
            }
            return true
        },
        CheckOperator(a, op, b) {
            switch (op) {
                case '>':
                    return a > b
                case '<':
                    return a < b
                case '=':
                    return a == b
            }
            return false
        },
        sendGetTech(tech) {
            let baseUrl
            if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081/auth'
            if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081/auth'
            this.$store.dispatch('getToken').then(
                function(token) {
                    axios({
                        url: baseUrl + '/GetTechnology',
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + token },
                        data: {
                            ID: tech,
                            Value: Number(event.target.value),
                            PlayerID: this.$store.state.playerProfile.ID,
                            GameID: this.$store.state.currentGame.GameID
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
        }
    }
}
</script>

<style>
.technology-switch {
    justify-content: center;
    display: flex;
}
.technology-tier {
    display: flex;
}
.technology-button {
    height: 7vh;
    width: 33%;
}

.technology {
    text-align: left;
    font-size: 14px;
}
</style>
