//set dependencies
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const app = express();

//custom modules
const courses = require('./routes/courses');
const home = require('./routes/home');
//load only in development
if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

//simulate db connection work...
console.log('Connected to the database...');

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
// console.log(`Application Name: ${config.get('name')}`);
// console.log(`Mail Server: ${config.get('mail.host')}`);
// console.log(`Mail Password: ${config.get('mail.password')}`);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//=======================================================================================
//call multiple promise funcions in sequence
// function getUser(id){
//   return new Promise((resolve,reject) => {
//     //async work
//     setTimeout(() => {
//       console.log('Reading a user from a database...');
//       resolve({id: id, gitHubUsername: 'mikesoto'}); // pending to resolved or fulfilled
//       // reject(new Error('error message')); // pending to rejected
//     },2000);
//   });
// }
//
// function getRepositories(username){
//   return new Promise((resolve,reject) => {
//     setTimeout(() => {
//       console.log('Calling Github Api for user repositories... ');
//       resolve(['repo1','repo2','repo3']);
//       // reject(new Error('error message')); // pending to rejected
//     }, 2000);
//   })
// }
//
// function getCommits(repo){
//   return new Promise((resolve,reject) => {
//     setTimeout(() => {
//       console.log('Calling Github Api for commits... ');
//       resolve(['commit1','commit2','commit3']);
//       // reject(new Error('error message')); // pending to rejected
//     }, 2000);
//   })
// }
//
// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log(commits))
//   .catch(err => console.error(err.message));
//
// //settled promises are usefull for unit testing where you want it instantly resolved
// settled_promise = Promise.resolve({id:1});
// settled_promise
//   .then(result => console.log(result));
//
// //rejected promises are also usefull for unit testing where you want it instantly rejected
// rejected_promise = Promise.reject(new Error('reason for rejection...'));
// rejected_promise
//     .catch(error => console.log(error));

// //=========================================================================================
// //call two promises in parallel and do something only when all promises are resolved
// const p1 = new Promise((resolve,reject) => {
//   setTimeout(() =>{
//     console.log('Calling Facebook API');
//     resolve(1);
//     // reject(new Error('something failed with facebook call'));
//   },2000);
// });
//
// const p2 = new Promise((resolve,reject) => {
//   setTimeout(() =>{
//     console.log('Calling Twitter API');
//     resolve(2);
//     // reject(new Error('something failed with twitter call'));
//   },2000);
// });
//
// Promise.all([p1,p2])
//   .then(result => console.log(result))
//   .catch(err => console.log("Error",err.message));

// //=========================================================================================
// //call two promises in parallel and do something when as soon as one of them completes
// const p1 = new Promise((resolve,reject) => {
//   setTimeout(() =>{
//     console.log('Calling Facebook API');
//     resolve(1);
//     // reject(new Error('something failed with facebook call'));
//   },2000);
// });
//
// const p2 = new Promise((resolve,reject) => {
//   setTimeout(() =>{
//     console.log('Calling Twitter API');
//     resolve(2);
//     // reject(new Error('something failed with twitter call'));
//   },2000);
// });
//
// Promise.race([p1,p2])
//   .then(result => console.log(result))
//   .catch(err => console.log("Error",err.message));



//=======================================================================================
//use async and await to write async code like synchronous code (still runs asyncrhonously)
async function displayCommits() {
  try{
    var user = await getUser(1);
    var repos = await getRepositories(user.gitHubUsername);
    var commits = await getCommits(repos[0]);
    console.log(commits);
  }catch(err){
    console.log('Error',err);
  }
}
displayCommits();
