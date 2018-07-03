<template>
    <div class="login-screen">
        <div class="input-field">
            <label class="input-label ">Login</label>
            <input type="text" v-model="login" class="input-login " />
        </div>
        <div class="input-field">
            <label class="input-label ">Password</label>
            <input type="text" v-model="password" class="input-login " @keyup.enter="loginAction" />
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
            let baseUrl
            if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081'
            if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081'

            axios
                .post(baseUrl + '/Login', {
                    username: this.login,
                    password: this.password
                })
                .then(
                    function(response) {
                        this.$store.commit('LOAD_TOKEN', response.data)
                        axios({
                            method: 'POST',
                            headers: { Authorization: 'Bearer ' + response.data.token },
                            url: baseUrl + '/auth/GetProfileInfos'
                        }).then(
                            function(response) {
                                this.$store.commit('LOAD_PROFILE', response.data)
                                this.$router.push('/')
                            }.bind(this)
                        )
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
