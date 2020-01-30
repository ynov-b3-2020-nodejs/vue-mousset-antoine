import Vue from 'vue';
import Axios from 'axios';
import router from './router';
import store from './store';
import App from './App.vue';

Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

// eslint-disable-next-line no-new
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
