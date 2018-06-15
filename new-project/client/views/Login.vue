<template>
  <div class="login-screen">
    <div class="input-field">
      <label class="input-label ">Login</label>
      <input type="text" v-model="login" class="input-login " />
    </div>
    <div class="input-field">
      <label class="input-label ">Password</label>
      <input type="text" v-model="password" class="input-login " />
    </div>
    <div class="login-button-box">
      <button @click="loginAction" class="button"> Login </button>
      <router-link :to="{ name: 'SignUp'}" tag="button" class="button">Sign Up !</router-link>
      <div class="error-box" v-if="isError">
      </div>
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
            password: ''
        }
    },
    methods: {
        loginAction() {
            console.log('Try to Login ', this.login, ' / ', this.password)
            console.log('SEND POST')
            axios
                .post('http://0r0.fr:8081/Login', {
                    login: this.login,
                    password: this.password
                })
                .then(
                    function(response) {
                        console.log(response)
                        this.$store.commit('LOAD_TOKEN', response['data']['Token']['Token'])
                        this.$store.commit('LOAD_PROFILE', response['data'])
                        this.$router.push('/')
                    }.bind(this)
                )
                .catch(function(error) {
                    console.log(error)
                })
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

.input-login {
    border: none;
    border-bottom: 1px solid #555;
    float: right;
    padding-right: 15px;
}

.input-login:focus {
    border: 1px solid #555;
}

.input-field {
    padding: 5px 1px 5px 1px;
}
.input-label {
    padding-right: 20px;
}

.login-button-box {
    text-align: center;
    padding-top: 30px;
}
</style>
