const Stories = require('../Models/story.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function createStory (req,res,next){
  let user = jwt.verify(req.body.user_id,process.env.PANDA)
  Stories.create({
    title: req.body.title,
    story: req.body.story,
    vote: [],
    user_id: user._id
  },function(err,result){
    res.send(result)
  })
}

function editStory (req,res,next){
  Stories.findOne({
    _id: req.params.id
  },function(err,result){
    Stories.updateOne({
      _id: req.params.id
    },{
      title: req.body.title || result.title,
      story: req.body.story || result.story,
      vote: req.body.vote || result.vote
    },function(err,result){
      res.send(`${req.body.title} Updated!`)
    })
  })
}

function deleteStory (req,res,next){
  Stories.remove({
    _id: req.params.id
  },function(err,result){
    res.send(`Delete Story Success!`)
  })
}

function listStories (req,res,next){
  Stories.find({},function(err,result){
    res.send(result)
  })
}

function userStories (req,res,next){
  Stories.find({
    user_id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

function getOneStory (req,res,next){
  Stories.findOne({
    _id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

module.exports = {
  getOneStory,userStories,listStories,deleteStory,editStory,createStory
}