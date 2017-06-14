var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors');
var index = require('./routes/index');
var users = require('./routes/users');
var answers = require('./routes/answers');
var questions = require('./routes/questions');
var app = express();
const mongoose = require('mongoose');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/users', users);
app.use('/api/answers', answers);
app.use('/api/questions', questions);

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
  res.send('error\n'+err);
});
app.listen(3000)


var env = app.settings.env;
var db_config = {
  development: 'mongodb://localhost/hacktivoverflow',
  test:'mongodb://localhost/hacktivoverflow-test'
}

mongoose.connect(db_config[env],(err,res)=>{
  console.log(err?err:'Berhasil connect ke '+db_config[env]);
})


module.exports = app;