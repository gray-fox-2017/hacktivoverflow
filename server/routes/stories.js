var express = require('express');
var router = express.Router();
const Stories = require('../Controllers/stories-controller.js')
/* GET home page. */
router.get('/:id',Stories.userStories)
router.get('/story/list',Stories.listStories)
router.get('/one/:id',Stories.getOneStory)
router.post('/create',Stories.createStory)
router.put('/edit/:id',Stories.editStory)
router.delete('/:id',Stories.deleteStory)

module.exports = router;
