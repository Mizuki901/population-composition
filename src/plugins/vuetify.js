import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#264653',
        secondary: '#2a9d8f',
        accent: '#e76f51',
      },
    },
  },
});
