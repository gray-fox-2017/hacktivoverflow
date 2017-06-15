const router = require('express').Router();
let helper = require('../helpers/auth_verify')
const questionController = require('../controllers/questions')

router.get('/', helper.auth, questionController.getAll)
router.get('/:id', helper.auth, questionController.getById)
router.post('/', helper.auth, questionController.insertOne)
router.put('/:id', helper.auth, questionController.updateById)
router.delete('/:id', helper.auth, questionController.deleteById)

module.exports = router;
