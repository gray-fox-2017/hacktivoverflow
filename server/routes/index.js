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

module.exports = router