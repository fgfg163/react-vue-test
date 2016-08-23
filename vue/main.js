import Vue from 'vue';
import app from './app';

if (document.getElementById("vueroot")) {
  new Vue({
    el: '#vueroot',
    template: ``,
    components: {
      app,
    }
  });
}
