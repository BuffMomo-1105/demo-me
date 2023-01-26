import Vue from 'vue'

import '../imports/ui/plugins'
import "./main.css"
import App from '../imports/ui/App.vue'
import Vuetify from 'vuetify'; 
import 'vuetify/dist/vuetify.min.css';
import VueMeteorTracker from 'vue-meteor-tracker';
import router from '../imports/ui/routes/route';

Vue.use(Vuetify);

const vuetify = new Vuetify();

Meteor.startup(() => {
  Vue.use(VueMeteorTracker);
  // Vue.use(Vuetify);
  new Vue({
    el: '#app',
    vuetify,
    router,
    ...App,
  })
})
