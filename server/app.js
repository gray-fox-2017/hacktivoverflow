const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/hacktivoverflow');
var cors = require('cors')

var app = express();
var users = require('./routes/users');
var questions = require('./routes/questions');
var answers = require('./routes/answers');
var index = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(cors())
app.use('/api/users', users);
app.use('/api/questions', questions);
app.use('/api/answers', answers);
app.use('/', index);

app.listen(7000, () => {
  console.log('Listening on port 7000');
})
