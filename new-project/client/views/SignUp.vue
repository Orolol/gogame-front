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
      <input type="text" v-model="name" />
    </div>

    <button @click="createAccount"> Save account </button>
    <router-link :to="{ name: 'SignUp'}"></router-link>
    <div class="error-box" v-if="isError">
      {{errorMessage}}
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            errorMessage: '',
            isError: false,
            login: '',
            password: '',
            password2: '',
            name: ''
        }
    },
    methods: {
        createAccount() {
            console.log('Try to createAccount ', this.login, ' / ', this.password)
            console.log('Try to Login ', this.login, ' / ', this.password)
            console.log('SEND POST')
            axios
                .post('http://localhost:8081/SignUp', {
                    login: this.login,
                    password: this.password,
                    name: this.name
                })
                .then(function(response) {
                    console.log(response)
                })
                .catch(function(error) {
                    console.log(error)
                })
        }
    }
}
</script>
