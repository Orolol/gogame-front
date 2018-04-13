<template>
    <div class="actions">
        <div v-for="v, k  in actions" >
            <div v-if="v.Selector == 'fixed'">
              <button   class="button" :disabled="!actionUsedCheck(v.ActionName) || !v.isCostOk"
                    @click="sendNewAction(v.ActionName, v.Cooldown)">{{v.Name}}</button>
              <br>
              <span class="description">{{v.Description}}</span>
              <span v-if="!actionUsedCheck(v.ActionName)">{{ actionUsed[v.ActionName] - $store.state.currentGame.CurrentTurn}}</span>
            </div>
          <div v-if="v.Selector == 'range'">
            <vue-slider 
              ref="slider"
              v-model="cmpRangeValues[v.ActionName]" 
              :clickable="false"
              :disabled="!actionUsedCheck(v.ActionName)"
              :min="parseInt(v.Constraints[0].Value)"
              :max="maxSlider(v.Constraints[2].Value,v.ActionName) "
              @drag-end="sendNewAction(v.ActionName, v.Cooldown,cmpRangeValues[v.ActionName] )"></vue-slider>
            {{cmpRangeValues[v.ActionName]}} / {{maxSlider(v.Constraints[2].Value,v.ActionName) }}
            <br>
            <span class="description">{{v.Description}}</span>
            <span v-if="!actionUsedCheck(v.ActionName)">{{ actionUsed[v.ActionName] - $store.state.currentGame.CurrentTurn}}</span>
          </div>
          
          
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Vue from "vue"
import VueCircleSlider from "vue-circle-slider"
import VueSlider from "vue-slider-component"
export default {
    data() {
        return {
            actionUsed: {},
            rangeValues: {},
            actionType: "ECONOMIC"
        }
    },
    props: ["propsActions"],
    components: {
        VueCircleSlider,
        VueSlider
    },
    mounted() {
        for (let action in this.propsActions) {
            let a = this.propsActions[action]
            if (a.Selector == "range") {
                if (!this.$store.state.rangeValues[a.ActionName]) {
                    this.$store.commit("LOAD_RANGE_VALUES", {
                        name: a.ActionName,
                        value: a.BaseValue
                    })
                }
            }
        }
    },

    computed: {
        cmpRangeValues() {
            return this.$store.state.rangeValues
        },

        getMaxSlider() {
            let c = 0
            let n = {}
            for (let a in this.actions) {
                for (let c in this.actions[a].Constraints) {
                    if (this.actions[a].Constraints[c].Type == "linked") {
                        if (!n[this.actions[a].Constraints[c].Value]) {
                            n[this.actions[a].Constraints[c].Value] = 1
                        } else {
                            n[this.actions[a].Constraints[c].Value] += 1
                        }
                    }
                }
            }
            let res = {}
            for (let m in n) {
                res[m] = n[m] * 100 - this.totalLinkedValues[m]
            }
            return res
        },
        totalLinkedValues() {
            let totalLinkedValues = {}
            for (let a in this.actions) {
                let isLinked = false
                for (let c in this.actions[a].Constraints) {
                    if (this.actions[a].Constraints[c].Type == "linked") {
                        if (
                            !totalLinkedValues[
                                this.actions[a].Constraints[c].Value
                            ]
                        ) {
                            totalLinkedValues[
                                this.actions[a].Constraints[c].Value
                            ] = this.cmpRangeValues[this.actions[a].ActionName]
                        } else {
                            totalLinkedValues[
                                this.actions[a].Constraints[c].Value
                            ] += this.cmpRangeValues[this.actions[a].ActionName]
                        }
                    }
                }
            }
            return totalLinkedValues
        },
        actions: function() {
            let acts = []

            let sortedActions = []
            for (let action in this.propsActions) {
                let a = this.propsActions[action]
                if (!sortedActions) {
                    sortedActions = []
                }
                if (this.checkCosts(a.Costs)) {
                    a.isCostOk = true
                } else {
                    a.isCostOk = false
                }
                if (this.checkConstraint(a.Constraints)) {
                    sortedActions.push(a)
                }
            }

            return sortedActions
        }
    },
    methods: {
        toNumber(s) {
            return number(s)
        },
        maxSlider(v, n) {
            // if (this.getMaxSlider[v]) {
            return this.getMaxSlider[v] + this.cmpRangeValues[n]
            // } else {
            // console.log("HOHO", this.getMaxSlider[v], v)
            // return 100
            // }
        },
        jsonParse(jsonList) {
            return JSON.parse(jsonList)
        },
        actionUsedCheck: function(id) {
            return (
                !this.actionUsed[id] ||
                this.actionUsed[id] < this.$store.state.currentGame.CurrentTurn
            )
        },
        checkCosts(costs) {
            let player = this.$store.state.myBoard
            if (player.Economy) {
                for (let cost in costs) {
                    let c = costs[cost]
                    switch (c.Type) {
                        case "money":
                            if (player.Economy.Money < c.Value) {
                                return false
                            } else {
                                return true
                            }
                        case "science":
                            if (player.Civilian.NbResearchPoint < c.Value) {
                                return false
                            } else {
                                return true
                            }
                        case "manpower":
                            if (player.Civilian.NbManpower < c.Value) {
                                return false
                            } else {
                                return true
                            }
                        case "morale":
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
        checkConstraint(constraints, value = null) {
            if (!constraints) {
                return true
            }
            let player = this.$store.state.myBoard
            let game = this.$store.state.currentGame
            for (let c in constraints) {
                let t = constraints[c]
                if (
                    t.Type == "tech" &&
                    ((player.Technologies &&
                        player.Technologies.indexOf(t.Value) === -1) ||
                        !player.Technologies)
                ) {
                    return false
                } else if (t.Type == "turn") {
                    return CheckOperator(t.Value, t.Operator, game.CurrentTurn)
                } else if (t.Type == "isWar" && !game.IsWar) {
                    return false
                } else if (t.Type == "isNotWar" && game.IsWar) {
                    return false
                } else if (t.Type == "Modifier") {
                    for (key in player.Modifiers) {
                        if (key == t.Key) {
                            return CheckOperator(
                                ft.Value,
                                t.Operator,
                                player.Modifiers[key]
                            )
                        }
                    }
                    return false
                } else if (t.Type == "ModifierTurn") {
                    for (key in player.Modifiers) {
                        if (key == t.Key) {
                            return CheckOperator(
                                player.Modifiers[key],
                                t.Operator,
                                game.CurrentTurn
                            )
                        }
                    }
                    return false
                }
            }
            return true
        },
        CheckOperator(a, op, b) {
            switch (op) {
                case ">":
                    return a > b
                case "<":
                    return a < b
                case "=":
                    return a == b
            }
            return false
        },
        changeRange(a, cd, v) {
            sendNewAction(a, cd, v)
        },
        sendNewAction(action, cd, value = -1999) {
            axios
                .post("http://localhost:8081/Actions", {
                    ID: action,
                    Value: value,
                    PlayerID: this.$store.state.playerProfile.ID,
                    GameID: this.$store.state.currentGame.GameID
                })
                .then(
                    function(response) {
                        console.log(this.$store.state.currentGame.CurrentTurn)
                        console.log(cd)
                        Vue.set(
                            this.actionUsed,
                            action,
                            cd + this.$store.state.currentGame.CurrentTurn
                        )
                    }.bind(this)
                )
                .catch(function(error) {
                    console.log(error)
                })
        }
    }
}
</script>

<style>
.actions {
    text-align: left;
    font-size: 14px;
}

.description {
    font-size: 10px;
}

.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
