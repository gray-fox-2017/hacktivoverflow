const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config({path: '../.env'});

const Posting = require('../models/posting');

var controllers = {};

//find one on vote up or down
controllers.vote = (req, res, next)=>{
  let status = jwt.verify(req.headers.token, process.env.SECRET);
  console.log(status.id);
  Posting.findById(req.params.id, function(err, data){
    let resultVoteUp = data.vote_up.indexOf(status.id);
    let resultVoteDown = data.vote_down.indexOf(status.id);
    console.log(resultVoteDown);
    console.log(resultVoteUp);
    console.log(req.body.vote);
    if(resultVoteUp == -1 && resultVoteDown == -1){
      if(req.body.vote == 'up'){
        data.vote_up.push(status.id)
        data.save((err, value)=>{
          res.send(value)
        })
      }
      if(req.body.vote == 'down'){
        data.vote_down.push(status.id)
        data.save((err, value)=>{
          res.send(value)
        })
      }
    } else {
      res.send({status: 'Vote Can Only Once'})
    }
  })
}

//get all data
controllers.getAll = function(req, res, next){
  Post.find({})
  .populate('user_id comment_id')
  .exec((err, post)=>{
    res.send(post)
  })
}

//get data
controllers.getData = (req, res, next)=>{
  let status = jwt.verify(req.headers.token, process.env.SECRET);;
  Post.findById(req.params.id)
  .populate('user_id commnet_id')
  .exec((err, post)=>{
    if(err){
      res.send(err)
    } else {
      if(post.user_id._id == status.id){
        res.send({post: post, id: status.id})
      } else {
        res.send(post)
      }
    }
  })
}

controllers.posting = function(req, res, next){
  let status = jwt.verify(res.headers.token, process.env.SECRET)
  let newPost = new Post({
    user_id: status.id,
    title: req.body.title,
    message: req.body.message
  })
  newPost.save((err, post)=>{
    res.send(post)
  })
}

controllers.updatePost = function(req, res, next){
  Post.findById(req.params.id, (err, data)=>{
    if(err){
      res.send(err)
    } else {
      data.title = req.body.title || data.title
      data.massage = req.body.message || data.message
      data.save((err, result)=>{
        res.send(result)
      })
    }
  })
}

controllers.delete = function(req, res, next){
  let status = jwt.verify(req.headers.token, process.env.SECRET)
  Post.findById(req.params.id, (err, result)=>{
    if(err) res.send(err)
    if(result.user_id == status.id){
      Post.findByIdAndRemove(req.params.id, (err, result)=>{
        if(err) res.send(err)
        res.send(result)
      })
    } else {
      res.send({message: 'you are not authorized'});
    }
  })
}

module.exports = controllers;
