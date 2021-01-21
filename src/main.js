import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import TextHighlight from 'vue-text-highlight';
 
Vue.component('text-highlight', TextHighlight);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
