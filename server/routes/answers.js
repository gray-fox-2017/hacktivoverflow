const express = require('express');
const router = express.Router();
const answerCtrl = require('../controllers/answerCtrl');
const helper = require('../helper/util');

router.use(helper.authAns);
// router.use('/:id',helper.authAns);

/* GET answer listing. */
router.get('/question/:qid',answerCtrl.getAllAQ)
router.get('/',answerCtrl.getAllA ); //v
router.post('/',answerCtrl.createA ); //v
router.put('/:id',answerCtrl.updateA ); //v
router.delete('/:id',answerCtrl.deleteA ); //v
router.get('/:id',answerCtrl.getOneA); //v
router.post('/:id',answerCtrl.voteA ); //vote

module.exports = router;
