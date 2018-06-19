<template>
    <div id="app">
        <top-menu></top-menu>
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
    methods: {},
    created() {
        if (!this.$store.state.token) {
            this.$router.push('Login')
        }
        let baseUrl
        switch (process.env.NODE_ENV) {
            case 'production':
                baseUrl = 'http://0r0.fr:8081'
            case 'development':
                baseUrl = 'http://localhost:8081'
        }
        axios
            .post(baseUrl + '/GetTranslations', {
                language: 'en'
            })
            .then(
                function(data) {
                    console.log(data)
                    for (let d in data.data)
                        this.$store.commit('LOAD_TRANSLATIONS', {
                            name: data.data[d].ActionName,
                            value: data.data[d]
                        })
                }.bind(this)
            )
        axios.post(baseUrl + '/GetInfos').then(
            function(data) {
                this.$store.commit('LOAD_INFOS', data.data)
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
