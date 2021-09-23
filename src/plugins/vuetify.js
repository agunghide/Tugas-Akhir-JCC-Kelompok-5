import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: { 
        options: {
            customProperties: true,
        },
        dark: true,
        themes:{
            dark: {
                primary: '#121212',
                secondary: '#F97736',
                accent: '#FF2650',
            },
            light:{
                secondary: '#F97736',
                accent: '#121212',
            }
        } 
    },
});
