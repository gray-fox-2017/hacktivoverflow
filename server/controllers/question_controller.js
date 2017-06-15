var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const question_model = require('../models/question.js')

// cara 1, save is more faster than .create
var add_question = function(req, res, next){
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

var getAllquestion = function(req, res, next) {
  question_model.find({}, function(err, result) {
    if(!err) res.send(result)
    else console.log(err);
  })
}

var getQeustionById = function(req, res, next) {
  let id = req.params._id
  question_model.findById({_id: id}, function(err, result) {
    if(!err) res.send(result)
    else res.send(err)
  })
}

//method deleteOne can also use remove, deleteOne with promise .then / callback and deleteMany
var delete_question = function(req, res, next) {
  question_model.deleteOne({_id:req.params._id}, function(err, result) {
    if(!err) res.send("success deleted")
    else res.send(err)
  })
}

//trying using findOneandDelete
//docs : http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

var update_question = function(req, res, next) {
  let id = req.params._id
  let query_update = {title: req.body.title, body: req.body.body, creator: req.body.creator}
  question_model.findById({_id:id}, function(err, result) {
    question_model.findOneAndUpdate({_id:id}, {$set : {title: req.body.title || result.title, body: req.body.body || result.body, updatedAt: new Date()}}, function(err, result) {
      if(!err) res.send("update successful\n"+ result)
      else res.send(err.message)
    })
  })

}

var upvote = function(req, res) {
  let id = req.params._id
  question_model.findById({_id:id}, function(err, result) {
    if (req.body.creator) {
      console.log('masuk');
      var index_up = result.upvotes.indexOf(req.body.creator)
      var index_down = result.downvotes.indexOf(req.body.creator)
      if (index_up == -1 && index_down == -1) {
        result.upvotes.push(req.body.creator)
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

var downvote = function(req, res) {
  let id = req.params._id
  console.log('question id : ',id);
  question_model.findById({_id:id}, function(err, result) {
    console.log(result);
    if (req.body.creator) {
      console.log('-===========================-7');
      var index_up = result.upvotes.indexOf(req.body.creator)
      var index_down = result.downvotes.indexOf(req.body.creator)
      console.log('up :', index_up);
      console.log('down: ', index_down);
      if (index_up == -1 && index_down == -1) {
        result.downvotes.push(req.body.creator)
        console.log('ini sini');
      } else if (index_up !== -1) {
        console.log('going to index_up !== -1');
        // result.upvotes.slice(index_up, 1)
        var listToDelete = req.body.creator
        console.log('listToDelete ', listToDelete);
        for(var i = 0; i < result.upvotes.length; i++) {
            var obj = result.upvotes[i];

            if(listToDelete.indexOf(obj.id) !== -1) {
                result.upvotes.splice(i, 1);
            }
        }
      }
      result.save(function(err, updated_result) {
        if (!err) res.send(updated_result)
        else if(err) res.send(err)
      })
    } else {
      console.log('hi gagal');
    }
  })
}

module.exports = {
  add_question,
  getAllquestion,
  getQeustionById,
  delete_question,
  update_question,
  upvote,
  downvote
}
