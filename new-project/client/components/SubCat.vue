<template>
    <div class="sub-category">
        <div class="right-box sub-box">
            <actions :propsActions="cat.actions"></actions>
            <policies :propsPolicies="cat.policies"></policies>
        </div>

        <div class="infos sub-box">
            <div class="info" v-for="c in currentInfos">
                <label class="label-infos">{{c.Name}}</label>
                <span class="span-infos"> {{c.Value | number2digits}} </span>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import actions from './Actions'
import policies from './Policies'
export default {
    name: 'subCat',
    props: ['category', 'subCategory', 'cat'],
    components: {
        actions,
        policies
    },
    mounted() {},

    computed: {
        currentInfos() {
            let arr = []
            for (let r in this.$store.state.myBoard.PlayerInformations) {
                if (this.$store.state.myBoard.PlayerInformations[r].Type == this.category && this.$store.state.myBoard.PlayerInformations[r].SubType == this.subCategory) {
                    arr.push(this.$store.state.myBoard.PlayerInformations[r])
                }
            }
            return arr
        }
    }
}
</script>

<style>
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
.sub-category {
    display: flex;
    padding: 10px;
    font-size: 0.9vw;
}
.sub-box {
    padding: 10px;
}
.infos {
    width: 40%;
    font-size: 0.8vw;
}

.right-box {
    width: 60%;
}

.label-infos {
    display: inline-block;
    width: 80%;
    text-align: right;
}
.span-infos {
    display: inline-block;
    width: 15%;
    text-align: left;
}
</style>
