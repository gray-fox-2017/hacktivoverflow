var express = require('express');
var router = express.Router();
const controllers = require('../controllers/comment');

// router.post('/', controllers.comment)
router.get('/:id', controllers.commentData)
router.post('/:id', controllers.comment)
router.post('/vote/:id', controllers.vote)
router.put('/:id', controllers.commentUpdate)
router.delete('/:id', controllers.commentDelete)

module.exports = router;