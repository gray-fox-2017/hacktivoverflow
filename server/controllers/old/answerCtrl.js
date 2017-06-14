const mongoose = require('mongoose');
const Answer = require('../models/answer');
const VoteAns = require('../models/voteAns');
const Question = require('../models/question');

const getAllA = (req,res,next) => {
  Answer.find()
  .populate('_user _question voteList')
  .exec((err,answers)=>{
    res.send(err? {err:err} : answers);
  })
}


const updateA = (req,res,next) => {
  let id = req.params.id;
  Answer.findById(id, (err,answer)=>{
    if (err) res.send({err:'Invalid AnswerId'});
    else {
      for (let key in req.body) answer[key] = req.body[key];
      answer.save((err,answer)=>{
        res.send(err? {err: err} : answer)
      })
    }
  })
}

const deleteA = (req,res,next) => {

  let id = req.params.id;
  Answer.findById(id, (err,answer)=> {
    if (!err)
      answer.remove((err,answer) => {
        if (err? {err:err} : answer);
        // if (err) res.send({err:err});
        // else
        // {
          // Question.findById(answer._question, (err,question)=>{
          //   if (!err) {
          //     let idx = question.answerList.findIndex(al => al._id == answer._id);
          //     if (idx !== -1) {
          //       question.answerList.splice(idx,1);
          //       question.save((err,updQuest)=> {
          //         res.send(err? {err:err} : answer);
          //       })
          //     }
          //     else res.send({err:'Question tidak ditemukan'})
          //   }
          //   else res.send({err:err});
          // })
        // }
      })
    else res.send({err:'Invalid Answer'})
  })
}

const createA = (req,res,next) => {

  if (req.body.hasOwnProperty('_question')) {
    let _question = req.body._question;
    Question.findById(_question,(err,question)=> {
      if (!err) {
        let newAnswer = {}
        for (let key in req.body) newAnswer[key] = req.body[key];
        let answer = new Answer(newAnswer);
        answer.save((err,answer)=>{
          if (err) res.send({err:err});
          else {
            question.answerList.push(answer._id);
            question.save((err,updQuest)=>{
              res.send(err? {err:err} : answer);
            })
          }
        });
      }
      else res.send({err:'Invalid QuestionId'});
    })
  } else res.send({err: 'Invalid QuestionId'})

}

const getOneA = (req,res,next) => {
  let id = req.params.id;
  Answer.findById(id, (err,answer)=> {
    res.send(err? {err:err} : answer);
  })
}

const voteA = (req,res,next) => {
  let _ans = req.body.ansId;
  let vote = {
    _ans : _ans,
    _user : req.body.userId,
    poin : req.body.poin
  }
  Answer.findById(_quest, (err,answer)=> {
    if (err) res.send({err:'Invalid Answer'});
    else {
      let voteA = new VoteAns(vote);
      voteA.save((err,voteA)=> {
        if (err) res.send({err:err});
        else {
          answer.voteList.push(voteA._id);
          answer.save((err,updAns)=>{
            res.send(err? {err:err} : voteA);
          })
        }
      })
    }
  })
  //
  // let voteA = new VoteAns(vote);
  // voteA.save((err,voteA)=> {
  //   res.send(err ? {err:err} : voteA);
  // })
}

module.exports = {
  getAllA,
  updateA,
  deleteA,
  createA,
  getOneA,
  voteA
}