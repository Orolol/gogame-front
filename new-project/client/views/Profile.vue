<template>
    <div>
        <div class="page">
            <div class="profile">
                <p>{{profile.Name}}</p>
                <p>ELO : {{profile.ELO}}</p>
                <div>
                    <span>Login</span>
                    <span> {{profile.Login}} </span>
                </div>
                <div>
                    <span>Password</span>
                    <input type="password" v-model="profile.Password" required/>
                </div>
                <div>
                    <span>Repeat Password</span>
                    <input type="password" v-model="profile.Password2" required/>
                </div>
                <div>
                    <span>Nickname</span>
                    <input type="text" v-model="profile.Name" required/>
                </div>

                <button @click="editAccount"> Save account </button>
                <div class="error-box" v-if="isError">
                    {{errorMessage}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    components: {},
    data() {
        return {
            profile: this.$store.state.playerProfile,
            currentGame: this.$store.state.currentGame
        }
    },
    mounted() {
        if (!this.$store.state.token) {
            this.$router.push('Login')
        }
    },
    methods: {
        editAccount() {
            let baseUrl
            switch (process.env.NODE_ENV) {
                case 'production':
                    baseUrl = 'http://0r0.fr:8081'
                case 'development':
                    baseUrl = 'http://localhost:8081'
            }
            axios
                .post(baseUrl + '/EditAccount', {
                    ...this.profile
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
<style>
html,
body,
#app {
    height: 100vh;
}
</style>
