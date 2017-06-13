const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId
require('dotenv').config({path: '../.env'})

const Post = require('../models/posting');

let controllers = {}

//findOrCreate vote up or down
controllers.vote = (req,res,next)=>{
  let status = jwt.verify(req.headers.token, process.env.SECRET);
  console.log(status.id);
  // Post.update(
  //   { _id : ObjectId(req.params.id) },
  //   { $push : { vote_up : status.id} }
  // ).exec((err, data)=>{
  //   res.send(data)
  // })
  Post.findById(req.params.id,(err, data)=>{
    // console.log(data);
    let resultVoteUp = data.vote_up.indexOf(status.id)
    let resultVoteDown = data.vote_down.indexOf(status.id)
    console.log(resultVoteUp);
    console.log(resultVoteDown);
    console.log(req.body.vote);
    if(resultVoteUp == -1 && resultVoteDown == -1){
      if(req.body.vote == 'up'){
        data.vote_up.push(status.id)
        data.save((err,value)=>{
          res.send(value)
        })
      }
      if(req.body.vote == 'down'){
        data.vote_down.push(status.id)
        data.save((err,value)=>{
          res.send(value)
        })
      }
    } else {
      res.send({status : 'Vote Can Only Once'})
    }
  })
}

//get all data
controllers.getAll = (req,res,next)=>{
  Post.find({})
  .populate('user_id commentid')
  .exec((err, posts)=>{
    if(err) res.send(err)
    res.send(posts)
  })
}

// get data
controllers.getData = (req,res,next)=>{
  let status = jwt.verify(req.headers.token, process.env.SECRET);
  // console.log(status);
  Post.findById(req.params.id)
  .populate('user_id commentid')
  .exec((err, post)=>{
    if(err) res.send(err)
    if(post.user_id._id == status.id){
      res.send({post : post, id : status.id})
    } else {
      res.send(post)
    }
  })
}

//create posting
controllers.posting = (req, res, next) => {
  // console.log(req.headers.token);
    let status = jwt.verify(req.headers.token, process.env.SECRET);
    // console.log(status);
    let newPost = new Post({
      user_id : status.id,
      title : req.body.title,
      message : req.body.message
    })
    newPost.save((err, post)=>{
      res.send(post)
    })
}

//update posting
controllers.updatePost = (req,res,next)=>{
  // let status = jwt.verify(req.headers.token, process.env.SECRET);
  Post.findById(req.params.id, (err, data)=>{
    if(err) res.send(err)

    data.title = req.body.title || data.title
    data.message = req.body.message || data.message

    data.save((err, result)=>{
      res.send(result)
    })
  })
}

//delete posting
controllers.delete = (req,res,next)=>{
  let status = jwt.verify(req.headers.token, process.env.SECRET);
  // console.log(status.id, req.params.id);
  Post.findById(req.params.id, (err, result)=>{
  // console.log(result.user_id);
    if(err) res.send(err)
    if(result.user_id == status.id){
      Post.findByIdAndRemove(req.params.id,(err, result)=>{
        if(err) res.send(err)
        res.send(result)
      })
    } else {
      res.send({message : 'not authorized'})
    }
  })

}

module.exports = controllers;