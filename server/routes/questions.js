var express = require('express');
var router = express.Router();
var question = require('../controllers/questionController')

router.get('/', question.getAll);

router.get('/question', question.get);

// create new question
router.post('/create', question.create)

// get question by id
router.get('/:id', question.getOne)

// update question
router.put('/:id', question.update)

// upvote question
router.put('/:id/upvote', question.upvote)

// update question
router.put('/:id/downvote', question.downvote)

// delete question
router.delete('/:id', question.delete)



module.exports = router;
