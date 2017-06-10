const Ideas = require('../Models/idea.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function createIdea (req,res,next){
  // let user = jwt.verify(req.body.user_id,process.env.PANDA)
  Ideas.create({
    idea: req.body.idea,
    upvote: [],
    downvote:[],
    createdAt: req.body.createdAt,
    creator: req.body.creator,
    user_id: req.body.user_id,
    story_id: req.body.story_id
  },function(err,result){
    res.send(result)
  })
}

function editIdea (req,res,next){
  Ideas.findOne({
    _id: req.params.id
  },function(err,result){
    Ideas.updateOne({
      _id: req.params.id
    },{
      idea: req.body.idea || result.idea,
      upvote: req.body.upvote || result.vote,
      downvote: req.body.downvote || result.downvote,
      createdAt: req.body.createdAt || result.createdAt
    },function(err,result){
      res.send(`${req.body.idea} Updated!`)
    })
  })
}

function deleteIdea (req,res,next){
  Ideas.remove({
    _id: req.params.id
  },function(err,result){
    res.send(`Delete Idea Success!`)
  })
}

function listIdeas (req,res,next){
  Ideas.find(function(err,result){
    res.send(result)
  })
}

function storyIdeas (req,res,next){
  Ideas.find({
    story_id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

function userIdeas (req,res,next){
  Ideas.find({
    user_id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

function getOneIdea (req,res,next){
  Ideas.findOne({
    _id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

module.exports = {
  getOneIdea,userIdeas,storyIdeas,listIdeas,deleteIdea,editIdea,createIdea
}