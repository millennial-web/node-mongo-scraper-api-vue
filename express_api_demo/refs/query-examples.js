//set dependencies
const config = require('config');
const debugger_startup = require('debug')('app:startup');

const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//custom modules
const courses = require('./routes/courses');
const home = require('./routes/home');
//load only in development
if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  debugger_startup('Morgan enabled...');
}

// set view engine and directory
app.set('view engine', 'pug');
app.set('views', './views');

//set middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses',courses);
app.use('/',home);

//STARTUP CODE
//show configuration
// debugger_startup(`Application Name: ${config.get('name')}`);
// debugger_startup(`Mail Server: ${config.get('mail.host')}`);
// debugger_startup(`Mail Password: ${config.get('mail.password')}`);


//connect to mongo db
mongoose.connect(`mongodb:${config.get('db.host')}/${config.get('db.dbname')}`, {useNewUrlParser: true}).then(
  () => { debugger_startup('Connected to MongoDb') },
  err => { debugger_startup('Could not Connect to MongoDb')}
);

//schemas in mongoose are like blueprints with the fields expected in a mongodb document
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ], //array of strings
  date: {type: Date, default: Date.now},
  isPublished: Boolean
});
//we compile the mongoose schema into a model (class)
const Course = mongoose.model('Course', courseSchema);
//now we can create an object instance of the compiled model (class)
//and save the new object in our db
async function createCourse(){
  const course = new Course({
    name: "Angular Course",
    author: "Mike Soto",
    tags: ['angular','frontend'],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
}

//we can query documents in our db using the find, limit, sort and select methods of the model
async function getCourses(){
  const courses = await Course
    .find(
      {author: "Mike Soto", isPublished:true}
    )
    .limit(10)
    .sort({name:1}) //1 = ascending, -1 descending
    .select({name:1,tags:1})
  console.log(courses);
}

//you can create more advanced queries with comparison operators
// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in  (in list)
// nin (not in list)
async function getCoursesInPriceRange(){
  const courses = await Course
    .find(
      {
        author: "Mike Soto",
        isPublished:true,
        price: {$gte: 5, $lte: 11}
      }
    )
    .limit(10)
    .sort({name:1}) //1 = ascending, -1 descending
    .select({name:1,tags:1})
  console.log(courses);
}

async function getCoursesWithPrices(){
  const courses = await Course
    .find(
      {
        author: "Mike Soto",
        isPublished:true,
        price: { $in: [10,15,20] }
      }
    )
    .limit(10)
    .sort({name:1}) //1 = ascending, -1 descending
    .select({name:1,tags:1})
  console.log(courses);
}

//logical operators can also be used
//and
//or
async function getCoursesWithPrices(){
  const courses = await Course
    .find()
    .or( [ {author: "Mike Soto"}, {isPublished:true} ] )
    .and({price : 10})
    .limit(10)
    .sort({name:1}) //1 = ascending, -1 descending
    .select({name:1,tags:1})
  console.log(courses);
}

//regex can also be used
async function getCoursesWithRegex(){
  const courses = await Course
    .find()
    .or({ name: /^an/i} ,{name: /.*gu.*/i}, {name: /lar$/i})
    .limit(10)
  console.log(courses);
}


//returning count
async function getCoursesWithRegex(){
  const courses = await Course
    .find()
    .or({ name: /^an/i} ,{name: /.*gu.*/i}, {name: /lar$/i})
    .countDocuments()
  console.log(courses);
}

//pagination
var pageNumber = 1;
var pageSize = 1;
async function getCoursesWithRegex(){
  const courses = await Course
    .find({ author: 'Mike Soto'})
    .skip(pageNumber-1*pageSize)
    .limit(pageSize)
  console.log(courses);
}

//get and update a course
async function updateCourse(id){
  var course = await Course.findById(id);
  if(!course){
    console.log('course not found');
    return;
  }
  //if course is found, do update
  course.isPublished = true;
  course.author = 'Jack';
  var result = await course.save();
  console.log(result);
}

//update a course directly (without getting first)
async function updateCourse(id){
  var newCourseObj = await Course.findByIdAndUpdate(id,{
    $set : {
      author:"Mike Soto",
      isPublished:true
    }
  }, {new : true});
  console.log(newCourseObj);
}

//remove a course
async function removeCourse(id){
  var result = await Course.deleteOne({_id: id});
  console.log(result);
}

//remove many courses
async function removePublished(){
  var result = await Course.deleteMany({isPublished: true});
  console.log(result);
}
