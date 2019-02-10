<template>
  <div id="app">
    <characters-list></characters-list>
    <keep-alive>
      <component :is="selectedComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
  import {eventBus} from './main';
  export default {
    data: ()=>{
      return {
        selectedComponent: 'naruto-character'
      }
    },
    created(){
      eventBus.$on('switchMainComponent', (componentName) => {
        console.log('receiving event switchMainComponent, switching component to '+componentName);
        this.selectedComponent = componentName;
      });
      eventBus.$on('changeCharacter', (dt) => {
        console.log('receiving event changeCharacter, switching component to naruto-character');
        this.selectedComponent = 'naruto-character';
      });
    },
  }

</script>

<style>
body {
  margin:0;
  padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
