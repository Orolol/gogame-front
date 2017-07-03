<template>
  <div class="login-screen">
    <div>
      <span>Login</span>
      <input type="text" v-model="login" />
    </div>
    <div>
      <span>Password</span>
      <input type="text" v-model="password" />
    </div>
    <button @click="loginAction" > Login </button>
    <router-link :to="{ name: 'SignUp'}">Sign Up !</router-link>
    <div class="error-box" v-if="isError">
       {{errorMessage}}
    </div>
  </div>

</template>

<script>
import axios from "Axios"

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
      }
    }
}

</script>
