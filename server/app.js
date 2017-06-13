var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const localStrategy = require('passport-local');
const passwordHash = require('password-hash');

const User = require('./models/user');

var index = require('./routes/index');
var users = require('./routes/users');
var posting = require('./routes/posting');
var comment = require('./routes/comment');

//connection to MongoDB
const mongoose = require('mongoose');
var db_config = {
  development: 'mongodb://localhost/stackoverflow',
  test: 'mongodb://localhost/stackoverflow-test'
}

passport.use(new localStrategy((username, password, done)=>{
  User.findOne({username : username}, (err, user)=>{
    if(!user){
      return done(null, { message : 'Username Not Found You Must Register'})
    }
    if(!passwordHash.verify(password, user.password)){
      return done(null, { message : 'Your Password Wrong'})
    }
    return done(null, user)
  })
}))

var app = express();
app.use(cors())
app.use(passport.initialize());
const app_env = app.settings.env
console.log(app_env);
mongoose.connect(db_config[app_env], (err, res)=>{
  console.log(`Connected to Database ${db_config[app_env]}`);
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/posting', posting);
app.use('/comment', comment);


module.exports = app;
