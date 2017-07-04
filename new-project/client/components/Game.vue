<template>
  <div >
    <div >
      {{ this.currentGame }}
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            currentGame: {}
        }
    },
    created() {
        if (window["WebSocket"] && this.$store.state.playerProfile) {
            this.conn = new WebSocket("ws://localhost:5001/ws?id=" + this.$store.state.playerProfile.ID);
            console.log("CONNECTED");
            this.conn.onclose = function (evt) {
              console.log("DC");
            }.bind(this);
            this.conn.onmessage = function (evt) {
                var messages = evt.data.split('\n');
                for (var i = 0; i < messages.length; i++) {
                    console.log(messages[i]);
                    this.currentGame = messages[i]
                    // this.$store.commit("LOAD_GAME", messages[i])
                }
            }.bind(this);
        } else {
            var item = document.createElement("div");
            item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
            this.setState({ newChatMsg: item })
        }

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
