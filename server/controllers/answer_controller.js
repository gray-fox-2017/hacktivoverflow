var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const answer_model = require('../models/answer.js')

var methods = {}
//cara 1, save is more faster than .create
var add_answer = function(req, res, next){
    var answer = new answer_model({
      answerBody:req.body.answerBody,
      creator: req.body.creator,
      upvotes: [],
      downvotes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    })
    answer.save(function(err,result){
      if(!err) res.send(result)
      else res.send(err.message)
    })
}

var getAllanswer = function(req, res, next) {
  answer_model.find({}, function(err, result) {
    if(!err) res.send(result)
    else console.log(err);
  })
}
//method deleteOne can also use remove, deleteOne with promise .then / callback and deleteMany
var delete_answer = function(req, res, next) {
  answer_model.deleteOne({_id:req.params.id}, function(err, result) {
    if(!err) res.send("success deleted")
    else res.send(err)
  })
}

//trying using findOneandDelete
//docs : http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

var update_answer = function(req, res, next) {
  let id = req.params._id
  answer_model.findOneAndUpdate({_id:id}, {$set : {answerBody: req.body.answerBody, updatedAt: new Date()}}, function(err, result) {
    if(!err) res.send("update successful\n"+ result)
    else res.send(err.message)
  })
}

var upvotes = function(req, res) {
  let id = req.params._id
  answer_model.findById(id, function(err, result) {
    if (result.creator == req.body.user) {
      var index_up = result.upvotes.indexOf(req.body.user)
      var index_down = result.downvotes.indexOf(req.body.user)
      if (index_up == -1 && index_down == -1) {
        result.upvotes.push(req.body.user)
      } else if (index_down !== -1) {
        result.downvotes.splice(index_down, 1)
      }
      result.save(function(err, updated_result) {
        if (!err) res.send(updated_result)
        else res.send(err)
      })
    }
  })
}

var downvotes = function(req, res) {
  let id = req.params._id
answer_model.findById(id, function(err, result) {
    if (result.creator == req.body.user) {
      var index_up = result.upvotes.indexOf(req.body.user)
      var index_down = result.downvotes.indexOf(req.body.user)
      if (index_up == -1 && index_down == -1) {
        result.downvotes.push(req.body.user)
      } else if (index_down !== -1) {
        result.upvotes.splice(index_down, 1)
      }
      result.save(function(err, updated_result) {
        if (!err) res.send(updated_result)
        else res.send(err)
      })
    }
  })
}

module.exports = {
  downvotes,
  upvotes,
  update_answer,
  delete_answer,
  getAllanswer,
  add_answer

}
