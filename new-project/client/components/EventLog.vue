<template>
    <div class="log bottom-panel">
        <span class="panel-title">EVENTS</span>
        <div v-for="v, k in logs" v-if="v.ActionName != 'event0'">
            <span>Turn {{v.Turn}}</span> :
            <span>{{getDescription(v.ActionName)}}</span>
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
        logs: function() {
            return this.$store.state.myBoard.Logs
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
