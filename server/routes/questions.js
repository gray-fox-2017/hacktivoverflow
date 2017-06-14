const express = require('express');
const router = express.Router();
const questionCtrl = require('../controllers/questionCtrl');
const helper = require('../helper/util');

router.use(helper.authQuest);

router.get('/',questionCtrl.getAllQ ); //v
router.get('/qheader',questionCtrl.getAllQH); //
router.get('/qheader/:id',questionCtrl.getOneQH); //
router.post('/',questionCtrl.createQ ); //v
router.put('/:id',questionCtrl.updateQ ); //v
router.delete('/:id',questionCtrl.deleteQ ); //v
router.get('/:id',questionCtrl.getOneQ); //v
router.post('/:id',questionCtrl.voteQ ); //v //vote

module.exports = router;
