const Threads = require('../models/threads_model');
const Users = require('../models/users_model');
const Answers = require('../models/answers_model');

function getAll(req, res) {
  Threads.find().populate('answer_id')
    .exec(function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Found the following records:");
    console.log(result);
    res.send(result);
  });
}

function getSingle(req, res) {
  Threads.findById(req.params.id).populate('answer_id')
  .exec(function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Found the following record:");
    console.log(result);
    res.send(result);
  });
}

function createThread(req, res) {
  Threads.create({
    title:      req.body.title,
    question:   req.body.question,
    user_id:    req.body.user_id,
    user_name:  req.body.user_name,
    vote:       req.body.vote,
    created_at: new Date()
  }, function(err, thread) {
    if (err) {
      res.send(err.message);
    }
    Users.findById(req.body.user_id, function(err, user) {
      user.thread_id.push(thread._id);
      user.save(function(err) {
        if (err) res.send(err.message);
        console.log("Add Thread Success..");
        res.send(thread);
      });
    });
  });
}

function deleteThread(req, res) {
  Threads.remove({
    '_id': req.params.id
  }, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Delete:");
    console.log(result);
  });
  Answers.remove({
    'thread_id': req.params.id
  }, function(err, result) {
    if (err) {
      res.send(err.message);
    }
    console.log("Delete:");
    console.log(result);
  });
  res.send('Delete success');
}

function updateThread(req, res) {
  Threads.find({
    _id: req.params.id
  }, function(err, thread) {
    Threads.update({
      _id: thread[0]._id
    }, {
      $set: {
        title:      req.body.title || thread[0].title,
        question:   req.body.question || thread[0].question,
        vote:       req.body.vote || thread[0].vote,
        user_id:    req.body.user_id || thread[0].user_id,
        user_name:  req.body.user_name || thread[0].user_name,
        updated_at: new Date()
      }
    }, (err, result) => {
      if (err) return res.send(err.message)
        res.send(result);
    });
  });
}

module.exports = {
  getAll, getSingle, createThread, deleteThread, updateThread
}
