import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import { createProvider } from './graphql/apolloClient';
import FormAlert from '../src/components/Shared/FormAlert';
import DataNotFound from '../src/components/Shared/DataNotFound';
import ContentLoader from '../src/components/Shared/ContentLoader';

Vue.config.productionTip = false;
Vue.component('FormAlert', FormAlert);
Vue.component('DataNotFound', DataNotFound);
Vue.component('ContentLoader', ContentLoader);

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
