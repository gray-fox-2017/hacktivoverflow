const secret = process.env.SECRET;
const user_model = require('../models/user_model');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var jwt = require('jsonwebtoken');
require('dotenv').config()

var methods = {}

methods.authentication = function(req, res, next) {
  let token = req.body.token

  if(token) {
    jwt.verify(token, secret, (err, decoded) {
      if(decoded._id == req.params._id) {
        next()
      } else {
        res.send(err)
      }
    })
  } else {
    res.send({msg: 'Login Please!'})
  }
}

methods.signUp = function(req, res){

    var hash = bcrypt.hashSync(req.body.password, salt);
    console.log('hasnyanyaaaa ',hash);
    var user = new user_model({
      username: req.body.username,
      password: hash,
      email: req.body.email
    })
    user.save(function(err,result){
      console.log('usernya', user);
      if(!err) res.send('success \n'+result)
      else res.send(err.message)
    })
}

methods.signIn = function(req, res) {
  let username = req.body.username
  let password = req.body.password
  user_model.find({username: username}, function(err, result) {
    if (bcrypt.compare(req.body.password, result.password)) {
      .then(result_data => {
        if (result_data) {
          var token = jwt.sign({name: result_data.name, username: result_data.username, email: result_data.email}, secret)
          res.send({token:token})
        } else {
          res.send({msg: 'Failed Check Your Password! '})
        }
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      res.send('user not found!')
    }
  })
}

module.exports = methods
