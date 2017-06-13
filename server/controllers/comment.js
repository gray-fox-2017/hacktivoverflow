const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});
const Coment = require('../models/comment');
const Post = require('../models/posting');

let controllers = {}

//findOrCreate vote up or down
controllers.vote = (req,res,next)=>{
  let status = jwt.verify(req.headers.token, process.env.SECRET);
  console.log(status.id);
  Coment.findById(req.params.id,(err,data)=>{
    console.log(data);
    let voteUp = data.vote_up.indexOf(status.id)
    let voteDown = data.vote_down.indexOf(status.id)
    console.log(voteUp, voteDown, req.body.vote);
    if(voteUp == -1 && voteDown == -1){
      if(req.body.vote == 'up'){
        data.vote_up.push(status.id)
        data.save((err,result)=>{
          res.send(result)
        })
      }
      if(req.body.vote == 'down'){
        data.vote_down.push(status.id)
        data.save((err,result)=>{
          res.send(result)
        })
      }
    } else {
      res.send({status : 'Vote Can Only Once'})
    }
  })
}


//get data
controllers.commentData = (req,res,next)=>{
  Coment.findById(req.params.id, (err, data)=>{
    res.send(data)
  })
}

// create comment
controllers.comment = (req,res,next)=>{
  let status = jwt.verify(req.headers.token, process.env.SECRET)
  // console.log('token ',status);
  let newComment = new Coment({
    user_id : status.id,
    comment : req.body.comment
  })
  newComment.save((err, result)=>{
    if(err) res.send(err)
    Post.update(
      { _id : ObjectId(req.params.id) },
      { $push : { commentid : result._id}}
    ).exec((err, data)=>{
      // console.log('ini update  ', data);
      res.send({comment : result, updatePost : data})
    })
  })
}

// update comment
controllers.commentUpdate = (req,res,next)=>{
  let status = jwt.verify(req.headers.token, process.env.SECRET);

  Coment.findById(req.params.id, (err, data)=>{
    if(err) res.send(data)

    if(data.user_id == status.id){
      data.comment = req.body.comment || data.comment

      data.save((err, result)=>{
        res.send(result)
      })
    } else {
      res.send({status : 'not authorized'})
    }
  })
}

//delete comment
controllers.commentDelete = (req,res,next)=>{
  let status = jwt.verify(req.headers.token, process.env.SECRET);
  // console.log(req.params.id, status);
  Coment.findById(req.params.id, (err, data)=>{
    // console.log(data.user_id == status.id);
    if(err) res.send(err)
    if(data.user_id == status.id){
      Coment.findByIdAndRemove(req.params.id, (err, result)=>{
        if(err) res.send(err)
        res.send({status : 'oke'})
      })
    }
  })
}

module.exports = controllers;