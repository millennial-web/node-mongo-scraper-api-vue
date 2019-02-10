<template>
  <div>
    <div class="switch-options-container">
      <div v-for="(n,i) in options"
        class="switch-option"
        id="sw_opt_i"
        @click="switchval({changekey:changekey, newval:options[i].val})"
        :class="{active: value == options[i].val}">
        {{options[i].label}}
      </div>
    </div>
  </div>
</template>

<script>
  import {eventBus} from '../main';
  export default{
    name : "hw-switch",
    props: ['changekey', 'options','value'],
    methods:{
      switchval(data){
        console.log('emitting event hwSwitchValue');
        eventBus.$emit('hwSwitchValue',data);
      }
    }
  }
</script>

<style scoped>
  .switch-options-container{
    display:inline-block;
    background-color:#fff;
    border:1px solid #ccc;
    padding:10px;
    width: max-content;
    border-radius:5px;

  }
  .switch-option {
    transition:all 0.5s;
    display: inline-block;
    height:20px;
    background-color:#efefef;
    color:#444;
    padding:5px 10px;
    margin:0 3px;
    box-sizing: content-box;
    cursor:pointer;
    text-align:center;
    border-radius:2px;
    box-shadow:1px 1px 4px #111;
    font-weight:bold;
  }
  .switch-option:hover {
    background-color:#fff;
  }
  .switch-option.active {
    background-color:#d6fdb3;
    color:#666;
  }
</style>
