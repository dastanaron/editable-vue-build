

import Vue from 'vue';
import VueGrid from "vue-grid2";

Vue.component('vue-grid2', VueGrid)

/*var Vue = require('vue');
var vueSlider = require('vue-slider-component');*/

console.log(Vue);


new Vue({
    el: '#app',
    components: {
        VueGrid
    },
});