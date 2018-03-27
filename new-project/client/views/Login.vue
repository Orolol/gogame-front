<template>
  <div class="login-screen">
    <div>
      <label>Login</label>
      <input type="text" v-model="login" />
    </div>
    <div>
      <label>Password</label>
      <input type="text" v-model="password" />
    </div>
    <button @click="loginAction" class="button"> Login </button>
    <router-link :to="{ name: 'SignUp'}" tag="button" class="button">Sign Up !</router-link>
    <div class="error-box" v-if="isError">
       {{errorMessage}}
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
    data() {
      return {
        errorMessage: "",
        isError: false,
        login: "",
        password: "",
      }
    },
    methods: {
      loginAction() {
        console.log("Try to Login ", this.login, " / ", this.password);
        console.log("SEND POST");
        axios.post('http://localhost:8081/Login', {
          login: this.login,
          password: this.password,
          })
          .then(function (response) {

            console.log(response);
              this.$store.commit('LOAD_TOKEN' ,response['data']['Token']['Token'])
              this.$store.commit('LOAD_PROFILE' ,response['data'])
              this.$router.push('/')
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      }
    }
}

</script>
<style>
.login-screen {
  top: 25%;
  left: 45%;
  position: absolute;
}
</style>
