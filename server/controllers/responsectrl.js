var Response = require('../models/response');
var Thread = require('../models/thread');

var create = function(req, res) {
  let newResponse = new Response({
    responseContent: req.body.responseContent,
    creator: req.body.creator,
    parent: req.params.id,
    createdAt: new Date()
  })
  newResponse.save((err, createdResponse) => {
    if(err) {
      res.send(err)
    } else {
      Thread.findById(req.params.id, (err, thread) => {
        thread.replies.push(createdResponse)
        thread.save((err, updatedThread) => {
          res.send(err ? err : createdResponse)
        })
      })
    }
  })
}

var get = function(req, res) {
  Response.find({ parent: req.params.id })
  .populate('creator')
  .exec(function (err, responses) {
    res.send(err ? err : responses)
  })
}

var getOne = function(req, res) {
  Response.findById(req.params.repid)
  .populate('creator')
  .exec(function (err, responses) {
    res.send(err ? err : responses)
  })
}

var update = function(req, res) {
  Response.findById(req.params.repid, (err, response) => {
    if(response.creator == req.body.creator) {
      response.responseContent = req.body.responseContent || response.responseContent
      response.updatedAt = new Date()
      response.save((err, editedResponse) => {
        if(err) {
          res.send(err)
        } else {
          res.send(editedResponse)
        }
      })
    } else {
      res.send('Not authorized')
    }
  })
}

var upvote = function(req, res) {
  Response.findById(req.params.repid, (err, response) => {
    if(req.body.creator) {
      var idxUp = response.upvotes.indexOf(req.body.creator);
      var idxDown = response.downvotes.indexOf(req.body.creator);
      if(idxUp == -1 && idxDown == -1) {
        response.upvotes.push(req.body.creator)
      } else if (idxDown !== -1) {
        response.downvotes.splice(idxDown, 1)
      }
      response.save((err, upvotedResponse) => {
        if(err) {
          res.send(err)
        } else {
          res.send(upvotedResponse)
        }
      })
    } else {
      res.send('Not authorized')
    }
  })
}

var downvote = function(req, res) {
  Response.findById(req.params.repid, (err, response) => {
    var idxUp = response.upvotes.indexOf(req.body.creator);
    var idxDown = response.downvotes.indexOf(req.body.creator);
    if(req.body.creator) {
      if(idxUp == -1 && idxDown == -1) {
        response.downvotes.push(req.body.creator)
      } else if (idxUp !== -1) {
        response.upvotes.splice(idxDown, 1)
      }
      response.save((err, downvotedResponse) => {
        if(err) {
          res.send(err)
        } else {
          res.send(downvotedResponse)
        }
      })
    } else {
      res.send('Not authorized')
    }
  })
}

var remove = function(req, res) {
  Response.findOneAndRemove({_id: req.params.repid}, (err, response) => {
    if(err) res.send(err)
    Thread.findById(req.params.id, (err, thread) => {
      let idx = thread.replies.indexOf(response._id)
      thread.replies.splice(idx, 1)
      thread.save((err, updatedThread) => {
        res.send(err ? err : response)
      })
    })
  })
}

module.exports = {
  create, get, getOne, update, upvote, downvote, remove
};