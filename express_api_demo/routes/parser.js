const express = require('express');
const router = express.Router();
//dependancies for scraping and parsing html
const rp = require('request-promise');
const $ = require('cheerio');
//character model
const {Character, validateCharacter} = require('../models/character_model');

const base_url = 'https://naruto.fandom.com';

const getNextPage = async (html) =>{
  //get next page url
  if($('a.category-page__pagination-next',html).length){
    return $('a.category-page__pagination-next',html)[0].attribs.href;
  }else{
    return false
  }
}

const parseCharData = async (char_html) => {
  //get character name from dom elements
  let background = await genCharacterSection('Background',char_html);
  let personality = await genCharacterSection('Personality',char_html);
  let appearance = await genCharacterSection('Appearance',char_html);
  let abilities = await genCharacterSection('Abilities',char_html);
  let part_i = await genCharacterSection('Part_I',char_html);
  let part_ii = await genCharacterSection('Part_II',char_html);
  let trivia = await genCharacterSection('Trivia',char_html);
  let quotes = await genCharacterSection('Quotes',char_html);
  let char_data = {
    name : $('.page-header__title', char_html).text(),
    thumbnail : $('.infobox .imagecell .image-thumbnail img',char_html).data('src'),
    summary : $('.infobox',char_html).next().text(),
    background : background,
    personality : personality,
    appearance : appearance,
    abilities : abilities,
    part_i : part_i,
    part_ii : part_ii,
    trivia : trivia,
    quotes : quotes,
  };
  return char_data;
}

const updateOrCreateChar = async (character_data) => {
  character_data.lastUpdated = Date.now();
  // check if character exists in db
  var existing_char = await Character.find({name: character_data.name}).limit(1);
  if(existing_char.length){
    ex_char = existing_char[0];
    ex_char.name = character_data.name;
    ex_char.thumbnail = character_data.thumbnail;
    ex_char.summary = character_data.summary;
    ex_char.background = character_data.background;
    ex_char.personality = character_data.personality;
    ex_char.appearance = character_data.appearance;
    ex_char.abilities = character_data.abilities;
    ex_char.part_i = character_data.part_i;
    ex_char.part_ii = character_data.part_ii;
    ex_char.trivia = character_data.trivia;
    ex_char.quotes = character_data.quotes;
    try{
      var result = await ex_char.save();
      console.log('updated existing character '+character_data.name+'...');
      return(character_data);
    }catch(err){
      console.log(error);
    }
  }else{
    let new_character = new Character(character_data);
    //save to database
    new_character.save()
      .then(
        (result) => {
          console.log('created new character '+character_data.name+'...');
          return (character_data);
        },
        (err) => {
          console.log(err);
        }
      )
  }
}

const genCharacterSection = async (section_id,html) => {
  content = '';//most take a string
  if(section_id == 'Quotes'){
    content = [];//quotes should be an array of strings
    $('h2 #'+section_id, html).parent().nextUntil('h2 .mw-headline').each((i,elm)=>{
      if(elm.name == 'ul'){
        $(elm).children().each((i,li)=>{
          content.push( $(li).text() );
        });
      }
    });
  }else{
    $('h2 #'+section_id, html).parent().nextUntil('h2 .mw-headline').each((i,elm)=>{
      if(elm.name == 'p'){
        content += $(elm).text();
      }
      if(elm.name == 'ul'){
        $(elm).children().each((i,li)=>{
          content += $(li).text();
        });
      }
    });
  }
  return content;
}

router.get('/get-all-character-links/', async (req, res) => {
  list_url = encodeURI(req.query.url);
  //collection of all character pages to scrape
  all_char_pages = [];
  try {
    var list_html = await rp(list_url);
    //extract character link urls from list_html
    urls = [];
    let charlinks = $('a.category-page__member-link',list_html);
    if(charlinks.length){
      charlinks.each((index)=>{
        urls.push(charlinks[index].attribs.href);
      });
    }
  }catch(e) {
    console.log('Unexpected error occurred',e);
    return;
  }
  //got all urls for this page, start processing
  var urlsProcessed = 0;
  var urlCount = 1;
  const total_urls = urls.length;
  //iterate through each character page and add or update in database
  for(index in urls){
    target_url = base_url+urls[index];
    console.log('starting job '+urlCount+' of '+total_urls+' for URL:'+urls[index]);
    rp(target_url)
      .then( async (char_html) =>{
        let character_data = await parseCharData(char_html);
        await validateCharacter(character_data);
        result = updateOrCreateChar(character_data,false)
          .then( async (result) => {
              urlsProcessed++;
              if(urlsProcessed === urls.length) {
                console.log('all characters on this page processed');
                //get next page url to process and redirect there if one exists;
                next_page_link = await getNextPage(list_html);
                if(next_page_link){
                  console.log('more character pages exist, redirecting to next link: '+next_page_link);
                  res.redirect('http://localhost:3000/parser/get-all-character-links?url='+next_page_link);
                }else{
                  console.log('Done with all character pages');
                  res.send('done');
                }
                return;
              }
            })
          .catch( (err) => {
              console.log(err);
          });
      }).catch((err)=>{
        console.log('Error',err);
      });
    urlCount++;
  }
  console.log('All jobs started, awaiting response... This may take a while');
});

router.get('/test-scrape-character-page/', (req, res) => {
  target_url = req.query.url;
  rp(target_url)
    .then(async (html) =>{
      let character_data = {
        name : $('.page-header__title', html).text(),
        thumbnail : $('.infobox .imagecell .image-thumbnail img',html).data('src'),
        summary : $('.infobox',html).next().text(),
        background : await genCharacterSection('Background',html),
        personality : await genCharacterSection('Personality',html),
        appearance : await genCharacterSection('Appearance',html),
        abilities : await genCharacterSection('Abilities',html),
        part_i : await genCharacterSection('Part_I',html),
        part_ii : await genCharacterSection('Part_II',html),
        trivia : await genCharacterSection('Trivia',html),
        quotes : await genCharacterSection('Quotes',html),
      };
      res.send(character_data.quotes);
    })
    .catch(function(err){
      console.log('could not load url: '+target_url,err);
    });
  // res.render('index', {title: 'My Express App', message: 'Hello'});
});

module.exports = router;
