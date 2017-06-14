var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/userCtrl');

/* GET users listing. */
router.get('/',userCtrl.getAllUser ); //v
router.get('/:id',userCtrl.getOneUser ); //v
router.put('/:id',userCtrl.updateUser ); //v
router.delete('/:id',userCtrl.deleteUser ); //v
router.post('/',userCtrl.createUser ); //v

module.exports = router;
