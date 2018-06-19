<template>
    <div class="game-wrapper">
        <div class="gameState">
            <div class="turnCounter state-element">
                Current turn : {{ this.currentGame.CurrentTurn }}
            </div>
            <div class="state-element" v-if="this.currentGame.State == 'End'">
                Game ended
            </div>
            <div class="state-element" v-else>
                <div v-if="this.currentGame.isWar">
                    War declared
                </div>
                <div v-else>
                    Peace time. Get ready for war !
                </div>
            </div>

        </div>
        <div class="decisionBoard">
            <div class="decision-panel decision-panel-side" v-if="myBoard">
                <span class="panel-title">INFOS</span>
                <div class="army-panel">
                    <div v-for="v, k in myInfos.generalInfos" v-if="v.Type != 'Separator'">
                        <label>{{v.Name | getTranslationShortName}}</label>
                        <span :class="{'lowAlert': v.LowAlert && v.Value < v.LowAlert , 'veryLowAlert': v.VeryLowAlert && v.Value < v.VeryLowAlert}">{{v.Value | number2digits}}</span>
                    </div>
                    <div v-else>
                        <label>&nbsp </label>
                        <span> </span>
                    </div>
                </div>

            </div>

            <div class="decision-panel decision-panel-main">
                <span class="panel-title">ACTIONS</span>
                <div class="choose-decision-panel">
                    <button v-for="c, k in categories" class="button" @click="switchPanel(k)" :class="{'button-active': currentDecisionPanel == k}"> {{k}} </button>
                    <button v-if="myBoard" class="button" @click="switchPanel('teconology')" :class="{'button-active': currentDecisionPanel == 'teconology'}"> TECHNOLOGIES </button>
                </div>

                <technology v-if="myBoard && currentDecisionPanel=='teconology'"></technology>
                <category v-for="c, k in categories" :key="k" :category="k" v-if="myBoard && currentDecisionPanel==k" :subs="c"></category>

            </div>

            <div class="decision-panel decision-panel-side" v-if="hisBoard">
                <span class="panel-title">ENEMY | {{hisBoard.Nick}}</span>
                <div class="army-panel">
                    <div v-for="v, k in hisInfos.generalInfos" v-if="v.Type != 'Separator'">
                        <label>{{v.Name | getTranslationShortName}}</label>
                        <span :class="{'lowAlert': v.LowAlert && v.Value < v.LowAlert , 'veryLowAlert': v.VeryLowAlert && v.Value < v.VeryLowAlert}">{{v.Value | number2digits}}</span>
                    </div>
                    <div v-else>
                        <label>&nbsp </label>
                        <span> </span>
                    </div>
                </div>

                <div class="pop-panel">
                </div>

            </div>

            <event-log v-if="myBoard"></event-log>
        </div>
    </div>
</template>

<script>
import technology from './Technology'
import actions from './Actions'
import policies from './Policies'
import category from './Category'
import eventLog from './EventLog'

export default {
    components: {
        actions,
        policies,
        technology,
        eventLog,
        category
    },
    data() {
        return {
            currentDecisionPanel: 'policy'
        }
    },

    computed: {
        myBoard: function() {
            for (let player in this.currentGame['ListPlayers']) {
                if (this.currentGame['ListPlayers'][player]['PlayerID'] == this.$store.state.playerProfile.ID) {
                    this.$store.commit('LOAD_BOARD', this.currentGame['ListPlayers'][player])

                    return this.currentGame['ListPlayers'][player]
                }
            }
        },
        myInfos() {
            let ret = {}
            console.log(this.$store.state.infos[0].Infos)
            if (!ret[this.$store.state.infos[0].Category]) {
                ret[this.$store.state.infos[0].Category] = []
            }
            for (let i in this.$store.state.infos[0].Infos) {
                let inf = this.$store.state.infos[0].Infos[i]
                if (inf.Type != 'Separator') {
                    inf.Value = this.myBoard[inf.Type][inf.Name]
                } else {
                    inf.Value = 0
                }
                ret[this.$store.state.infos[0].Category].push(inf)
            }
            return ret
        },
        hisInfos() {
            let ret = {}
            console.log(this.$store.state.infos[0].Infos)
            if (!ret[this.$store.state.infos[0].Category]) {
                ret[this.$store.state.infos[0].Category] = []
            }
            for (let i in this.$store.state.infos[0].Infos) {
                let inf = this.$store.state.infos[0].Infos[i]
                if (inf.Type != 'Separator') {
                    inf.Value = this.hisBoard[inf.Type][inf.Name]
                } else {
                    inf.Value = 0
                }
                ret[this.$store.state.infos[0].Category].push(inf)
            }
            return ret
        },

        categories() {
            return this.$store.state.board
        },
        currentGame() {
            return this.$store.state.currentGame
        },
        hisBoard() {
            for (let player in this.currentGame['ListPlayers']) {
                if (this.currentGame['ListPlayers'][player]['PlayerID'] != this.$store.state.playerProfile.ID) {
                    return this.currentGame['ListPlayers'][player]
                }
            }
        }
    },
    methods: {
        switchPanel(n) {
            this.currentDecisionPanel = n
        },
        nFormatter: function(num, digits) {
            var si = [
                    { value: 1e18, symbol: 'E' },
                    { value: 1e15, symbol: 'P' },
                    { value: 1e12, symbol: 'T' },
                    { value: 1e9, symbol: 'G' },
                    { value: 1e6, symbol: 'M' },
                    { value: 1e3, symbol: 'k' }
                ],
                rx = /\.0+$|(\.[0-9]*[1-9])0+$/,
                i
            for (i = 0; i < si.length; i++) {
                if (num >= si[i].value) {
                    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
                }
            }
            return num.toFixed(digits).replace(rx, '$1')
        }
    }
}
</script>

<style>
.choose-decision-panel {
    display: flex;
    justify-content: center;
}

.panel-title {
    padding-bottom: 5px;
    font-weight: 600;
}

.gameState {
    justify-content: center;
    display: flex;
}

.state-element {
    margin: 15px;
}

.lowAlert {
    color: darkorange;
    font-weight: 600;
}

.veryLowAlert {
    color: red;
    font-weight: 600;
}

.myBoard {
    text-align: left;
    position: absolute;
    left: 50px;
    font-size: 0.9vw;
    box-shadow: 5px 0 12px #d8d8d8;
}
.hisBoard {
    text-align: right;
    position: absolute;
    right: 50px;
    font-size: 0.9vw;
    box-shadow: 0 5px 12px #d8d8d8;
}

.decisionBoard {
    top: 15px;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 1.1vw;
}

.game-wrapper {
    top: 75px;
    position: relative;
    width: 100%;
    height: 100%;
}

.decision-panel {
    padding: 10px;
    border: 1px solid rgb(79, 83, 102);
    /* color: white; */
    border-radius: 15px;
    height: 65%;
    margin: 5px;
    /* position: relative; */
}
.decision-panel-main {
    width: 100%;
}
.decision-panel-side {
    width: 30%;
}
</style>
