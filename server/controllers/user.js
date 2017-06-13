const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config({path: '../.env'})

let controllers = {}

//decode token
controllers.getDecode = (req,res,next)=>{
  let token = jwt.verify(req.params.token, process.env.SECRET)
  res.send({username: token.username, id : token.id})
}

//sign in
controllers.signIn = (req,res,next)=>{
  console.log('user ada', req.user);
  let obj = req.user
  if(obj.hasOwnProperty("message")){
    res.send({message : obj.message})
  } else {
    let token = jwt.sign({
      id : obj._id,
      username : obj.username,
      email : obj.email,
    }, process.env.SECRET ,{
      expiresIn : '1d'
    })
    res.send({token: token})
  }
}

//sign up
controllers.signUp = (req,res,next)=>{
  User.findOne({username : req.body.username},(err, user)=>{
    if(!user){
      var newUser = new User({
        username: req.body.username,
        password: passwordHash.generate(req.body.password),
        email: req.body.email,
        phone: req.body.phone
      })
      newUser.save((err, user)=>{
        if(err) res.send(err)

        res.send(user)
      })
    } else {
      res.send({message : 'Username has been use'})
    }
  })

}

module.exports = controllers;
