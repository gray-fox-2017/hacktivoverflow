var express = require('express')
var router = express.Router()

var userController = require('../controllers/user_controller.js')
var answerController = require('../controllers/answer_controller.js')
var questionController = require('../controllers/question_controller.js')
var auth = require('../controllers/auth.js')

router.get('/', function(req, res) {
  res.send('alive')
})
//auth
router.post('/api/signup', auth.signUp) //done register
router.post('/api/signin', auth.signIn) //done login

router.get('/api/users', userController.getAlluser) //done get user

router.post('/api/questions',auth.userInfo, questionController.add_question)  //done post question
router.get('/api/questions',  questionController.getAllquestion) //done get all question
router.get('/api/questions/:_id', questionController.getQeustionById)//done get 1 question

//question voting
router.put('/api/questions/:_id/upvote', auth.userInfo, questionController.upvote) //done question up
router.put('/api/questions/:_id/downvote', auth.userInfo, questionController.downvote) //done questions down

router.delete('/api/questions/:_id', auth.userInfo, questionController.delete_question) //done
router.put('/api/questions/:_id', auth.userInfo, questionController.update_question) //done

// -------------------------------------------------






module.exports = router
