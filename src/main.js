import Vue from 'vue'
// import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store';
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ApiService from './api/api.service';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Vue.use(VueRouter)

ApiService.init();

// Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
