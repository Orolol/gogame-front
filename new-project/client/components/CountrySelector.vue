<template>

    <div class="countrySelector">

        <div v-for="c in countryList" :key="c.Name" class="country-box">
            <label :for="c.Name">
                <img :src="c.Flag" class="flag-big" />
                <p>{{c.Name | getTranslationShortName}}</p>
                <p>{{c.Name | getTranslationDescription}}</p>
                <p v-html="getToolTips(c)"></p>
            </label>
            <input type="radio" :id="c.Name" :value="c.Name" v-model="profile.SelectedCountry">
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
        },
        SelectedCountry() {
            return this.profile.SelectedCountry
        }
    },
    watch: {
        SelectedCountry: function(v, ov) {
            console.log(v)
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
                return ''
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
.flag-big {
    /* max-width: 200px; */
    max-height: 120px;
}

.country-box {
    width: 33%;
    padding-right: 2%;
}
</style>


