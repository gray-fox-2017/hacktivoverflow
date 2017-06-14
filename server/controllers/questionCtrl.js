const mongoose = require('mongoose');
const Question = require('../models/question');
const helper = require('../helper/util');

const getAllQ = (req,res,next) => {
  Question.find()
  .populate('_user answerList')
  .exec((err,questions) => {
    res.send(err? {err:err} : questions);
  })
}

const getAllQH = (req,res,next) => {
  Question.find()
  .populate('_user')
  .exec((err,questions) => {
    res.send(err? {err:err} : questions);
  })
}

const getOneQH = (req,res,next) => {
  Question.findOne({_id: req.params.id})
  .populate('_user')
  .exec((err,questions) => {
    res.send(err? {err:err} : questions);
  })
}
const updateQ = (req,res,next) => {
  let id = req.params.id;
  let decoded = helper.getUserDetail(`${req.headers.token}`);
  Question.findById(id, (err,question) => {
    if (err) res.send({err:'Invalid QuestionId'});
    else if (decoded) {
      if (decoded._id == question._user) {
        for (let key in req.body) question[key] = req.body[key];
        question.updatedAt = new Date();
        question.save((err,question) => {
          if (err) {
            let err_msg = '';
            for (let error in err.errors) err_msg += err.errors[error].message+'\n';
            res.send({err:err_msg})
          } else res.send(question)
        })
      } else res.send({err:'You are not authorized to edit this question'});
    } else res.send({err:'You must login'});
  })
}

const deleteQ = (req,res,next) => {
  let id = req.params.id;
  let decoded = helper.getUserDetail(`${req.headers.token}`);
  if (decoded) {
    Question.findById(id,(err,question) => {
      if (err) res.send({err : err})
      else if (question._user == decoded._id)
        question.remove((err,question) => {
          res.send(err? {err:err}:question)
        })
      else res.send({err:'You arent authorized to delete this question'})
    })
  }
  else res.send({err:'You must login'})

}

const createQ = (req,res,next) => {
  let decoded = helper.getUserDetail(`${req.headers.token}`);
  if (decoded.hasOwnProperty('_id')) {
    let newQuestion = {}
    for (let key in req.body) newQuestion[key] = req.body[key];
    newQuestion._user = decoded._id;
    let question = new Question(newQuestion);
    question.save((err,question) => {
      if (err) {
        let err_msg = '';
        for (let error in err.errors) err_msg += err.errors[error].message+'\n';
        res.send({err:err_msg})
      } else res.send(question)
    });
  } else res.send({err:'Username not detected'})


}

const getOneQ = (req,res,next) => {
  let id = req.params.id;
  Question.findById(id)
  .populate({
    path:'_user',
    select:'username _id'
  })
  .populate({
    path:'answerList',
    populate: {path: '_user', select:'username _id'}
  })
  .exec( (err,question) => {
    res.send(err? {err:err} : question)
  });
}

const voteQ = (req,res,next) => {
  let _id = req.params.id;
  let decoded = helper.getUserDetail(`${req.headers.token}`);
  if (!decoded.hasOwnProperty('_id')) res.send({err:'Invalid UserId'});
  else if (typeof req.body.vote === 'undefined') res.send({err:'Invalid Vote'});
  else if (req.body.vote != 1 && req.body.vote != -1) res.send({err:'Invalid Vote'});
  else {
    Question.findById(_id,(err, quest) => {
      if (err) res.send({err:'Invalid QuestionId 1'});
      else if (quest === null) res.send({err:'Invalid QuestionId 2'})
      else {
        let vote = req.body.vote == 1? 'upVote': 'downVote';
        let idx = typeof quest.upVote !== 'undefined' ? quest.upVote.indexOf(`${decoded._id}`) : -1;
        let idx2 = typeof quest.downVote !=='undefined' ? quest.downVote.indexOf(`${decoded._id}`) : -1;
        console.log(idx+'_'+idx2)
        if (idx != -1 || idx2 != -1) res.send({err:'You have already vote'});
        else {
          quest[vote].push(decoded._id);
          quest.save((err,quest)=>{
            res.send(err? {err:'Failed to save vote'} : quest);
          })
        }

      }
    });
  }
}

module.exports = {
  getAllQ,
  getAllQH,
  getOneQH,
  updateQ,
  deleteQ,
  createQ,
  getOneQ,
  voteQ
}