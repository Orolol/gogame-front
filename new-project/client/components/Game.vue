<template>
  <div >
    <div >
      <span v-if="this.currentGame.State == 'End'">
          Fin de partie !
      </span>
        <gameBoard :currentGame="this.currentGame"></gameBoard>
      <div v-if="this.currentGame.State == 'Running'">
        <policies></policies>
      </div>
    </div>
  </div>
</template>

<script>
import gameBoard from "./GameBoard"
import policies from "./Policies"
export default {
    components: {
      gameBoard,
      policies
    },
    props: ['currentGame'],
    created() {


    },
    methods: {

    }
}
</script>

<style>
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
</style>
