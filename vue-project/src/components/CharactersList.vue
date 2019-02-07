<template>
  <div class="characters_list">
    <h3>Select a Character</h3>
    <a v-for="char in charList" class="character-link" href="#" @click="changeCharacter(char._id)">
      {{char.name}}
    </a>
  </div>
</template>

<script>
import {eventBus} from '../main';
export default {
  name: 'characters-list',
  data: function(){
    return {
      charList: null,
    }
  },
  methods:{
    fetchCharList(){
      this.$http.get('http://localhost:3000/api/characters/char_list')
        .then(response => {
          return response.json();
        })
        .then(char_list => {
          this.charList = char_list;
        });
    },
    changeCharacter(charId){
      // this.$root.$emit('changeCharacter',{id:charId});
      eventBus.$emit('changeCharacter',{id:charId});
    }
  },
  beforeMount(){
    this.fetchCharList();
  },
}
</script>

<style scoped>
h3{
  color:#efefef;
  text-align:center;
}
.characters_list{
  float:left;
  width:30%;
  max-width:200px;
  max-height:100vh;
  overflow:auto;
  background-color:#222;
  font-size:12px;
  padding:0;
  margin:0;
  text-align:left;
}
.characters_list a{
  display:block;
  color:#fff;
  text-decoration:none;
  max-width:100%;
  padding:8px 0 8px 10px;
  border-bottom:1px solid #444;
}
.characters_list a:hover{
  background-color:#666;
}
</style>
