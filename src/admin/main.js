import Vue from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import requests from './requests'
import SimpleVueValidation from 'simple-vue-validator';

Vue.use(SimpleVueValidation);

store.$axios = requests

new Vue({
  el: "#app-root",
  router,
  store,
  render: h => h(App)
});