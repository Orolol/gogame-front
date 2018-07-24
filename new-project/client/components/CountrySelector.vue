<template>

    <div class="countrySelector">
        <div v-for="c in countryList" :key="c.Name">
            <img :src="c.Flag" />
            <p>{{c.Name | getTranslationShortName}}</p>
            <p>{{c.Name | getTranslationDescription}}</p>
            <p v-html="getToolTips(c)"></p>
            <input type="radio" :value="c.Name" v-model="profile.SelectedCountry">
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {}
    },
    computed: {
        countryList() {
            return this.$store.state.countries
        },
        profile() {
            return this.$store.state.playerProfile
        }
    },
    methods: {
        getToolTips(v) {
            let tt = ''
            for (let e in v.Effects) {
                if (v.Effects[e].ActionName) {
                    if (this.$store.state.translations[v.Effects[e].ActionName]) {
                        console.log(this.$store.state.translations[v.Effects[e].ActionName].ShortName)
                        if (v.Effects[e].ToolTipValue) {
                            tt += this.$store.state.translations[v.Effects[e].ActionName].ShortName.replace('?', v.Effects[e].ToolTipValue)
                        } else {
                            tt += this.$store.state.translations[v.Effects[e].ActionName].ShortName.replace('?', v.Effects[e].Value)
                        }
                        tt += '<br>'
                    }
                }
            }
            if (!tt) {
                return v.Description
            }
            return tt
        }
    }
}
</script>
<style>
.countrySelector {
    position: relative;
    top: 15vh;
    left: 25%;
    display: flex;
    z-index: 999;
}
</style>


