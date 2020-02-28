import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/lib/util/colors';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  theme: {
    primary: colors.blue.darken1,
    secondary: colors.blue.lighten1,
    accent: colors.red.lighten1,
    error: colors.red.accent4,
    warning: colors.amber.base,
    info: colors.blue.accent3,
    success: colors.green.darken4
  }
});
