const express = require('express');
const router = express.Router();
const answersController = require('../controllers/answers_controller');

router.get('/', answersController.getAll);
router.get('/:id', answersController.getSingle);
router.post('/', answersController.createAnswer);
router.delete('/:id', answersController.deleteAnswer);
router.put('/:id', answersController.updateAnswer);

module.exports = router;
