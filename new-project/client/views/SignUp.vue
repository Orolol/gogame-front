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
    <div>
      <span>Repeat Password</span>
      <input type="text" v-model="password2" />
    </div>
    <div>
      <span>Nickname</span>
      <input type="text" v-model="nickname" />
    </div>

    <button @click="createAccount" > Save account </button>
    <router-link :to="{ name: 'SignUp'}"></router-link>
    <div class="error-box" v-if="isError">
       {{errorMessage}}
    </div>
  </div>

</template>

<script>
export default {
    data () {
      return {
        errorMessage: "",
        isError: false,
        login: "",
        password: "",
        password2: "",
        nickname: "",
      }
    },
    methods: {
      createAccount() {
        console.log("Try to createAccount ", this.login, " / ", this.password);
      }
    }
}

</script>
