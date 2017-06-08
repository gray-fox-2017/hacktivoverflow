var Question = require('../models/question');
var util = require('../helpers/util');
var methods = {}

methods.getAll = (req, res) => {
  Question.find({}, (err, questions) => {
    res.send(questions)
  })
}

methods.get = (req, res) => {
  util.userInfo(req.headers.token, function(user){
    Question.find({creator: user.id}, (err, questions) => {
      res.send(questions)
    })
  })
}

methods.create = (req, res) => {
  var title = req.body.title;
  var detail = req.body.detail;
  var tags = req.body.tags;
  if (req.headers.token) {
    util.userInfo(req.headers.token, function(user){
      Question.create({
        title: title,
        detail: detail,
        tags: tags,
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
      Question.find({_id: req.params.id, })
      .then(question => {
        if(question.creator == user._id){
          res.send(question)
        } else {
          res.send('not authorized')
        }
        res.send(question)
      })
      .catch(err => console.log(err))
    })
  } else {
    res.send('please login first')
  }
}

methods.update = (req, res) => {
  util.userInfo(req.headers.token, function(user) {
    Question.findById(req.params.id)
    .then(question =>{
      if(question.creator == user.id){
        var title = req.body.title;
        var detail = req.body.detail;
        var tags = req.body.tags;

        Question.update({_id:req.params.id}, {
          title: title,
          detail: detail,
          tags: tags,
          updatedAt: new Date()
        })
        .then(()=>{
          res.send('question has been updated')
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
    Question.findById(req.params.id)
    .then(question => {
      if(question.creator == user.id){
        question.remove()
        .then(()=>{
          res.send('question has been deleted')
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
    Question.findById(req.params.id)
    .then(question => {
      let upvoteIdx = question.upVote.indexOf(user.id)
      let downvoteIdx = question.downVote.indexOf(user.id)

      if(upvoteIdx == -1 && downvoteIdx !== -1){
        question.downVote.splice(downvoteIdx, 1)
        question.save()
      } else if (upvoteIdx == -1 && downvoteIdx == -1){
        question.upVote.push(user.id)
        question.save()
      }
    })
    .catch(err => console.log(err))
  })
}

methods.downvote = (req, res) => {
  util.userInfo(req.headers.token, function(user){
    Question.findById(req.params.id)
    .then(question => {
      let upvoteIdx = question.upVote.indexOf(user.id)
      let downvoteIdx = question.downVote.indexOf(user.id)

      if(downvoteIdx == -1 && upvoteIdx !== -1){
        question.upVote.splice(upvoteIdx, 1)
        question.save()
      } else if (downvoteIdx == -1 && upvoteIdx == -1){
        question.downvoteIdx.push(user.id)
        question.save()
      }
    })
    .catch(err => console.log(err))
  })
}

module.exports = methods
