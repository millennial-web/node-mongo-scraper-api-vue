const mongoose = require('mongoose');//wrapper for mongodb
const uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');//user input validation lib

//mongoose schema for validation of model
const characterSchema = new mongoose.Schema({
  name: {type: String, unique: true, minlength: 1, maxlength: 155, trim: true, default:null},
  thumbnail: {type: String, default : null},
  summary: {type: String, default : null},
  background: {type: String, default : null},
  personality: {type: String, default : null},
  appearance: {type: String, default : null},
  abilities: {type:String, default : null},
  part_i : {type: String, default : null},
  part_ii : {type: String, default : null},
  trivia : {type: String, default : null},
  quotes : {type: Array, default : null},
  lastUpdated: {type: Date, default: Date.now},
});
characterSchema.plugin(uniqueValidator);//patch so that unique errors are handled just like any other validation error
//compile the mongoose schema into a model
const Character = mongoose.model('Character', characterSchema);

//input validation for this model with Joi
const validateCharacter = (characterObj) =>{
  let schema = {
    name : [Joi.string().optional(), Joi.allow(null)],
    thumbnail: [Joi.string().optional(), Joi.allow(null)],
    summary: [Joi.string().optional(), Joi.allow(null)],
    background: [Joi.string().optional(), Joi.allow(null)],
    personality: [Joi.string().optional(), Joi.allow(null)],
    appearance: [Joi.string().optional(), Joi.allow(null)],
    abilities: [Joi.string().optional(), Joi.allow(null)],
    part_i: [Joi.string().optional(), Joi.allow(null)],
    part_ii: [Joi.string().optional(), Joi.allow(null)],
    trivia: [Joi.string().optional(), Joi.allow(null)],
    abilities: [Joi.string().optional(), Joi.allow(null)],
    quotes: [Joi.string().optional(), Joi.allow(null)]
  }
  return Joi.validate(characterObj,schema);
}

exports.Character = Character;
exports.validateCharacter = validateCharacter;
