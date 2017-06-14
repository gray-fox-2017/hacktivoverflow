const mongoose = require('mongoose');
const User = require('../models/user');

const getAllUser = (req,res) => {
  User.find({},(err,users) => {
    res.send(err? {err: err} : users);
  })
}

const getOneUser = (req,res) => {
  let id = req.params.id;
  User.findById(id, (err,user)=> {
    res.send(err? {err:err} : user);
  })
}

const updateUser = (req,res) => {
  let id = req.params.id;
  User.findById(id, (err,user)=>{
    if (err) res.send({err:'Invalid UserId'});
    else {
      for (let key in req.body) user[key] = req.body[key];
      user.save((err,user)=>{
        if (err) {
          let err_msg = '';
          for (let error in err.errors) err_msg += err.errors[error].message+'\n';
          if (err.code == 11000) err_msg+= `Username exist`;
          res.send({error:err_msg})
        } else res.send(user);
      })
    }
  })
}

const deleteUser = (req,res) => {
  let id = req.params.id;
  User.findById(id, (err,user)=> {
    if (!err)
      user.remove((err,user) => {
        res.send(err? {err:err} : user);
      })
    else res.send({err:'Invalid User'})
  })
}

const createUser = (req,res) => {
  let newUser = {}
  for (let key in req.body) newUser[key] = req.body[key];
  let user = new User(newUser);
  user.save((err,user)=>{
    if (err) {
      let err_msg = '';
      for (let error in err.errors) err_msg += err.errors[error].message+'\n';
      if (err.code == 11000) err_msg+= `Username exist`;
      res.send({error:err_msg})
    } else res.send(user);
  });
}

module.exports = {
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
  createUser
}