<template>
    <div class="game-wrapper">
        <div class="gameState" v-if="myBoard">
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
        <div class="warOverview">
            <svg :width="500" :height="50">
                    <rect x="0" y="0" width="100" height="50" fill="green" class="myTerritory"/>
                    <rect x="100" y="0" width="100" height="50" fill="red"  class="hisTerritory"/>
            </svg>
        </div>
        <div class="decisionBoard">
            <span class="help-box" v-if="help=='infos'">
                <p class="closing" @click=' help = null'> X </p>{{'InfosTooltip' | getTranslationShortName }}</span>
            <div class="decision-panel decision-panel-side" v-if="myBoard">

                <span class="panel-title">INFOS
                    <span class="help" @click="help=='infos'? help = null :help = 'infos'">?</span>
                </span>
                <div class="infoPanel">
                    <div v-for="v, k in myInfos.generalInfos" v-if="v.Type != 'Separator'">

                        <span class="infoPanelLabel">
                            {{v.Name | getTranslationShortName}}</span>
                        <img class='icon' :src="getIcons(v.Name)" v-if="getIcons(v.Name)" />
                        <span class="infoValue" :class="{'lowAlert': v.LowAlert && v.Value < v.LowAlert , 'veryLowAlert': v.VeryLowAlert && v.Value < v.VeryLowAlert}">{{v.Value | number2digits}}
                            <span v-if="v.GrowthValue" class="growthInfo"> {{v.GrowthValue | number2digits}} &uarr;</span>
                        </span>

                    </div>
                    <div v-else>
                        <div>&nbsp </div>
                        <span> </span>
                    </div>
                </div>

            </div>

            <div class="decision-panel decision-panel-main" v-if="myBoard">
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
                <div class="infoPanel">
                    <div v-for="v, k in hisInfos.generalInfos" v-if="v.Type != 'Separator'">
                        <span class="infoPanelLabel">{{v.Name | getTranslationShortName}}</span>
                        <img class='icon' :src="getIcons(v.Name)" v-if="getIcons(v.Name)" />
                        <span class="infoValue" :class="{'lowAlert': v.LowAlert && v.Value < v.LowAlert , 'veryLowAlert': v.VeryLowAlert && v.Value < v.VeryLowAlert}">{{v.Value | number2digits}}</span>
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
const d3 = require('d3');

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
            currentDecisionPanel: 'policy',
            help: null
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
            if (!ret[this.$store.state.infos[0].Category]) {
                ret[this.$store.state.infos[0].Category] = []
            }
            for (let i in this.$store.state.infos[0].Infos) {
                let inf = { ...this.$store.state.infos[0].Infos[i] }
                if (inf.Type != 'Separator' && inf.Type != 'PlayerInformations') {
                    inf.Value = this.myBoard[inf.Type][inf.Name]
                } else if (inf.Type == 'PlayerInformations') {
                    inf.Value = this.myBoard[inf.Type][inf.Name].Value
                } else {
                    inf.Value = 0
                }

                if (inf.GrowthName) {
                    if (inf.GrowthType != 'Separator' && inf.GrowthType != 'PlayerInformations') {
                        inf.GrowthValue = this.myBoard[inf.GrowthType][inf.GrowthName]
                    } else if (inf.GrowthType == 'PlayerInformations') {
                        inf.GrowthValue = this.myBoard[inf.GrowthType][inf.GrowthName].Value
                    } else {
                        inf.GrowthValue = 0
                    }
                }
                ret[this.$store.state.infos[0].Category].push(inf)
            }
            return ret
        },
        hisInfos() {
            let ret = {}
            if (!ret[this.$store.state.infos[0].Category]) {
                ret[this.$store.state.infos[0].Category] = []
            }
            for (let i in this.$store.state.infos[0].Infos) {
                let inf = { ...this.$store.state.infos[0].Infos[i] }
                if (inf.Type != 'Separator' && inf.Type != 'PlayerInformations') {
                    inf.Value = this.hisBoard[inf.Type][inf.Name]
                } else if (inf.Type == 'PlayerInformations') {
                    inf.Value = this.hisBoard[inf.Type][inf.Name].Value
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
    watch: {
        myBoard: {
            handler: function(v, oldv) {
                if(this.currentGame && this.currentGame.State == 'Running' ||this.currentGame.State == 'End' ) {
                    d3.selectAll('.myTerritory').attr('width',function(){
                        return v.Territory.Surface;
                    })
                    d3.selectAll('.hisTerritory').attr('width',function(){
                        return this.hisBoard.Territory.Surface;
                    }.bind(this))
                    d3.selectAll('.hisTerritory').attr('x',function(){
                        return v.Territory.Surface;
                    }.bind(this))
                    console.log('my terr', d3.select('.myTerritory'))
                    console.log('my terr', v.Territory.Surface)
                }
            },
            deept: true
        }
    },
    methods: {
        getIcons(actionName) {
            let icn = null
            if (actionName == 'Money') {
                icn = 'money.png'
            }
            if (actionName == 'NbResearchPoint') {
                icn = 'research.png'
            }
            if (actionName == 'Morale') {
                icn = 'morale.png'
            }
            return icn
        },
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
.closing {
    float: right;
    padding: 5px;
}
.closing:hover {
    font-weight: 800;
    color: black;
    cursor: pointer;
    font-style: unset;
}

.help-box {
    border: 1px solid grey;
    background-color: lightgrey;
    position: absolute;
    width: 15%;
    padding: 7px;
    border-radius: 15px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.infoPanelLabel {
    /* vertical-align: middle; */
    /* color: red; */
}

.help {
    float: right;
}
.help:hover {
    font-weight: 800;
    color: black;
    cursor: pointer;
}

.infoPanel div {
    height: 20px;
}

.infoValue {
    float: right;
}

.icon {
    vertical-align: middle;
    max-width: 20px;
}

.growthInfo {
    font-size: 0.7vw;
    vertical-align: top;
    color: green;
    font-weight: 600;
}

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
    font-size: 0.8vw;
    box-shadow: 5px 0 12px #d8d8d8;
}
.hisBoard {
    text-align: right;
    position: absolute;
    right: 50px;
    font-size: 0.8vw;
    box-shadow: 0 5px 12px #d8d8d8;
}

.decisionBoard {
    top: 15px;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 0.9vw;
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

.warOverview {
    height: 10vh;
}
.warOverview svg{
    height: 10vh;
    width: 50%;

}
</style>
