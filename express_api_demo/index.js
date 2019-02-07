//set dependencies
const config = require('config');//easy config lib
const morgan = require('morgan');//logs http request info to console
const helmet = require('helmet');//security headers lib
const mongoose = require('mongoose');//wrapper for mongodb
const express = require('express');//framework
const app = express();

//development only modules
if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  console.log('In development, Morgan enabled...');
}

//custom modules
const parser = require('./routes/parser');
const characters = require('./routes/characters');


// set view engine and directory
app.set('view engine', 'pug');
app.set('views', './views');

//set middleware (pre-processors)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//set routers
app.use('/api/characters',characters);
app.use('/parser',parser);

console.log(`Routers loaded for: ${config.get('name')}`);
//connect to mongo db and start server
mongoose.connect(`mongodb:${config.get('db.host')}/${config.get('db.dbname')}`, {useNewUrlParser: true})
  .then(() => {
      console.log('Connected to MongoDb');
  })
  .catch((err) => {
      console.log('Could not Connect to MongoDb');
  });
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}...`));
