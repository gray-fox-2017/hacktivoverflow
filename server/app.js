const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var app = express()
var mongoose = require('mongoose');
var users = require('./routes/users');
var threads = require('./routes/threads');
var index = require('./routes/index');

var db_config = {
  development: 'mongodb://localhost/hacktivoverflow',
  test: 'mongodb://localhost/hacktivoverflow-test'
}

var current_env = app.settings.env

mongoose.connect(db_config[current_env])

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index)
app.use('/api/users', users)
app.use('/api/threads', threads)

app.listen(3000)

module.exports = app;