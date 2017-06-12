var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');

router.post('/signup', auth.signup)

router.post('/login', auth.login)

router.post('/getdata', auth.userData)

module.exports = router;