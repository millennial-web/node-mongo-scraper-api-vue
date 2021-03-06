import Vue from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import NarutoCharacter from './components/NarutoCharacter'
import CharactersList from './components/CharactersList'
import CharactersQuotes from './components/CharactersQuotes'
import NewCharacterForm from './components/NewCharacterForm'
import VueResource from 'vue-resource'

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.component('naruto-character',NarutoCharacter);
Vue.component('characters-list',CharactersList);
Vue.component('characters-quotes',CharactersQuotes);
Vue.component('newchar-form',NewCharacterForm);
//Use Event Bus for emitting and listening to child events
export const eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
