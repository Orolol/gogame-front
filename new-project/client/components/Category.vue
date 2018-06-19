<template>
    <div class="category">
        <div class="sub-switch">
            <button class="button" v-for="t, y in subs" @click="subCategory = y" :class="{'button-active': subCategory == y}">{{y}}</button>
        </div>
        <div v-for="t, y in subs" v-if="subCategory == y">
            <subCat :subCategory="y" :category="category" :cat="t"></subCat>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import subCat from './SubCat'
import VueSlider from 'vue-slider-component'
export default {
    data() {
        return {
            actionUsed: {},
            rangeValues: {},
            subCategory: ''
        }
        
    },
    props: ['subs', 'category'],
    components: {
        VueSlider,
        subCat
    },
    mounted() {},

    computed: {
        cmpRangeValues() {
            return this.rangeValues
        }
    },
    methods: {}
}
</script>

<style>
.sub-switch {
    justify-content: center;
    display: flex;
}

.actions {
    text-align: left;
    font-size: 14px;
}

.description {
    font-size: 10px;
}

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
</style>
