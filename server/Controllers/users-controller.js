const Users = require('../Models/user.js')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
require('dotenv').config()

function signup (req,res,next){
  let hash = bcrypt.hashSync(req.body.password,salt)
  Users.create({
    name: req.body.name,
    username: req.body.username,
    password: hash,
    email: req.body.email
  },function(err,result){
    res.send(result)
  })
}

function login (req,res,next){
  Users.findOne({
    username: req.body.username
  },function(err,result){
    if(!result){
      res.send('Invalid Username!')
    }
    else{
      if(bcrypt.compare(req.body.password,result.password)){
        // let token = {
        //   _id: result._id,
        //   name: result._id
        // }
        let token = jwt.sign({_id:result._id,name:result._id,username:result._id},process.env.PANDA)
        res.send(token)
      }
      else{
        res.send('Invalid Password')
      }
    }
  })
}

function listUsers (req,res,next){
  Users.find(function(err,result){
    console.log(result);
    res.send(result)
  })
}

function getOneUser (req,res,next){
  Users.findOne({
    _id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

function editProfile (req,res,next){
  let hash = bcrypt.hashSync(req.body.password,salt)
  Users.findOne({
    _id: req.params.id
  },function(err,result){
    Users.updateOne({
      name: req.body.name || result.name,
      username: req.body.username || result.username,
      password: hash || result.password,
      email: req.body.email || result.email
    },function(err,result){
      res.send(`${req.body.name} Updated!`)
    })
  })
}

function deleteUser (req,res,next){
  Users.remove({
    _id: req.params.id
  },function(err,result){
    res.send(`Delete User Success!`)
  })
}

module.exports = {
  deleteUser,editProfile,getOneUser,listUsers,login,signup
}