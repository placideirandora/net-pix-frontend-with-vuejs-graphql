import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { createProvider } from './graphql/apolloClient';
import Notification from '../src/components/Shared/Notification';
import DataNotFound from '../src/components/Shared/DataNotFound';
import ContentLoader from '../src/components/Shared/ContentLoader';

const options = {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  closeButton: 'button',
  icon: true,
  rtl: false
};

Vue.use(Toast, options);

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
