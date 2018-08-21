<template>
    <div class="log bottom-panel">
        <span class="panel-title">EVENTS</span>
        <div v-for="v, k in logs" v-if="v.ActionName != 'event0'">
            <span>Turn {{v.Turn}}</span> :
            <span>{{getDescription(v.ActionName)}}</span>
            <span v-html="getToolTips(v)"></span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            select: null
        }
    },
    computed: {
        myBoard() {
            return this.$store.getters.myBoard
        },
        logs: function() {
            return this.myBoard.Logs
        }
    },
    methods: {
        getDescription(actionName) {
            for (let e in this.$store.state.events) {
                let event = this.$store.state.events[e]
                if (event.ActionName == actionName) {
                    return event.Description
                }
            }
        },
        getToolTips(v) {
            let tt = ''
            for (let e in v.Effects) {
                if (v.Effects[e].ActionName) {
                    if (this.$store.state.translations[v.Effects[e].ActionName]) {
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
.policies {
    text-align: left;
    font-size: 14px;
}
.eco-policies {
    bottom: 15%;
}
.mil-policies {
    bottom: 5%;
}

.bottom-panel {
    position: absolute;
    bottom: 10px;
    height: 15vh;
    overflow-y: scroll;
    left: 25%;
}

.select-policy {
    padding-left: 0 !important;
}

.log {
    width: 60%;
}
</style>
