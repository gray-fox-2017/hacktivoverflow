var express = require('express');
var router = express.Router();
var answer = require('../controllers/answerController')

router.get('/', answer.getAll);

router.get('/answer', answer.get);

// // create new answer
// router.post('/create', answer.create)
//
// // get answer by id
// router.get('/:id', answer.getOne)
//
// // update answer
// router.put('/:id', answer.update)
//
// // upvote answer
// router.put('/:id/upvote', answer.upvote)
//
// // update answer
// router.put('/:id/downvote', answer.downvote)
//
// // delete answer
// router.delete('/:id', answer.delete)



module.exports = router;
