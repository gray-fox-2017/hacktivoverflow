var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const user_model = require('../models/user.js')

var methods = {}

methods.getAlluser = function(req, res, next) {
  user_model.find({}, function(err, result) {
    if(!err) res.send(result)
    else console.log(err);
  })
}
//method deleteOne can also use remove, deleteOne with promise .then / callback and deleteMany
methods.delete_user = function(req, res, next) {
  user_model.deleteOne({_id:req.params.id}, function(err, result) {
    if(!err) res.send("success deleted")
    else res.send(err)
  })
}

//trying using findOneandDelete
//docs : http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

methods.update_user = function(req, res, next) {
  let id = req.params._id
  user_model.findOneAndUpdate({_id:id}, {$set : {username: req.body.username, password: req.body.password, email: req.body.email}}, function(err, result) {
    if(!err) res.send("update successful\n"+ result)
    else res.send(err.message)
  })
}

module.exports = methods
