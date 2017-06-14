const Answers = require('../models/answers_model');
const Threads = require('../models/threads_model');
const Users = require('../models/users_model');

function getAll(req, res) {
  Answers.find({}, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Found the following records:");
    console.log(result);
    res.send(result);
  });
}

function getSingle(req, res) {
  Answers.findById(req.params.id, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Found the following records:");
    console.log(result);
    res.send(result);
  });
}

function createAnswer(req, res) {
  Answers.create({
    answer:     req.body.answer,
    thread_id:  req.body.thread_id,
    user_id:    req.body.user_id,
    user_name:  req.body.user_name,
    vote:       req.body.vote,
    created_at: new Date(),
  }, function(err, answer) {
    if (err) {
      res.send(err.message);
    }
    Threads.findById(req.body.thread_id, function(err, thread) {
      thread.answer_id.push(answer._id);
      thread.save(function(err) {
        if (err) res.send(err.message);
        console.log("Add Thread Success..");
      });
    });
    Users.findById(req.body.user_id, function(err, user) {
      user.answer_id.push(answer._id);
      user.save(function(err) {
        if (err) res.send(err.message);
        console.log("Add User Success..");
      });
    });
    console.log("Add Answer Success..");
    res.send(answer);
  });
}

function deleteAnswer(req, res) {
  Answers.remove({
    '_id': req.params.id
  }, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Delete:");
    console.log(result);
    res.send(result);
  });
}

function updateAnswer(req, res) {
  Answers.find({
    _id: req.params.id
  }, function(err, answer) {
    Answers.update({
      _id: answer[0]._id
    }, {
      $set: {
        answer:     req.body.answer || answer[0].answer,
        thread_id:  req.body.thread_id || answer[0].thread_id,
        user_id:    req.body.user_id || answer[0].user_id,
        user_name:  req.body.user_name || answer[0].user_name,
        vote:       req.body.vote || answer[0].vote,
        updated_at: new Date(),
      }
    }, (err, result) => {
      if (err) return res.send(err.message)
        res.send(result);
    });
  });
}

module.exports = {
  getAll, getSingle, createAnswer, deleteAnswer, updateAnswer
}
