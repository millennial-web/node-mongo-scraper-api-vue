<template>
  <div>
    <transition name="slidein">
      <div class="new-character-form-container">
        <div class="card mb-4 shadow-sm">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Create a New Character</h4>
          </div>
          <div class="card-body">
            <form class="form">
              <div class="row">
                <div class="col-md-12">
                  <small>Fields with * are required</small>
                  <label for="newchar_thumbnail">*Image URL</label>
                  <input
                    type="text"
                    class="form-control"
                    id="newchar_thumbnail"
                    name="thumbnail"
                    v-model.trim="newchar_data.thumbnail"
                    required>
                </div>
                <div class="col-md-12">
                  <img class="char-thumbnail" :src="newchar_data.thumbnail">
                </div>
                <div class="col-md-12">
                  <label for="newchar_name">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="newchar_name"
                    name="name"
                    v-model.trim="newchar_data.name"
                    required>
                </div>
                <div class="col-md-12">
                  <label for="newchar_name">Gender</label>
                  {{newchar_data.gender}}
                  <hw-switch changekey="gender" :options="genderOptions" :value="newchar_data.gender">
                  </hw-switch>
                  <p>{{newchar_data.dataSwitch}}</p>
                </div>
                <div class="col-md-12">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="summary-tab" data-toggle="tab" href="#summary" role="tab" aria-controls="summary" aria-selected="true">Summary</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="background-tab" data-toggle="tab" href="#background" role="tab" aria-controls="background" aria-selected="false">Background</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="personality-tab" data-toggle="tab" href="#personality" role="tab" aria-controls="personality" aria-selected="false">Personality</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="appearance-tab" data-toggle="tab" href="#appearance" role="tab" aria-controls="appearance" aria-selected="false">Appearance</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="abilities-tab" data-toggle="tab" href="#abilities" role="tab" aria-controls="abilities" aria-selected="false">Abilities</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="part_i-tab" data-toggle="tab" href="#part_i" role="tab" aria-controls="part_i" aria-selected="false">Part I</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="part_ii-tab" data-toggle="tab" href="#part_ii" role="tab" aria-controls="part_ii" aria-selected="false">Part II</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="trivia-tab" data-toggle="tab" href="#trivia" role="tab" aria-controls="trivia" aria-selected="false">Trivia</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="quotes-tab" data-toggle="tab" href="#quotes" role="tab" aria-controls="quotes" aria-selected="false">Quotes</a>
                    </li>
                  </ul>
                  <div class="tab-content" id="newCharTabContent">
                    <div class="tab-pane fade show active" id="summary" role="tabpanel" aria-labelledby="summary-tab">
                      <div class="col-md-12">
                        <label for="newchar_summary">Character Summary</label>
                        <textarea
                          rows="5"
                          class="form-control"
                          id="newchar_summary"
                          name="summary"
                          v-model.lazy="newchar_data.summary"
                          required>
                        </textarea>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="background" role="tabpanel" aria-labelledby="background-tab">
                      <div class="col-md-12">
                        <label for="newchar_background">Character Background</label>
                        <small>(Optional)</small>
                        <textarea
                          rows="5"
                          class="form-control"
                          id="newchar_background"
                          name="background"
                          v-model.lazy="newchar_data.background"
                          required>
                        </textarea>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="personality" role="tabpanel" aria-labelledby="personality-tab">
                      <div class="col-md-12">
                        <label for="newchar_personality">Character Personality</label>
                        <small>(Optional)</small>
                        <textarea
                          rows="5"
                          class="form-control"
                          id="newchar_personality"
                          name="personality"
                          v-model.lazy="newchar_data.personality"
                          required>
                        </textarea>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="appearance" role="tabpanel" aria-labelledby="appearance-tab">
                      <div class="col-md-12">
                        <label for="newchar_appearance">Character Appearance</label>
                        <small>(Optional)</small>
                        <textarea
                          rows="5"
                          class="form-control"
                          id="newchar_appearance"
                          name="appearance"
                          v-model.lazy="newchar_data.appearance"
                          required>
                        </textarea>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="abilities" role="tabpanel" aria-labelledby="abilities-tab">
                      <div class="col-md-12">
                        <label for="newchar_abilities">Character Abilities</label>
                        <small>(Optional)</small>
                        <textarea
                          rows="5"
                          class="form-control"
                          id="newchar_abilities"
                          name="abilities"
                          v-model.lazy="newchar_data.abilities"
                          required>
                        </textarea>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="part_i" role="tabpanel" aria-labelledby="part_i-tab">
                      <div class="col-md-12">
                        <label for="newchar_part_i">Part I Story</label>
                        <small>(Optional)</small>
                        <textarea
                          rows="5"
                          class="form-control"
                          id="newchar_part_i"
                          name="part_i"
                          v-model.lazy="newchar_data.part_i"
                          required>
                        </textarea>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="part_ii" role="tabpanel" aria-labelledby="part_ii-tab">
                      <div class="col-md-12">
                        <label for="newchar_part_ii">Part II Story</label>
                        <small>(Optional)</small>
                        <textarea
                          rows="5"
                          class="form-control"
                          id="newchar_part_ii"
                          name="part_ii"
                          v-model.lazy="newchar_data.part_ii"
                          required>
                        </textarea>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="trivia" role="tabpanel" aria-labelledby="trivia-tab">
                      <div class="col-md-12">
                        <label for="newchar_trivia">Character Trivia</label>
                        <small>(Optional - One per Line)</small>
                        <textarea
                          rows="5"
                          class="form-control"
                          id="newchar_trivia"
                          name="trivia"
                          v-model.lazy="newchar_data.trivia"
                          required>
                        </textarea>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="quotes" role="tabpanel" aria-labelledby="quotes-tab">
                      <div class="col-md-12">
                        <label for="newchar_quotes">Character Quotes</label><br>
                        <small>(Optional - One per Line)</small>
                        <textarea
                          rows="5"
                          class="form-control"
                          id="newchar_quotes"
                          name="quotes"
                          v-model.lazy="newchar_data.quotes"
                          required>
                        </textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="col-md-12">
                <div class="alert alert-danger" v-show="formErrors.length" >
                  <ul>
                    <li v-for="err in formErrors">{{err.replace('Path ', '')}}</li>
                  </ul>
                </div>
                <button v-if="!isSubmitted" @click.prevent="submitCharForm" type="button" class="btn btn-lg btn-block btn-info">Send</button>
                <div v-else class="alert alert-warning">Procesando...</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
  import {eventBus} from '../main';
  import HwSwitch from './HwSwitch';
  export default {
    name: 'newchar-form',
    data(){
      return {
        isSubmitted:false,
        formErrors:[],
        genderOptions: [
          {val:'male',label:'Male'},
          {val:'female',label:'Female'},
          {val:'other',label:'Other'}
        ],
        newchar_data : {
          name : '',
          thumbnail : '',
          quotes : '',
          summary : '',
          background : '',
          personality : '',
          appearance : '',
          abilities : '',
          part_i : '',
          part_ii : '',
          trivia : '',
          gender: ''
        }
      }
    },
    methods:{
      submitCharForm(){
        this.isSubmitted = true;
        if(this.newchar_data.quotes){
          this.newchar_data.quotes = this.newchar_data.quotes.split("\n");
        }else{
          this.newchar_data.quotes = [];
        }
        if(this.newchar_data.trivia){
          this.newchar_data.trivia = this.newchar_data.trivia.split("\n");
        }else{
          this.newchar_data.trivia = [];
        }
        this.$http.post('http://54.69.152.1:3000/api/characters/',this.newchar_data)
          .then((response) => {
            if(response.status == 200){
              console.log(response);
              //reset form
              this.isSubmitted = false;
              this.newchar_data = {};
              //reload the character list
              console.log('emitting event refreshCharList');
              eventBus.$emit('refreshCharList');
              //go to newly created character card
              console.log('emitting changeCharacter from NewCharacterForm');
              eventBus.$emit('changeCharacter',{id:response.body._id});
            }else{
              console.log(response);
            }
          })
          .catch((response)=>{
            if(response.status == 400){
              this.formErrors = response.body;
              this.newchar_data.quotes = this.newchar_data.quotes.join("\n");
              this.newchar_data.trivia = this.newchar_data.trivia.join("\n");
            }
            this.isSubmitted = false;
          });
      }
    },
    created(){
      eventBus.$on('hwSwitchValue', (ev) => {
          console.log('receiving event hwSwitchValue');
          console.log(ev);
          if(ev.changekey == 'gender'){
            this.newchar_data.gender = ev.newval;
          }
          if(ev.changekey == 'charRole'){
            this.newchar_data.charRole = ev.newval;
          }
      });
    },
    components: {
      'hw-switch': HwSwitch
    }
  }
</script>

<style scoped>
  .form{
    width:100%;
    max-height:80vh;
    overflow-y:auto;
    overflow-x:hidden;
    margin:10px auto;
    padding:40px;
  }
  .nav-tabs{
    margin-top:40px;
    border-bottom:none;
  }
  .nav-tabs .nav-link{
    font-size:12px;
    border-color: #efefef #efefef #efefef;
    margin:2px;
  }
  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active{
    border-color: #aeaeae #aeaeae #fff;
    box-shadow:2px -2px 5px #eaeaea;
  }
  label{
    margin-top:10px;
    font-weight:bold;
  }
  small{
    display:block;
    margin:-8px auto 10px auto;
  }
  .char-thumbnail{
    height:150px;
    width:auto;
    margin:20px auto;
  }
  .slidein-enter{
    opacity:0;
  }
  .slidein-enter-active {
    animation: slide-in 0.5s ease-out forwards;
    transition: opacity 1s;
  }
  .alert-warning, .alert-danger{
    width:100%;
  }
  .alert-danger{
    text-align:left;
  }
  .slidein-leave {
    opacity: 0;
  }
  @keyframes slide-in{
    from {
      transform: translateY(-140px);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
