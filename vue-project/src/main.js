import Vue from 'vue'
import App from './App'
import NarutoCharacter from './components/NarutoCharacter'
import CharactersList from './components/CharactersList'
import VueResource from 'vue-resource'

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.component('naruto-character',NarutoCharacter);
Vue.component('characters-list',CharactersList);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
