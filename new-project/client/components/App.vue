<template>
    <div id="app">
        <top-menu v-if="showMenu"></top-menu>
        <router-view></router-view>
    </div>
</template>

<script>
import topMenu from './TopMenu'
import axios from 'axios'
export default {
    components: {
        topMenu
    },
    computed: {
        showMenu() {
            if (this.$route.path != '/Login' && this.$route.path != '/SignUp') {
                if (this.profile && this.profile.Step && this.profile.Step > 2) {
                    return true
                } else if (localStorage.getItem('gogameProfile')) {
                    console.log('GET BACK PROFILE', JSON.parse(localStorage.getItem('gogameProfile')))
                    this.$store.state.playerProfile = JSON.parse(localStorage.getItem('gogameProfile'))
                    return true
                }
            }
            return false
        },
        profile() {
            return this.$store.state.playerProfile
        }
    },
    methods: {},
    created() {
        console.log(this.$route.path)
        if (!this.$store.state.token && !localStorage.getItem('gogameToken')) {
            this.$router.push('Login')
        } else if (!this.$store.state.token) {
            this.$store.state.token = JSON.parse(localStorage.getItem('gogameToken'))
        }
        let baseUrl
        if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081'
        if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081'

        axios.get(baseUrl + '/GetTranslations/en').then(
            function(data) {
                console.log(data)
                for (let d in data.data)
                    this.$store.commit('LOAD_TRANSLATIONS', {
                        name: data.data[d].ActionName,
                        value: data.data[d]
                    })
            }.bind(this)
        )
        axios.get(baseUrl + '/GetInfos').then(
            function(data) {
                this.$store.commit('LOAD_INFOS', data.data)
            }.bind(this)
        )
        axios.get(baseUrl + '/getCountries').then(
            function(data) {
                this.$store.commit('LOAD_COUNTRIES', data.data)
            }.bind(this)
        )
    }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Advent+Pro|Comfortaa|Julius+Sans+One');
body,
html {
    margin: 0;
    /* font-family: 'Julius Sans One', sans-serif; */
    /* font-family: 'Advent Pro', sans-serif; */
    font-family: 'Comfortaa', cursive;
    color: rgb(79, 83, 102);
}
.page {
    text-align: center;
    /* nesting for the need to test postcss */
}
.button {
    background-color: rgb(255, 255, 255); /* Green */
    border: 1px solid rgb(79, 83, 102);
    /* color: white; */
    border-radius: 3px;
    padding: 5px 8px;
    margin: 2px;
    text-align: center;
    /* text-decoration: none; */
    display: inline-block;

    font-family: 'Comfortaa', cursive;
    color: rgb(79, 83, 102);
}
.button-active {
    background-color: rgb(180, 180, 180);
}

.button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
.button:hover {
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>
