var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
var stories = require('./routes/stories');
var users = require('./routes/users');
var ideas = require('./routes/ideas')

var app = express();

var db_config = {
  development:'mongodb://hacktivoverflow:hacktivoverflow@ds111622.mlab.com:11622/hacktivoverflow-stedy',
  test: 'mongodb://hacktivoverflow:hacktivoverflow@ds111622.mlab.com:11622/hacktivoverflow-stedy-test'
}
var current_env = app.settings.env //developnent / test / production
mongoose.connect(db_config[current_env],function(err,res){
  if(err){
    console.log('error database',err);
  }
  else{
    console.log('connected to database', db_config[current_env]);
  }
})
// view engine setup
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', stories);
app.use('/users', users);
app.use('/ideas',ideas)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
