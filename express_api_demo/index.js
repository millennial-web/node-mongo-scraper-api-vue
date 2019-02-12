//set dependencies
const config = require('config');//easy config lib
const morgan = require('morgan');//logs http request info to console
const helmet = require('helmet');//security headers lib
const mongoose = require('mongoose');//wrapper for mongodb
const bodyParser = require('body-parser');
const express = require('express');//framework
//custom modules
const parser = require('./routes/parser');
const character_router = require('./routes/character_router');
const app = express();

//development only modules
if(app.get('env') === 'development'){
  app.use(morgan('combined'));
  console.log('In development, Morgan enabled...');
}

// set view engine and directory
app.set('view engine', 'pug');
app.set('views', './views');

//set middleware (pre-processors)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));
app.use(express.static('public'));
app.use(helmet());
//add cors headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//db options
let dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  keepAlive: 1,
  connectTimeoutMS: 30000
};

//set routers
app.use('/api/characters',character_router);
app.use('/parser',parser);

console.log(`Routers loaded for: ${config.get('name')}`);
//connect to mongo db
mongoose.connect(`${config.get('dbconnect')}`, dbOptions)
  .then(() => {
      console.log('Connected to MongoDb');
  })
  .catch((err) => {
      console.log('Could not Connect to MongoDb',err);
  });

//start server
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}...`));

module.exports = app;//for testing
