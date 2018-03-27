<template>
    <div class="gameLobby qpage">
      <div class="turnCounter">
        <h3> Current turn : {{ this.currentGame.CurrentTurn }}  </h3>
      </div>
      <span v-if="this.currentGame.State == 'End'">
          Fin de partie !
      </span>
      <gameBoard :currentGame="this.currentGame"></gameBoard>
    </div>
</template>

<script>
import gameBoard from "./GameBoard"
import technology from "./Technology"
import actions from "./Actions"
import policies from "./Policies"
export default {
    components: {
      gameBoard,
      actions,
      policies,
      technology
    },
    props: ['currentGame'],
    created() {


    },
    methods: {

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

.turnCounter {
  position: absolute;
  top: 5%;
  left:45%;
}

.decisionBoard{
  top: 75px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

.decision-panel{
  width: 40%;
  padding: 10px;
  /* position: relative; */
}
.bottom-panel {
  position: absolute;
  bottom:10px;
  height: 15vh;
  overflow-y: scroll;
  left:25%;
}

.qpage {
  display: flex;
  height:70vh;
}
</style>
