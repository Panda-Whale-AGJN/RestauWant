const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const restaurantController = require('./controllers/restaurantController');
const MONGO_URI = 'mongodb+srv://gar12344:Pokemon0258631@cluster0.i3sqoka.mongodb.net/?retryWrites=true&w=majority';

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const LoginUser = require('./models/loginUserModel');
require('dotenv').config();
const session = require('express-session');
const util = require('util');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const partials = require('express-partials');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'ResturantDb'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

app.use(express.json());

// app.use('/', express.static(path.resolve(__dirname, '../client')));

app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use('/auth', passport.initialize());
app.use('/auth', passport.session());


// OAUTH ENDPOINT
/*
passport.serializeUser(function(user, done) {
  console.log('user within serializeUser,', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('user within deserializeUser,', obj);
  done(null, obj);
});
*/

passport.serializeUser(function(user, done) {
  console.log('user within serializeUser,', user.id);
  done(null, user.githubId);
});

passport.deserializeUser(async function(id, done) {
  console.log('user within deserializeUser,', id);
  const user = await LoginUser.findById(id);
  console.log('please fking work');
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: process.env['GITHUB_CLIENT_ID'],
  clientSecret: process.env['GITHUB_CLIENT_SECRET'],
  callbackURL: '/api/auth/github/callback',
}, 
function(accessToken, refreshToken, profile, done) {
  // process.nextTick(function () {
      
  //   // To keep the example simple, the user's GitHub profile is returned to
  //   // represent the logged-in user.  In a typical application, you would want
  //   // to associate the GitHub account with a user record in your database,
  //   // and return that user instead.
  //   return done(null, profile);
  // });
  LoginUser.findOrCreate({githubId: profile.id}, function(err, user){
    console.log('user within findOrCreate query, ', user);
    //WE ARE HERE
    return done(err, user);
  });
}));


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// app.get('/', (req, res) => {
//   res.redirect('/');
//   return;
// });

app.use('/api/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// app.use('/api/secret', (req, res, next) => {
//   return res.sendFile(path.join(__dirname, '/secret.html'));
// });

app.use('/api/secret', ensureAuthenticated);

function ensureAuthenticated(req, res, next) {
  console.log('req.session.passport.user', req.session.passport.user);
  console.log('req.isAuthenticated', req.user);
  //if (req.isAuthenticated()) { return res.sendFile(path.join(__dirname, '/secret.html')); }
  return res.redirect('/api/login');
}



// app.use('/api/secret', ensureAuthenticated, (req, res, next) => {
//   return res.sendFile(path.join(__dirname, '/secret.html'));
// });

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   return res.redirect('/api/login');
// }

app.get('/api/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/api/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/api/auth/github/callback', passport.authenticate('github', { failureRedirect: '/api/login' }),
  function(req, res) {
  // Successful authentication, redirect home.
    res.redirect('/api/secret');
  });






// USER ENDPOINT
// create a user router to handle all requests related to users in the database
const userRouter = express.Router();
app.use('/api/user', userRouter);

// Create a user in the database
// http://localhost:8080/user/
userRouter.post('/', userController.createUser, (req, res) => {
  return res.send(res.locals.newUser);
});

// Get all users from the database
// http://localhost:8080/user/
userRouter.get('/', userController.getAllUsers, (req, res) => {
  return res.send(res.locals.allRetrievedUsers);
});

// Get a specific user from the database
// http://localhost:8080/user/"name"
userRouter.get('/:name', userController.getUser, (req, res) => {
  return res.send(res.locals.retrievedUser);
});

// Change a user's info
// http://localhost:8080/user/"name"
userRouter.patch('/:name', userController.updateUser, (req, res) => {
  return res.send(res.locals.updatedUser);
});

// Delete a user from the database
// http://localhost:8080/user/"name"
userRouter.delete('/:name', userController.deleteUser, (req, res) => {
  return res.send(JSON.stringify({message: 'This user is now dead bro'}));
});



// RESTAURANT ENDPOINT
// restaurant router to handle all requests related to restaurants in the database
const restaurantRouter = express.Router();
app.use('/api/restaurant', restaurantRouter);

// Get an array of restaurants from the API
// http://localhost:8080/restaurant/search?term=delis&latitude=37.786882&longitude=-122.399972
// const term = req.query.term --> delis
// const latitude = req.query.latitude --> 37.786882
// const longitude = req.query.longitude --> -122.399972
restaurantRouter.get('/search', restaurantController.searchApi, (req, res) => {
  return res.send(res.locals.yelpResults);
});

// Create a restaurant in the database
// http://localhost:8080/restaurant/
// restaurantRouter.post('/', restaurantController.createRestaurant, (req, res) => {
//   return res.send(res.locals.newRestaurant);
// });

// Get all restaurants from the database
// http://localhost:8080/restaurant/
// restaurantRouter.get('/', restaurantController.getAllRestaurants, (req, res) => {
//   return res.send(res.locals.allRetrievedRestaurants);
// });

// Get a specific restaurant from the database
// http://localhost:8080/restaurant/"name"
// restaurantRouter.get('/:name', restaurantController.getRestaurant, (req, res) => {
//   return res.send(res.locals.retrievedRestaurant);
// });

// Change a restaurant's info
// http://localhost:8080/restaurant/"name"
// restaurantRouter.patch('/:name', restaurantController.updateRestaurant, (req, res) => {
//   return res.send(res.locals.updatedRestaurant);
// });

// Delete a restaurant from the database
// http://localhost:8080/restaurant/"name"
// restaurantRouter.delete('/:name', restaurantController.deleteRestaurant, (req, res) => {
//   return res.send(JSON.stringify({message: 'This restaurant is bankrupt bro'}));
// });

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('One page at a time please, we can only code so much in three days'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


/* GET https://github.com/login/oauth/authorize

Name	Type	Description
client_id	    string	Required. The client ID you received from GitHub when you registered.
redirect_uri	string	The URL in your application where users will be sent after authorization. See details below about redirect urls.
login	        string	Suggests a specific account to use for signing in and authorizing the app.
scope	        string	A space-delimited list of scopes. If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application. For users who have authorized scopes for the application, the user won't be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the set of scopes the user has authorized for the application. For example, if a user has already performed the web flow twice and has authorized one token with user scope and another token with repo scope, a third web flow that does not provide a scope will receive a token with user and repo scope.
state	        string	An unguessable random string. It is used to protect against cross-site request forgery attacks.
allow_signup	string	Whether or not unauthenticated users will be offered an option to sign up for GitHub during the OAuth flow. The default is true. Use false when a policy prohibits signups.

*/

/* POST https://github.com/login/oauth/access_token

Name	Type	Description
client_id	    string	Required. The client ID you received from GitHub for your OAuth App.
client_secret	string	Required. The client secret you received from GitHub for your OAuth App.
code	        string	Required. The code you received as a response to Step 1.
redirect_uri	string	The URL in your application where users are sent after authorization.

Accept: application/json
{
  "access_token":"gho_16C7e42F292c6912E7710c838347Ae178B4a",
  "scope":"repo,gist",
  "token_type":"bearer"
}
*/

module.exports = server