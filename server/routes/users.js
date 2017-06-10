var express = require('express');
var router = express.Router();
const Users = require('../Controllers/users-controller')
/* GET users listing. */
router.get('/list',Users.listUsers)
router.get('/:id',Users.getOneUser)
router.post('/signup',Users.signup)
router.post('/signin',Users.login)
router.put('/:id',Users.editProfile)
router.delete('/:id',Users.deleteUser)

module.exports = router;
