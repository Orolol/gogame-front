<template>
    <div class="login-screen">
        <div>
            <span>Login</span>
            <input type="text" v-model="login" required/>
        </div>
        <div>
            <span>Password</span>
            <input type="password" v-model="password" required/>
        </div>
        <div>
            <span>Repeat Password</span>
            <input type="password" v-model="password2" required/>
        </div>
        <div>
            <span>Nickname</span>
            <input type="text" v-model="name" required/>
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
            let baseUrl
            if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081'
            if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081'
            axios
                .post(baseUrl + '/SignUp', {
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
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>
