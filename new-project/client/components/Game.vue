<template>
    <div class="gameLobby qpage">

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




.qpage {
  display: flex;
  height:80vh;
}
</style>
