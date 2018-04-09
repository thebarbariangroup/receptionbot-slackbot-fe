
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueAxios from 'vue-axios';

// This is an instance of axios with some helper functions for signing in
// We then use that instance to use with the VueAxios plugin that surfaces an $http instance in the templates
import HTTP from './helpers/http';
Vue.use(VueAxios, new HTTP());

Vue.config.productionTip = false;

// Use this to check the Auth status of every page.
// We should probably update this to just pass the cookies in each request.
const authHelper = require('./mixins/authHelper');

// A small store to control global state on the user being logged in / admin
const store = {
  state: {
    admin: 0,
    loggedIn: 0
  },
  setAdmin (newValue) {
    this.state.admin = newValue;
  },
  setLoggedIn (newValue) {
    this.state.loggedIn = newValue;
  }
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: store,
  template: '<App/>',
  mixins: [authHelper],
  components: { App }
});
