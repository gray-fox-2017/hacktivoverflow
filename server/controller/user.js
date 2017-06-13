const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config({path: '../.env'});

//decoding a token
var controllers = {}
controllers.getDecode = (req, res, next)=>{
  let token = jwt.verify(req.params.token, process.env.SECRET);
  res.send({username: token.username, id:token.id});
};

controllers.signIn = (req, res, next)=>{
  console.log('user data', req.user);
  let obj = req.user;
  if(obj.hasOwnProperty('message')){
    res.send({message: obj.message})
  } else {
    let token = jwt.sign({
      id: obj._id,
      username: obj.username,
      email: obj.email
    }, process.env.SECRET, {
      expiresIn: 'id'
    })
    res.send({token: token})
  }
}

controllers.signUp = (req, res, next)=>{
  console.log('this is body-->', req.body);
  User.findOne({
    username: req.body.username
  }, (err, result)=>{
    if(!user){
      var newUser = new User({
        username: req.body.username,
        password: passswordHash.generate(req.body.password),
        email: req.body.email,
        phone: req.body.phone
      })
      newUser.save(function(err, data){
        if(err){
          res.send(err)
        } else {
          res.send(data)
        }
      })
    } else {
      res.send({message: 'Username is alredy exist'})
    }
  })
}

module.exports = controllers;
