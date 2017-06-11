const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const server = require('../app.js')
const Stories = require('../Models/story.js')
const Users = require ('../Models/user.js')
const Ideas = require('../Models/idea.js')
const should = chai.should()
var id = ""
var user_id = ""
var idea_id = ""


describe('Stories',function(){
  beforeEach(function(done){
    var createStory = new Stories({
      title: 'testguy',
      story: 'testguy',
      user_id:mongoose.Types.ObjectId('4edd40c86762e0fb12000005')
    })
    createStory.save((err,res)=>{
      id = res._id
      done()
    })
  })
  
afterEach(function(done){
  Stories.remove({},function(err){
    done()
  })
})

describe('Get all user stories in GET /:id',function(){
  it('should return user all stories',function(done){
    chai.request(server)
    .get(`/${id}`)
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      done()
    })
  })
})

describe('Get all stories in GET /',function(){
  it('should return all stories',function(done){
    chai.request(server)
    .get('/story/list')
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('array')
      // res.body.length.should.equal(1)
      done()
    })
  })
  // it('should return error')
})

describe('Create new story in POST /',function(){
  it('should return one story created',function(done){
    chai.request(server)
    .post('/')
    .send({
      title: 'asli',
      story: 'uda pass woi',
      user_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTM3NTA4MzNjMDBkZTEwMGU2ZmFjZmIiLCJuYW1lIjoiNTkzNzUwODMzYzAwZGUxMDBlNmZhY2ZiIiwidXNlcm5hbWUiOiI1OTM3NTA4MzNjMDBkZTEwMGU2ZmFjZmIiLCJpYXQiOjE0OTY3OTczMzF9.Ueg_iW4qCbycz4Vm41ZRUVCTAYlXf_LeyeFa6oK0g5k'
    })
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('title')
      res.body.should.have.property('story')
      res.body.should.have.property('vote')
      res.body.should.have.property('user_id')
      done()
    })
  })
  // it('should return error')
})

describe('Delete story in DELETE /:id',function(){
  it('should delete one story',function(done){
    chai.request(server)
    .delete(`/${id}`)
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      done()
      })
    })
  })
  
describe('Edit story in PUT /:id',function(){
  it('should update one story',function(done){
    chai.request(server)
    .put(`/edit/${id}`)
    .send({
      title: 'asli',
      story: 'uda pass woi',
      vote: ['123']
    })
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      done()
      })
    })
  })

describe('Get one story in GET /:id',function(){
  it('should get one story',function(done){
    chai.request(server)
    .get(`/one/${id}`)
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      done()
      })
    })
  })  
})

describe('Users',function(){
  beforeEach(function(done){
    var createUsers = new Users({
      name: 'testguy',
      username: 'testguy',
      password: 'testguy',
      email: 'test@gmail.com'
    })
    createUsers.save((err,res)=>{
      user_id = res._id
      done()
    })
  })
  
  afterEach(function(done){
    Users.remove({},function(err){
      done()
    })
  })
  
  describe(`list all users in database in GET /users`,function(){
    it('should return all users', function(done){
      chai.request(server)
      .get('/users/list')
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('array')
        done()
      })
    })
  })
  
  describe('Get one user in GET /users/:id',function(){
    it('should return one user', function(done){
      chai.request(server)
      .get(`/users/${user_id}`)
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('name')
        res.body.should.have.property('username')
        res.body.should.have.property('password')
        res.body.should.have.property('email')
        done()
      })
    })
  })
  
  describe('Delete one user in DELETE /users/:id',function(){
    it('should delete one user',function(done){
      chai.request(server)
      .delete(`/users/${user_id}`)
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })
  })
  
  describe('Edit one user in PUT /users/:id',function(){
    it('should edit one user',function(done){
      chai.request(server)
      .put(`/users/${user_id}`)
      .send({
        name: 'timo',
        username: 'timo',
        password: 'timo',
        email: 'timo'
      })
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })
  })
  
  describe('Sign Up user in POST /users/signup',function(){
    it('should register a user',function(done){
      chai.request(server)
      .post(`/users/signup`)
      .send({
        name: 'tester',
        username: 'tester',
        password: 'tester',
        email: 'testguy@gmail.com'
      })
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('name')
        res.body.should.have.property('username')
        res.body.should.have.property('password')
        res.body.should.have.property('email')
        done()
      })
    })
  })
  
  describe('Log in a user in POST /users/login',function(){
    it('should login a user and develop a token',function(done){
      chai.request(server)
      .post('/users/login')
      .send({
        username: 'testguy',
        password: 'testguy'
      })
      .end((err,res)=>{
        console.log(res.body);
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })
  })  
})

describe('Ideas',function(){
  beforeEach(function(done){
    var createIdeas = new Ideas({
      idea: 'the legacy of test',
      user_id:mongoose.Types.ObjectId('4edd40c86762e0fb12000004'),
      story_id:mongoose.Types.ObjectId('4edd40c86762e0fb12000005')
    })
    createIdeas.save((err,res)=>{
      idea_id = res._id 
      done()
    })
  })

afterEach(function(done){
  Ideas.remove({},function(err){
    done()
  })
})

describe('Get all storys ideas in GET /ideas/:id',function(){
  it('should return all ideas in a story',function(done){
    chai.request(server)
    .get(`/ideas/${idea_id}`)
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('array')
      // res.body.length.should.equal(1)
      done()
    })
  })
  // it('should return error')
})

describe('Get all ideas in GET /ideas/list',function(){
  it('should return all ideas',function(done){
    chai.request(server)
    .get('/ideas/list')
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      // res.body.length.should.equal(1)
      done()
    })
  })
  // it('should return error')
})

describe('Create new idea in POST /ideas',function(){
  it('should return one idea created',function(done){
    chai.request(server)
    .post('/ideas')
    .send({
      idea: 'testeres',
      story_id: mongoose.Types.ObjectId(`4edd40c86762e0fb12000004`),
      user_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTM3NTA4MzNjMDBkZTEwMGU2ZmFjZmIiLCJuYW1lIjoiNTkzNzUwODMzYzAwZGUxMDBlNmZhY2ZiIiwidXNlcm5hbWUiOiI1OTM3NTA4MzNjMDBkZTEwMGU2ZmFjZmIiLCJpYXQiOjE0OTY3OTczMzF9.Ueg_iW4qCbycz4Vm41ZRUVCTAYlXf_LeyeFa6oK0g5k'
    })
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('idea')
      res.body.should.have.property('vote')
      res.body.should.have.property('user_id')
      res.body.should.have.property('story_id')
      done()
    })
  })
  // it('should return error')
})

describe('Delete idea in DELETE /:id',function(){
  it('should delete one idea',function(done){
    chai.request(server)
    .delete(`/ideas/${idea_id}`)
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      done()
      })
    })
  })
  
describe('Edit idea in PUT /ideas/:id',function(){
  it('should update one idea',function(done){
    chai.request(server)
    .put(`/ideas/${idea_id}`)
    .send({
      title: 'testing',
      idea: 'babi'
    })
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      done()
      })
    })
  })

describe('Get one idea in GET /ideas/:id',function(){
  it('should get one idea',function(done){
    chai.request(server)
    .get(`/ideas/one/${idea_id}`)
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('idea')
      res.body.should.have.property('vote')
      res.body.should.have.property('user_id')
      res.body.should.have.property('story_id')
      done()
      })
    })
  })
  
describe('Get all user ideas in GET /ideas/user/:id',function(){
  it('should get all user ideas',function(done){
    chai.request(server)
    .get(`/ideas/user/${idea_id}`)
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.should.be.a('array')
      done()
      })
    })
  })  
})
