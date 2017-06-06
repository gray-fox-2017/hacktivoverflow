var express = require('express');
var router = express.Router();
var userctrl = require('../controllers/userctrl');
var auth = require('../controllers/auth')

router.get('/', userctrl.get)

router.post('/', userctrl.create)

router.put('/:id', auth.authUser, userctrl.update)

router.delete('/:id', auth.authUser, userctrl.remove)

module.exports = router;