var Answer = require('../models/answer');
var util = require('../helpers/util');
var methods = {}

methods.getAll = (req, res) => {
  Answer.find({}, (err, answers) => {
    res.send(answers)
  })
}

methods.get = (req, res) => {
  util.userInfo(req.headers.token, function(user){
    Answer.find({creator: user.id}, (err, answers) => {
      res.send(answers)
    })
  })
}

methods.create = (req, res) => {
  var answer = req.body.answer;
  if (req.headers.token) {
    util.userInfo(req.headers.token, function(user){
      Answer.create({
        answer: answer,
        creator: user.id,
        upVote: [],
        downVote: [],
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .then(response => {
        console.log(response);
        res.send('Task added')
      })
      .catch(err => console.log(err))
    })
  } else {
    res.send('Please login first')
  }
}

methods.getOne = (req, res) => {
  if(req.headers.token) {
    util.userInfo(req.headers.token, function(user) {
      Answer.find({_id: req.params.id, })
      .then(answer => {
        if(answer.creator == user._id){
          res.send(answer)
        } else {
          res.send('not authorized')
        }
        res.send(answer)
      })
      .catch(err => console.log(err))
    })
  } else {
    res.send('please login first')
  }
}

methods.update = (req, res) => {
  util.userInfo(req.headers.token, function(user) {
    Answer.findById(req.params.id)
    .then(answer =>{
      if(answer.creator == user.id){
        var answer = req.body.answer;

        Answer.update({_id:req.params.id}, {
          answer: answer,
          updatedAt: new Date()
        })
        .then(()=>{
          res.send('answer has been updated')
        })
      } else {
        res.send('not authorized')
      }
    })
    .catch(err => console.log(err))
  })
}

methods.delete = (req, res) => {
  util.userInfo(req.headers.token, function(user){
    Answer.findById(req.params.id)
    .then(answer => {
      if(answer.creator == user.id){
        answer.remove()
        .then(()=>{
          res.send('answer has been deleted')
        })
        .catch(err => console.log(err))
      } else {
        res.send('not authorized')
      }
    })
  })
}

methods.upvote = (req, res) => {
  util.userInfo(req.headers.token, function(user){
    Answer.findById(req.params.id)
    .then(answer => {
      let upvoteIdx = answer.upVote.indexOf(user.id)
      let downvoteIdx = answer.downVote.indexOf(user.id)

      if(upvoteIdx == -1 && downvoteIdx !== -1){
        answer.downVote.splice(downvoteIdx, 1)
        answer.save()
      } else if (upvoteIdx == -1 && downvoteIdx == -1){
        answer.upVote.push(user.id)
        answer.save()
      }
    })
    .catch(err => console.log(err))
  })
}

methods.downvote = (req, res) => {
  util.userInfo(req.headers.token, function(user){
    Answer.findById(req.params.id)
    .then(answer => {
      let upvoteIdx = answer.upVote.indexOf(user.id)
      let downvoteIdx = answer.downVote.indexOf(user.id)

      if(downvoteIdx == -1 && upvoteIdx !== -1){
        answer.upVote.splice(upvoteIdx, 1)
        answer.save()
      } else if (downvoteIdx == -1 && upvoteIdx == -1){
        answer.downvoteIdx.push(user.id)
        answer.save()
      }
    })
    .catch(err => console.log(err))
  })
}

module.exports = methods
