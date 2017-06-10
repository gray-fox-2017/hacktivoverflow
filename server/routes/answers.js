const router = require('express').Router();
let helper = require('../helpers/auth_verify')
const answerController = require('../controllers/answers')

router.get('/', helper.auth, answerController.getAll)
router.get('/:id', helper.auth, answerController.getById)
router.post('/:id_question', helper.auth, answerController.answerToQuestion)
router.put('/:id', helper.auth, answerController.updateById)
router.delete('/:id', helper.auth, answerController.deleteById)

module.exports = router;
