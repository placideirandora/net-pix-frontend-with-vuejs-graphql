import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import { createProvider } from './graphql/vue-apollo';
import FormAlert from '../src/components/Shared/FormAlert';

Vue.config.productionTip = false;
Vue.component('FormAlert', FormAlert);

new Vue({
  router,
  store,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App),
  created() {
    this.$store.dispatch('getCurrentUser');
  }
}).$mount('#app');
