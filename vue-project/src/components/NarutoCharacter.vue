<template>
  <div class="selected_character">
    <div class="character-card">
      <img class="char-thumbnail" :src="charData.thumbnail">
      <div class="character-info">
        <h1 @click="fetchCharData">{{charData.name}}</h1>
        <div v-show="charData.quotes.length" class="quotes-container">
          <characters-quotes v-show="charData.quotes.length">
            <h2>Character Quotes</h2>
            <p>"{{charData.quotes[quoteIndex]}}"</p>
          </characters-quotes>
        </div>
        <div>
          <span
            class="tab"
            v-for="tab in tabs"
            v-show="charData[tab.attrib]"
            :class="{activeTab: selectedTab === tab.label}"
            @click="selectedTab = tab.label"
            >
            {{tab.label}}
          </span>
          <hr>
          <div class="char_detail_pane" v-show="charData.summary && selectedTab == 'Summary'">
            <h2>Summary</h2>
            <p v-html="charData.summary"></p>
          </div>
          <div class="char_detail_pane" v-show="charData.background && selectedTab == 'Background'">
            <h2>Background</h2>
            <p v-html="charData.background"></p>
          </div>
          <div class="char_detail_pane" v-show="charData.personality && selectedTab == 'Personality'">
            <h2>Personality</h2>
            <p>{{charData.personality}}</p>
          </div>
          <div class="char_detail_pane" v-show="charData.appearance && selectedTab == 'Appearance'">
            <h2>Appearance</h2>
            <p>{{charData.appearance}}</p>
          </div>
          <div class="char_detail_pane" v-show="charData.abilities && selectedTab == 'Abilities'">
            <h2>Abilities</h2>
            <p>{{charData.abilities}}</p>
          </div>
          <div class="char_detail_pane" v-show="charData.part_i && selectedTab == 'Part I'">
            <h2>Part I</h2>
            <p>{{charData.part_i}}</p>
          </div>
          <div class="char_detail_pane" v-show="charData.part_ii && selectedTab == 'Part II'">
            <h2>Part II</h2>
            <p>{{charData.part_ii}}</p>
          </div>
          <div class="char_detail_pane" v-show="charData.trivia && selectedTab == 'Trivia'">
            <h2>Trivia</h2>
            <p>{{charData.trivia}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from '../main';
export default {
  name: 'naruto-character',
  data: function(){
    return {
      charData: {
        "thumbnail": "",
        "summary": "",
        "background": "",
        "personality": "",
        "appearance": "",
        "abilities": "",
        "part_i": "",
        "part_ii": "",
        "trivia": "",
        "_id": "",
        "name": "",
        "quotes" : []
      },
      tabs: [
        {label: 'Summary', attrib: 'summary'},
        {label: 'Background', attrib: 'background'},
        {label: 'Personality', attrib: 'personality'},
        {label: 'Appearance', attrib: 'appearance'},
        {label: 'Abilities', attrib: 'abilities'},
        {label: 'Part I', attrib: 'part_i'},
        {label: 'Part II', attrib: 'part_ii'},
        {label: 'Trivia', attrib: 'trivia'},
      ],
      selectedTab: 'Summary',
      quoteIndex:0,
    }
  },
  methods:{
    fetchCharData(charId){
      this.$http.get('http://localhost:3000/api/characters/'+charId)
        .then(response => {
          return response.json();
        })
        .then(char_data => {
          this.charData = char_data;
        });
    }
  },
  beforeMount(){
    this.fetchCharData('5c59312db6918f5dc97e8822');
  },
  created(){
    eventBus.$on('changeCharacter', (dt) => {
        this.fetchCharData(dt.id);
        this.selectedTab = 'Summary';
        this.quoteIndex = 0;
    });
    setInterval(()=>{
      let next_index = this.quoteIndex+1;
      if(next_index < (this.charData.quotes.length -1)){
        this.quoteIndex++;
      }else{
        this.quoteIndex = 0;
      }
    },7000);
  }
}
</script>

<!--"scoped" attribute limits CSS to this component only -->
<style scoped>
  .selected_character{
    float:left;
    width:70%;
  }
  .character-card{
    width:100%;
  }
  h1, h2 {
    font-weight: normal;
    margin:0 0 20px 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  .tab{
    border:1px solid #ccc;
    border-bottom:none;
    border-top-left-radius:5px;
    -moz-border-top-left-border-radius:5px;
    -webkit-border-top-left-border-radius:5px;
    border-top-right-radius:5px;
    -moz-border-top-right-border-radius:5px;
    -webkit-border-top-right-border-radius:5px;
    padding:5px;
    margin:6px;
    background-color:#3f5252;
    color:#fff;
    font-size:12px;
  }
  .tab:hover{
    cursor:pointer;
    background-color:#5a8080;
  }
  .tab.activeTab{
    background-color:#bf3737;
  }
  hr{
    margin:4px;
    border:none;
    height:1px;
    background-color:#63b16d;
  }
  .char-thumbnail{
    height:250px;
    width:auto;
    margin:10px auto;
  }
  .char_detail_pane{
    padding:20px;
    max-height:400px;
    overflow:auto;
    width:90%;
    margin:20px auto;
    background-color:#dce6ff;
    text-align:left;
  }
  .quotes-container{
    display:inline-block;
    background-color:#fff;
    border:1px solid #ccc;
    width:90%;
    min-height:50px;
    margin:0 auto 20px auto;
  }
</style>
