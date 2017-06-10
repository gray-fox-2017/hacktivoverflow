const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const cors = require('cors');
var passwordHash = require('password-hash');
const app = express()
app.use(cors())

let db_config = {
    development: 'mongodb://localhost/hacktivflow',
    test: 'mongodb://localhost/hacktivflow-test'
}

let app_env = app.settings.env
mongoose.connect(db_config[app_env], function(err, res) {
    console.log('Connected to Database ' + db_config[app_env])
})

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connection success');
});

app.set('port', process.env.PORT || 3000)
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
//   next()
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/questions', require('./routes/questions'));
app.use('/answers', require('./routes/answers'));
app.use('/votes', require('./routes/votes'));

app.use(passport.initialize());

passport.use(new Strategy(function(username, password, cb) {
  let User = require('./models/users')
  User.findOne({
    username: username
  }, function(err, user) {
    if (err) cb(err)
    if (passwordHash.verify(password, user.password)) {
      cb(null, user)
    } else {
      cb('Wrong password')
    }
  })
}));

app.listen(app.get('port'), function() {
    console.log('listening on port ' + app.get('port'))
})

module.exports = app
