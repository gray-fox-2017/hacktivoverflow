var router = express.Router()
var mongoose = require('mongoose')
const question_model = require('../models/question.js')

var methods = {}
//cara 1, save is more faster than .create
methods.add_question = function(req, res, next){
    var question = new question_model({
      title:req.body.title,
      body:req.body.body,
      creator: req.body.creator,
      replies: [],
      upvotes: [],
      downvotes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    })
    question.save(function(err,result){
      if(!err) res.send(result)
      else res.send(err.message)
    })
}

methods.getAllquestion = function(req, res, next) {
  question_model.find({}, function(err, result) {
    if(!err) res.send(result)
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
  let query_update = {title: req.body.title, body: req.body.body, creator: req.body.creator}

  question_model.findOneAndUpdate({_id:id}, {$set : {title: req.body.title, body: req.body.body, creator: req.body.creator, updatedAt: new Date()}}, function(err, result) {
    if(!err) res.send("update successful\n"+ result)
    else res.send(err.message)
  })
}

methods.upvote = function(req, res) {
  let id = req.params._id
  question_model.findById(id, (err, result) {
    if (result.creator == req.body.user) {
      var index_up = result.upvotes.indexOf(req.body.user)
      var index_down = result.downvotes.indexOf(req.body.user)
      if (index_up == -1 && index_down == -1) {
        result.upvotes.push(req.body.user)
      } else if (index_down !== -1) {
        result.downvotes.splice(index_down, 1)
      }
      result.save((err, updated_result) {
        if (!err) res.send(updated_result)
        else res.send(err)
      })
    }
  })
}

methods.downvotes = function(req, res) {
  let id = req.params._id
  question_model.findById(id, (err, result) {
    if (result.creator == req.body.user) {
      var index_up = result.upvotes.indexOf(req.body.user)
      var index_down = result.downvotes.indexOf(req.body.user)
      if (index_up == -1 && index_down == -1) {
        result.downvotes.push(req.body.user)
      } else if (index_down !== -1) {
        result.upvotes.splice(index_down, 1)
      }
      result.save((err, updated_result) {
        if (!err) res.send(updated_result)
        else res.send(err)
      })
    }
  })
}

module.exports = methods
