import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#607D8B',
        secondary: '#37474F',
        accent: '#F06292',
      },
    },
  },
});
