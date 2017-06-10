var Response = require('../models/response');
var Thread = require('../models/thread');

var create = function(req, res) {
  let newResponse = new Response({
    responseContent: req.body.responseContent,
    creator: req.body.user,
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
          res.send(err ? err : updatedThread)
        })
      })
    }
  })
}

var get = function(req, res) {
  Response.find(function (err, responses) {
    res.send(err ? err : responses)
  });
}

var getOne = function(req, res) {
  Response.findById(req.params.repid, (err, response) => {
    res.send(err ? err: response)
  })
}

var update = function(req, res) {
  Response.findById(req.params.repid, (err, response) => {
    if(response.creator == req.body.user) {
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
    if(response.creator == req.body.user) {
      var idxUp = response.upvotes.indexOf(req.body.user);
      var idxDown = response.downvotes.indexOf(req.body.user);
      if(idxUp == -1 && idxDown == -1) {
        response.upvotes.push(req.body.user)
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
    if(response.creator == req.body.user) {
      if(idxUp == -1 && idxDown == -1) {
        response.downvotes.push(req.body.user)
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
  Response.findById(req.params.repid, (err, response) => {
    if(response.creator == req.body.user) {
      Response.findOneAndRemove({_id: req.params.repid}, (err, response) => {
        if(err) res.send(err)
        res.send(response)
      })
    } else {
      res.send('Not authorized')
    }
  })
}

module.exports = {
  create, get, getOne, update, upvote, downvote, remove
};