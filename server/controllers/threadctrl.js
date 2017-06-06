var Thread = require('../models/thread');

var create = function(req, res) {
  let newThread = new Thread({
    title: req.body.title,
    threadContent: req.body.content,
    creator: req.body.user,
    createdAt: new Date()
  })
  newThread.save((err, createdThread) => {
    if(err) {
      res.send(err)
    } else {
      res.send(createdThread)
    }
  })
}

var get = function(req, res) {
  Thread.find(function (err, threads) {
    res.send(err ? err : threads)
  });
}

var getOne = function(req, res) {
  Thread.findById(req.params.id, (err, thread) => {
    res.send(err ? err: thread)
  })
}

var update = function(req, res) {
  Thread.findById(req.params.id, (err, thread) => {
    if(thread.creator == req.body.user) {
      thread.title = req.body.title || thread.title
      thread.threadContent = req.body.threadContent || thread.threadContent
      thread.updatedAt = new Date()
      thread.save((err, editedThread) => {
        if(err) {
          res.send(err)
        } else {
          res.send(editedThread)
        }
      })
    } else {
      res.send('Not authorized')
    }
  })
}

var upvote = function(req, res) {
  Thread.findById(req.params.id, (err, thread) => {
    if(thread.creator == req.body.user) {
      var idxUp = thread.upvotes.indexOf(req.body.user);
      var idxDown = thread.downvotes.indexOf(req.body.user);
      if(idxUp == -1 && idxDown == -1) {
        thread.upvotes.push(req.body.user)
      } else if (idxDown !== -1) {
        thread.downvotes.splice(idxDown, 1)
      }
      thread.save((err, upvotedThread) => {
        if(err) {
          res.send(err)
        } else {
          res.send(upvotedThread)
        }
      })
    } else {
      res.send('Not authorized')
    }
  })
}

var downvote = function(req, res) {
  Thread.findById(req.params.id, (err, thread) => {
    if(thread.creator == req.body.user) {
      if(idxUp == -1 && idxDown == -1) {
        thread.downvotes.push(req.body.user)
      } else if (idxUp !== -1) {
        thread.upvotes.splice(idxDown, 1)
      }
      thread.save((err, downvotedThread) => {
        if(err) {
          res.send(err)
        } else {
          res.send(downvotedThread)
        }
      })
    } else {
      res.send('Not authorized')
    }
  })
}

var remove = function(req, res) {
  Thread.findById(req.params.id, (err, thread) => {
    if(thread.creator == req.body.user) {
      Thread.findOneAndRemove({_id: req.params.id}, (err, thread) => {
        if(err) res.send(err)
        res.send(thread)
      })
    } else {
      res.send('Not authorized')
    }
  })
}

module.exports = {
  create, get, getOne, update, upvote, downvote, remove
};