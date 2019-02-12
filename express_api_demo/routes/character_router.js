const express = require('express');
const router = express.Router();
const {Character, validateCharacter} = require('../models/character_model');


//get list of all character ids and name
router.get('/char_list', async (request,response)=>{
  let characters = await Character
    .find()
    .sort({name:1})
    .select(['name','_id']);
  response.json(characters);
});

//get all characters
router.get('/', async (request,response)=>{
  let characters = await Character
    .find()
    .sort('name')
    .limit(50);
  response.json(characters);
});

//get a single character
router.get('/:id', async (request,response)=>{
  //get character by id
  let character = await Character.findById(request.params.id);
  if(!character) return response.status(404).send('The character with the given id was not found');
  //return requested character obj
  response.json(character);
});

//create a new character
router.post('/', async (request,response) => {
  //validate new character data
  let {error} = validateCharacter(request.body);
  if(error) return response.status(400).send(error);
  //create new character object
  let new_character = new Character(request.body);
  new_character.lastUpdated = Date.now();
  //save to database
  result = await new_character.save()
    .then(
      (result) => {
        return response.status(200).json(result);
      },
      (ex) => {
        let result = [];
        for (field in ex.errors){
          result.push(ex.errors[field].message);
        }
        return response.status(400).send(result);
      }
    );
});

//update a characters
router.put('/:id', async (request,response) => {
  //validate update character data
  let {error} = validateCharacter(request.body);
  if(error) return response.status(400).send(error.details);
  //get character by id and update
  let updated_character = await Character.findByIdAndUpdate(request.params.id, {
      name : request.body.name,
      gender : request.body.gender,
      thumbnail : request.body.thumbnail,
      summary : request.body.summary,
      background : request.body.background,
      personality : request.body.personality,
      appearance : request.body.appearance,
      abilities : request.body.abilities,
      part_i : request.body.part_i,
      part_ii : request.body.part_ii,
      abilities : request.body.abilities,
      quotes : request.body.quotes,
      trivia : request.body.trivia,
      lastUpdated : Date.now()
    },
    {new:true} //option to return newly updated document
  );
  if(!updated_character) return response.status(404).send('The character with the given id was not found');
  //return new character obj
  response.send(updated_character);
});

//delete a characters
router.delete('/:id', async (request,response) => {
  //get character by id
  let deleted_character = await Character.findByIdAndRemove(request.params.id);
  if(!deleted_character) return response.status(404).send('The character with the given id was not found');
  //return the deleted character obj
  response.send(deleted_character);
});

//export the router object
module.exports = router;
