const express = require('express')
const router = express.Router()
let userController = require('../controllers/userController')
let helpers = require('../helpers/helpers')

// NOTE: user
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.post('/signinfb', userController.signInFB)
router.get('/allusers', userController.getAllUsers)
router.get('/detailuser/:id', userController.getUserById)
router.put('/edituser/:id', userController.editUser)  // password harus disertakan
router.delete('/deleteuser/:id', userController.deleteUserById)

module.exports = router