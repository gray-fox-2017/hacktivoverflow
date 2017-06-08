var router = express.Router()
var mongoose = require('mongoose')
const question_model = require('../models/question.js')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var methods = {}
//cara 1, save is more faster than .create
methods.add_question = function(req, res, next){
    var question = new question_model({
      title:req.body.title,
      text:req.body.text,
      author : req.body.author
    })
    question.save(function(err,result){
      if(!err) res.send(result)
      else res.send(err.message)
    })
}
//cara 2
methods.add_question2 = function(req, res, next) {
  let query = {title:req.body.title, text:req.body.text, author:req.body.author}
  question_model.create(query, function(err, question) {
    if(!err) res.send(question)
    else res.send(err)
  })
}

methods.getAllquestion = function(req, res, next) {
  question_model.find(function(err, question) {
    if(!err) res.send(question)
    else console.log(err);
  })
}
//method deleteOne can also use remove, deleteOne with promise .then / callback and deleteMany
methods.delete_question = function(req, res, next) {
  question_model.deleteOne({_id:req.params.id}, function(err, result) {
    if(!err) res.send("success deleted")
    else res.send(err)
  })
}

//trying using findOneandDelete
//docs : http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

methods.update_question = function(req, res, next) {
  let id = req.params._id
  let query_update = {title: req.body.title, text: req.body.text, author: req.body.author}

  question_model.findOneAndUpdate({_id:id}, {$set : {title: req.body.title, text: req.body.text, author: req.body.author}}, function(err, result) {
    if(!err) res.send("update successful\n"+ result)
    else res.send(err.message)
  })
}

module.exports = methods
