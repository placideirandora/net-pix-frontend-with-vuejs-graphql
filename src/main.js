import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import { createProvider } from './graphql/apolloClient';
import Notification from '../src/components/Shared/Notification';
import DataNotFound from '../src/components/Shared/DataNotFound';
import ContentLoader from '../src/components/Shared/ContentLoader';

Vue.config.productionTip = false;
Vue.component('Notification', Notification);
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
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
      this.$vuetify.theme.dark = true;
      this.$store.commit('setDarkTheme', true);
    } else {
      this.$vuetify.theme.dark = false;
      this.$store.commit('setDarkTheme', false);
    }
  }
}).$mount('#app');
