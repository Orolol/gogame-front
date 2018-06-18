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

      
        <div class="army-panel">
          <div v-for="v, k in myBoard.Territory" >
              <label>{{k}}</label>
              <span>{{v | number0digits}}</span>
          </div>
        </div>
        <br>
        <div class="army-panel">
          <div v-for="v, k in myBoard.Army" >
              <label>{{k | getTranslationShortName}}</label>
              <span>{{v | number0digits}}</span>
          </div>
        </div>
        <br>
        <div class="army-panel">
          <div v-for="v, k in myBoard.Economy" >
              <label>{{k}}</label>
              <span>{{v | number0digits}}</span>
          </div>
        </div>
        <br>
        <br>


        <div class="pop-panel">
        </div>

    </div>


    <div class="decision-panel decision-panel-main">
      <div class="choose-decision-panel">
        <button v-for="c, k in categories" class="button" @click="switchPanel(k)" :class="{'button-active': currentDecisionPanel == k}"> {{k}} </button>
        <button class="button" @click="switchPanel('teconology')" :class="{'button-active': currentDecisionPanel == 'teconology'}"> TECHNOLOGIES </button>
      </div>
      
      <technology v-if="myBoard && currentDecisionPanel=='teconology'"></technology>
      <category v-for="c, k in categories" :category="k"  v-if="myBoard && currentDecisionPanel==k" :subs="c"></category>

    </div>

   
        
        
    <div class="decision-panel decision-panel-side" v-if="hisBoard">
        <div class="army-panel">
          <div v-for="v, k in hisBoard.Territory" >
              <label>{{k}}</label>
              <span>{{nFormatter(v, 2)}}</span>
          </div>
        </div>
        <br>
        <div class="army-panel">
          <div v-for="v, k in hisBoard.Army" >
              <label>{{k}}</label>
              <span>{{nFormatter(v, 2)}}</span>
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

.gameState {
    justify-content: center;
    display: flex;
}

.state-element {
    margin: 15px;
}

.myBoard {
    text-align: left;
    position: absolute;
    left: 50px;
    font-size: 14px;
    box-shadow: 5px 0 12px #d8d8d8;
}
.hisBoard {
    text-align: right;
    position: absolute;
    right: 50px;
    font-size: 14px;
    box-shadow: 0 5px 12px #d8d8d8;
}

.decisionBoard {
    top: 15px;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
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
