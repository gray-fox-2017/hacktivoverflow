const mongoose = require('mongoose');
const User = require('../models/user');
const helper = require('../helper/util');

const getUserByToken = (req,res) => {
  // console.log('get user by token');
  // console.log(req.body.token)
  let user = helper.getUserDetail(`${req.body.token}`);
  console.log(user)
  if (user.hasOwnProperty('error')) res.send({err:user.error});
  else res.send(user);
  // else res.send({err:'Token siapa tuh'})
}

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
    else if(typeof req.body.password == 'undefined') res.send({err:'Input new password'})
    else{
      user.password = req.body.password;
      user.save((err,user)=> {
        if (err) {
          let err_msg = '';
          for (let error in err.errors) err_msg += err.errors[error].message+'\n';
          res.send({err:err_msg})
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
      res.send({err:err_msg})
    } else res.send(user);
  });
}

const login = (req,res) => {
  if (typeof req.body.username !== 'undefined' && typeof req.body.password !== 'undefined') {
    if (req.body.username === '' || req.body.password === '') res.send({err:'Please complete your username & password'})
    else
      User.findOne({username: req.body.username}, (err,user)=>{
        if (err) res.send({err:'Invalid Username / Password'})
        else if(user !== null){
          // console.log('----------------------------------------------------')
          // console.log(user)
          let checkpass = helper.checkPassword(req.body.password,`${user.password}`);
          if (checkpass) {
            let token = helper.createToken({username: user.username, _id:user._id})
            res.send({token:token});
          } else res.send({err:'Invalid Username / Password'})
        }
        else res.send({err:'Invalid Username / Password'})
      });
  } else res.send({err:'Please complete your username & password'})
}

module.exports = {
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
  createUser,
  getUserByToken,
  login
}