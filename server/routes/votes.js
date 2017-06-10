const router = require('express').Router();
let helper = require('../helpers/auth_verify')
const voteController = require('../controllers/votes')

router.post('/question/:id_question', helper.auth, voteController.voteToQuestion)
router.post('/answer/:id_answer', helper.auth, voteController.voteToAnswer)
router.delete('/:id', helper.auth, voteController.deleteById)


module.exports = router;
