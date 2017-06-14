const mongoose = require('mongoose');
const Question = require('../models/question');
const VoteQuest = require('../models/voteQuest');

const getAllQ = (req,res,next) => {
  Question.find({},(err,questions)=>{
    res.send(err? {err:err} : questions);
  })
}

const updateQ = (req,res,next) => {
  let id = req.params.id;
  Question.findById(id, (err,question)=>{
    if (err) res.send({err:'Invalid QuestionId'});
    else {
      for (let key in req.body) question[key] = req.body[key];
      question.save((err,question)=>{
        res.send(err? {err: err} : question)
      })
    }
  })
}

const deleteQ = (req,res,next) => {
  let id = req.params.id;
  Question.findById(id,(err,question)=>{
    if (err) res.send({err : err})
    else
      question.remove((err,question)=>{
        res.send(err? {err:err}:question)
      })
  })
}

const createQ = (req,res,next) => {
  let newQuestion = {}
  for (let key in req.body) newQuestion[key] = req.body[key];
  let question = new Question(newQuestion);
  question.save((err,question)=>{
    res.send(err? {err: err} : question);
  });
}

const getOneQ = (req,res,next) => {
  let id = req.params.id;
  Question.findById(id, (err,question)=>{
    res.send(err? {err:err} : question)
  })
}

const voteQ = (req,res,next) => {
  let _quest = req.body.questId;
  let vote = {
    _quest : _quest,
    _user : req.body.userId,
    poin : req.body.poin
  }
  Question.findById(_quest, (err,question) => {
    if (err) res.send({err:'Invalid Question'});
    else {
      let voteQ= new VoteAns(vote);
      voteQ.save((err,voteQ)=> {
        if (err) res.send({err:err});
        else {
          question.voteList.push(voteQ._id);
          question.save((err,updQuest)=>{
            res.send(err? {err:err} : voteQ);
          })
        }
      })
    }
  })
}

const replyQ = (req,res,next) => {

}

module.exports = {
  getAllQ,
  updateQ,
  deleteQ,
  createQ,
  getOneQ,
  voteQ,
  replyQ
}