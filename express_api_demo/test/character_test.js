//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
const {Character} = require('../models/character_model');

//Require the dev-dependencies
let server = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
//parent block
describe('Test various /api routes', () => {
  it('Should get all characters', (done) => {
    chai.request(server)
      .get('/api/characters')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.gt(1);
        done();
      });
  });
  it('should NOT POST a character without required fields', (done) => {
    let new_character = {
        name: "",
        summary: "",
        thumbnail: "",
        gender: ""
    }
    chai.request(server)
      .post('/api/characters')
      .send(new_character)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(4);
        done();
      });
  });
  it('should POST a character ', (done) => {
    let new_character = {
        name: "Darth Maul",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Darth_Maul.png/220px-Darth_Maul.png",
        summary: "Darth Maul is a fictional character in the Star Wars franchise. \
          Trained as Darth Sidious's first apprentice,[2] he serves as a Sith Lord and a master \
          of wielding a double-bladed lightsaber. He first appears in Star Wars: Episode I – \
          The Phantom Menace (portrayed by Ray Park and voiced by Peter Serafinowicz). \
          Despite his apparent demise in that film at the hands of Obi-Wan Kenobi, he later \
          returned in the Star Wars: The Clone Wars animated television series and made further \
          appearances in the Star Wars Rebels series and the 2018 film Solo: A Star Wars Story, \
          all voiced by Sam Witwer.",
        gender: '<img src="https://vignette.wikia.nocookie.net/naruto/images/8/83/Gender_Male.svg/revision/latest/scale-to-width-down/18?cb=20100316202217" alt="Gender Male" class="" data-image-key="Gender_Male.svg" 	data-image-name="Gender Male.svg" width="18" height="18"> Male'
    };
    chai.request(server)
      .post('/api/characters')
      .send(new_character)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('Darth Maul');
        res.body.should.have.property('_id');
        res.body.should.have.property('thumbnail');
        res.body.should.have.property('gender');
        res.body.should.have.property('summary');
        done();
      });
  });
  it('should GET a character by :id', (done) => {
    Character.findOne({name: 'Darth Maul'})
      .then((char)=>{
        chai.request(server)
          .get('/api/characters/'+char._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('Darth Maul');
            res.body.should.have.property('_id');
            res.body.should.have.property('thumbnail');
            res.body.should.have.property('gender');
            res.body.should.have.property('summary');
            done();
          });
        });
      });
  it('should update a character with PUT and :id', (done) => {
    Character.findOne({name: 'Darth Maul'})
      .then((char)=>{
        let update_char = {
          name : char.name,
          gender : char.gender,
          thumbnail : 'https://www.dailydot.com/wp-content/uploads/2017/06/darth_maul.png',
          summary : char.summary,
          background : char.background,
          personality : char.personality,
          appearance : char.appearance,
          abilities : char.abilities,
          part_i : char.part_i,
          part_ii : char.part_ii,
          abilities : char.abilities,
          quotes : char.quotes,
          trivia : char.trivia,
        }
        chai.request(server)
          .put('/api/characters/'+char._id)
          .send(update_char)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('thumbnail').eql('https://www.dailydot.com/wp-content/uploads/2017/06/darth_maul.png');
            done();
          });
        });
      });
  it('should delete a character by :id', (done) => {
    Character.findOne({name: 'Darth Maul'})
      .then((char)=>{
        chai.request(server)
          .delete('/api/characters/'+char._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('Darth Maul');
            done();
          });
        });
      });
});
