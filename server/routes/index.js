var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/userCtrl');


/* GET home page. */

router.post('/token',userCtrl.getUserByToken);
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.createUser);

module.exports = router;
