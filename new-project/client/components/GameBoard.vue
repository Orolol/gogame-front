<template>
    <div class="game-wrapper">
        <div class="gameState" v-if="myBoard">
            <div class="turnCounter state-element" v-if="detailedDisplay">
                Current turn : {{ this.currentGame.CurrentTurn }}
            </div>
            <div class="state-element" v-if="this.currentGame.State == 'End'">
                Game ended
            </div>
            <div class="state-element" v-else>
                <div v-if="this.currentGame.IsWar" class="isWar">
                    War declared
                </div>
                <div v-else class="isPeace">
                    Peace time. Get ready for war !
                </div>
            </div>

        </div>
        <div class="warOverview" v-if="myBoard">
            <span class="myProgress"></span>
            <span class="hisProgress"></span>
            <svg :width="warProgress.width" :height="warProgress.height">

                <rect x="0" y="0" :width="myWarTerritory" :height="warProgress.height" fill="green" class="myTerritory" />

                <rect :x="myWarTerritory" y="0" :width="hisWarTerritory" :height="warProgress.height" fill="red" class="hisTerritory" />

                <text :x="warProgress.width - 150" :y="warProgress.height +15" class="progressText">Enemy Country</text>
                <text :x="myWarTerritory" :y="45" class="progressText">{{hisBoard.PlayerInformations.TotalGroundDmg.Value | number2digits}}</text>
                <text :x="myWarTerritory" :y="28" class="progressText" v-if="warResult == 'TIE' || warResult == 'LOSE'">
                    <<<</text>
                        <text :x="myWarTerritory - 25" :y="28" class="progressText" v-if="warResult == 'TIE' || warResult == 'WON'">>>></text>
                        <text :x="myWarTerritory - 50" :y="15" class="progressText">{{myBoard.PlayerInformations.TotalGroundDmg.Value | number2digits}}</text>
                        <text :x="0" :y="warProgress.height +15" class="progressText">Your Country</text>
            </svg>
        </div>
        <div class="decisionBoard">

            <div class="decision-panel decision-panel-side" v-if="myBoard">

                <span class="panel-title">INFOS
                    <span class="help" @mouseover="showToolTip('InfosTooltip')" v-if="showHelp">?</span>
                </span>
                <div class="infoPanel">
                    <div v-for="v, k in myInfos.generalInfos" v-if="v.Type != 'Separator' &&( (v.Display != '1' && !detailedDisplay) || detailedDisplay)">
                        <span class="help-infos" @mouseover="showToolTip(v.Name)" v-if="showHelp">?</span>
                        <span class="infoPanelLabel">
                            {{v.Name | getTranslationShortName}}</span>
                        <img class='icon' :src="getIcons(v.Name)" v-if="getIcons(v.Name)" />
                        <span class="infoValue" :class="{'lowAlert': v.LowAlert && v.Value < v.LowAlert , 'veryLowAlert': v.VeryLowAlert && v.Value < v.VeryLowAlert}">{{v.Value | number2digits}}
                            <span v-if="v.GrowthValue && detailedDisplay" class="growthInfo"> {{v.GrowthValue | number2digits}} &uarr;</span>
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
                    <div v-for="v, k in hisInfos.generalInfos" v-if="v.Type != 'Separator' &&( (v.Display != '1' && !detailedDisplay) || detailedDisplay)">
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
            <span class="help-box" v-if="showHelpToolTip">
                <p class="closing" @click=' showHelpToolTip = false'> X </p>{{currentToolTip | getTranslationDescription }}
            </span>
            <event-log v-if="myBoard"></event-log>
            <div class="optionBox">
                Full display<input type="checkbox" v-model="detailedDisplay" /> <br> Show help<input type="checkbox" v-model="showHelp" />
            </div>
        </div>
    </div>
</template>

