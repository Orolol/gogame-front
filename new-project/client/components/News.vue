<template>

    <div class="news-list">

        <div class="news" v-for="v, k in cmpNews">
            <p class="news-title"> {{v.Title}} </p>
            <p class="news-date"> {{v.Date}} </p>
            <p class="news-text" v-for="p in v.Paragrahs">
                <vue-markdown> {{p}} </vue-markdown>
            </p>
        </div>
    </div>

</template>
<script>
import axios from 'axios'
import VueMarkdown from 'vue-markdown'
export default {
    components: {
        VueMarkdown
    },
    data() {
        return {
            news: []
        }
    },

    computed: {
        cmpNews() {
            return this.news
        }
    },

    created() {
        let baseUrl
        if (process.env.NODE_ENV == 'production') baseUrl = 'http://0r0.fr:8081/'
        if (process.env.NODE_ENV == 'development') baseUrl = 'http://localhost:8081/'
        axios.get(baseUrl + 'GetNews').then(
            function(d) {
                this.news = d.data
            }.bind(this)
        )
    },

    methods: {}
}
</script>
<style>
</style>


