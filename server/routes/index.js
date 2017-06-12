const express = require('express')
const router = express.Router()
let userController = require('../controllers/userController')
let questionController = require('../controllers/questionController')
let helpers = require('../helpers/helpers')

// NOTE: user
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.post('/signinfb', userController.signInFB)
router.get('/allusers', userController.getAllUsers)
router.get('/detailuser/:id', userController.getUserById)
router.put('/edituser/:id', userController.editUser)  // password harus disertakan
router.delete('/deleteuser/:id', userController.deleteUserById)

router.post('/createquestion', questionController.createQuestion)
router.put('/createanswer/:id', questionController.createAnswer)
router.put('/editAnswer/:questionid/:answerid', questionController.editAnswer)
router.delete('/deleteAnswer/:questionid/:answerid', questionController.deleteAnswer)
router.get('/allquestion', questionController.getAllQuestion)
router.get('/detailquestion/:id', questionController.getDetailQuestion)
router.get('/detailanswer/:questionid/:answerid', questionController.getDetailAnswerByQuestion)
router.put('/votequestion/:id', questionController.voteToQuestion)
router.put('/voteanswer/:questionid/:answerid', questionController.voteToAnswer)
router.put('/editquestion/:id', questionController.updateQuestion)
router.delete('/deletequestion/:id', questionController.deleteQuestion)

module.exports = router