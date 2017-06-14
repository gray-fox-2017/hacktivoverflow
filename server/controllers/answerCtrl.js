const mongoose = require('mongoose');
const Answer = require('../models/answer');
const Question = require('../models/question');
const helper = require('../helper/util');

const getAllAQ = (req,res,next) => {
  Answer.find({_question : req.params.qid})
  .populate('_user _question')
  .exec((err,answers) => {
    res.send(err? {err:err} : answers);
  })
}
const getAllA = (req,res,next) => {
  Answer.find()
  .populate('_user _question')
  .exec((err,answers) => {
    res.send(err? {err:err} : answers);
  })
}


const updateA = (req,res,next) => {
  let id = req.params.id;
  let decoded = helper.getUserDetail(`${req.headers.token}`);
  Answer.findById(id, (err,answer) => {
    if (err) res.send({err:'Invalid AnswerId'});
    else if (decoded) {
      if (`${decoded._id}` === `${answer._user}`) {
        for (let key in req.body) answer[key] = req.body[key];
        answer.save((err,answer) => {
          if (err) {
            let err_msg = '';
            for (let error in err.errors) err_msg += err.errors[error].message+'\n';
            res.send({err:err_msg})
          }
          else {
            res.send(answer);
          }
        })
      } else res.send({err:'You are not authorized to edit this answer'});
    }
    else res.send({err:'You must login'})
  })
}

const deleteA = (req,res,next) => {
  let id = req.params.id;
  let decoded = helper.getUserDetail(`${req.headers.token}`);
  Answer.findById(id, (err,answer) => {
    if (err) res.send({err:'Invalid Answer'})
    else if (decoded._id != answer._user) res.send({err:'You are not authorized to delete this answer'})
    else
      answer.remove((err,answer) => {
        res.send(err? {err:err} : answer);
      });
  })
}

const createA = (req,res,next) => {
  // console.log('mau create')
  let decoded  = helper.getUserDetail(`${req.headers.token}`);
  // console.log(req.body)
  // console.log(decoded);
  if (typeof req.body._question === 'undefined') res.send({err: 'Invalid QuestionId'})
  else if (!decoded) res.send({err:'You must login'});
  else {
    // console.log('mau cari quest')
    // console.log(decoded)
    Question.findById(`${req.body._question}`, (err,quest) => {
      // console.log('eh ketemu')
      // console.log(err);
      if (err) res.send({err: 'Invalid QuestionId'});
      else {
        let newAnswer = {}
        for (let key in req.body) newAnswer[key] = req.body[key];
        newAnswer._user = decoded._id;
        let answer = new Answer(newAnswer);
        answer.save((err,answer) => {
          if (err) {
            let err_msg = '';
            for (let error in err.errors) err_msg += err.errors[error].message+'\n';
            res.send({err:err_msg})
          }
          else {
            quest.answerList.push(answer._id);
            quest.save((err,updQuest) => {
              res.send(err? {err: 'Failed to insert answer to question'} : answer);
            });
          }
        });
      }
    });
  }
}

const getOneA = (req,res,next) => {
  let id = req.params.id;
  Answer.findById(id, (err,answer) => {
    res.send(err? {err:err} : answer);
  })
}

const voteA = (req,res,next) => {
  let _id = req.params.id;
  let decoded = helper.getUserDetail(`${req.headers.token}`);
  if (!decoded.hasOwnProperty('_id')) res.send({err:'Invalid UserId'});
  else if (typeof req.body.vote === 'undefined') res.send({err:'Invalid Vote'});
  else if (req.body.vote !== 1 && req.body.vote !== -1) res.send({err:'Invalid Vote'});
  else {
    Answer.findById(_id,(err,ans) => {
      if (err) res.send({err:'Invalid AnswerId'});
      else if (ans === null) res.send({err:'Invalid AnswerId'})
      else {
        let vote = req.body.vote === 1? 'upVote': 'downVote';
        let idx = typeof ans.upVote !== 'undefined' ? ans.upVote.indexOf(decoded._id) : -1;
        let idx2 = typeof ans.downVote !== 'undefined'  ? ans.downVote.indexOf(decoded._id) : -1;
        if (idx !== -1 || idx2 !== -1) res.send({err:'You have already vote'});
        else {
          ans[vote].push(decoded._id);
          ans.save((err,ans) => {
            res.send(err? {err:'Failed to save vote'} : ans);
          })
        }

      }
    });
  }
}

module.exports = {
  getAllAQ,
  getAllA,
  updateA,
  deleteA,
  createA,
  getOneA,
  voteA
}