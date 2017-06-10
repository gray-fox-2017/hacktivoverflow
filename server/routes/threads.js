var express = require('express');
var router = express.Router();
var threadctrl = require('../controllers/threadctrl');
var responsectrl = require('../controllers/responsectrl');
var auth = require('../controllers/auth')

router.get('/', threadctrl.get)

router.get('/:id/replies', threadctrl.getOne)

router.get('/:id/reply', responsectrl.get)

router.get('/:id/reply/:repid', responsectrl.getOne)

router.post('/', auth.userInfo, threadctrl.create)

router.post('/:id/reply', auth.userInfo, responsectrl.create)

router.put('/:id', auth.userInfo, threadctrl.update)

router.put('/:id/reply/:repid', auth.userInfo, responsectrl.update)

router.put('/:id/upvote', auth.userInfo, threadctrl.upvote)

router.put('/:id/reply/:repid/upvote', auth.userInfo, responsectrl.upvote)

router.put('/:id/downvote', auth.userInfo, threadctrl.downvote)

router.put('/:id/reply/:repid/downvote', auth.userInfo, responsectrl.downvote)

router.delete('/:id', threadctrl.remove)

router.delete('/:id/reply/:repid', responsectrl.remove)

module.exports = router;