<script>
import technology from './Technology'
import actions from './Actions'
import policies from './Policies'
import category from './Category'
import eventLog from './EventLog'
const d3 = require('d3')

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
            currentDecisionPanel: 'MILITARY',
            showHelpToolTip: false,
            detailedDisplay: false,
            currentToolTip: '',
            showHelp: true,
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
        myBoard: function() {
            for (let player in this.currentGame['ListPlayers']) {
                if (this.currentGame['ListPlayers'][player]['PlayerID'] == this.$store.state.playerProfile.ID) {
                    return this.currentGame['ListPlayers'][player]
                }
            }
        },
        myWarTerritory() {
            return this.myBoard.Territory.Surface * (this.warProgress.width / 2 / 100)
        },
        hisWarTerritory() {
            return this.hisBoard.Territory.Surface * (this.warProgress.width / 2 / 100)
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
                if ((this.currentGame && this.currentGame.State == 'Running') || this.currentGame.State == 'End') {
                    // d3.selectAll('.myTerritory').attr(
                    //     'width',
                    //     function() {
                    //         return v.Territory.Surface * (this.warProgress.width / 2 / 100)
                    //     }.bind(this)
                    // )
                    // d3.selectAll('.hisTerritory').attr(
                    //     'width',
                    //     function() {
                    //         return this.hisBoard.Territory.Surface * (this.warProgress.width / 2 / 100)
                    //     }.bind(this)
                    // )
                    // d3.selectAll('.hisTerritory').attr(
                    //     'x',
                    //     function() {
                    //         return v.Territory.Surface * (this.warProgress.width / 2 / 100)
                    //     }.bind(this)
                    // )
                    // d3
                    //     .select('svg')
                    //     .append('svg:defs')
                    //     .append('svg:marker')
                    //     .attr('id', 'triangle')
                    //     .attr('refX', 15)
                    //     .attr('refY', -1.5)
                    //     .attr('markerWidth', 6)
                    //     .attr('markerHeight', 6)
                    //     .attr('orient', 'auto')
                    //     .append('path')
                    //     .attr('d', 'M 0 -5 10 10')
                    //     .style('fill', 'black')

                    if (v.Territory.Surface > this.lastTurn.myTerritory) {
                        this.warResult = 'WON'
                    } else if (v.Territory.Surface < this.lastTurn.myTerritory) {
                        this.warResult = 'LOSE'
                    } else {
                        this.warResult = 'TIE'
                    }

                    this.lastTurn.myTerritory = v.Territory.Surface
                    this.lastTurn.hisTerritory = this.hisBoard.Territory.Surface
                }
            },
            deept: true
        }
    },
    methods: {
        showToolTip(name) {
            this.currentToolTip = name
            this.showHelpToolTip = true
        },
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
.optionBox {
    position: absolute;
    bottom: 5%;
    right: 1%;
}

.isWar {
    color: red;
}
.isPeace {
    color: green;
}

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
    bottom: 5%;
    width: 20%;

    padding: 7px;
    border-radius: 15px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.infoPanelLabel {
    /* vertical-align: middle; */
    /* color: red; */
}

.help-infos {
    font-weight: 800;
    cursor: pointer;
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
    height: 2.1vh;
}

.infoValue {
    float: right;
}

.icon {
    vertical-align: middle;
    max-width: 20px;
}

.growthInfo {
    font-size: 1.1vh;
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
    box-shadow: 5px 0 12px #d8d8d8;
}
.hisBoard {
    text-align: right;
    position: absolute;
    right: 50px;
    box-shadow: 0 5px 12px #d8d8d8;
}

.decisionBoard {
    top: 15px;
    position: relative;
    width: 100%;
    height: 75vh;
    display: flex;
    font-size: 1.4vh;
}

.game-wrapper {
    top: 20px;
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
    top: 5%;
    left: 25%;
    width: 50%;
    position: relative;
}
.warOverview svg {
    height: 8vh;
}

.progressText {
    font-size: 0.9vw;
}
</style>
