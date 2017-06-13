var express = require('express');
var router = express.Router();
const passport = require('passport');
const controllers = require('../controllers/user');

/* GET users listing. */
router.get('/:token', controllers.getDecode);
router.post('/signin', passport.authenticate('local',{session:false}), controllers.signIn);
router.post('/signUp', controllers.signUp);
// router.put('/:id', controllers.updateData);
// router.delete('/:id', controllers.deleteData);

module.exports = router;
