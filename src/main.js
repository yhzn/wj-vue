import Vue from 'vue'
import App from './App.vue'

import ElementUI from "element-ui";
import '@/assets/css/reset.css'
import '@/assets/css/public.css'

import "element-ui/lib/theme-chalk/index.css";

import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
