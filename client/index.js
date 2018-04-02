import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import router from './router';
import store from './store';
import VueLuxon from 'vue-luxon';

Vue.use(VueLuxon);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');