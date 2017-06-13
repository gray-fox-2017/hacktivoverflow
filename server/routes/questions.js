var express = require('express');
var router = express.Router();
var question = require('../controllers/questionController')
var answer = require('../controllers/answerController')

router.get('/', question.getAll);

router.get('/question', question.get);

// create new question
router.post('/', question.create)

// get question by id
router.get('/:id', question.getOne)

// update question
router.put('/:id', question.update)

// upvote question
router.get('/:id/upvote', question.upvote)

// update question
router.get('/:id/downvote', question.downvote)

// delete question
router.delete('/:id', question.delete)


// ANSWER

// create new answer
router.post('/:question_id/answer/', answer.create)

// get one answer
router.get('/:question_id/answer/:answer_id', answer.getOne);

// update answer
router.put('/:question_id/answer/:answer_id', answer.update)

// upvote answer
router.put('/:question_id/answer/:answer_id/upvote', answer.upvote)

// downvote answer
router.put('/:question_id/answer/:answer_id/downvote', answer.downvote)

// delete answer
router.delete('/:question_id/answer/:answer_id', answer.delete)



module.exports = router;
