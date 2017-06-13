var express = require('express');
var router = express.Router();
const controllers = require('../controller/posting');

router.get('/', controllers.getAll);
router.get('/:id', controllers.getData);
router.post('/', controllers.posting);
router.post('/vote/:id', controllers.vote);
router.put('/:id', controllers.updatePost);
router.delete('/:id', controllers.delete);

module.exports = router;
