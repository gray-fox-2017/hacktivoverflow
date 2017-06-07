var express = require('express');
var router = express.Router();
const Stories = require('../Controllers/stories-controller.js')
/* GET home page. */
router.get('/',Stories.userStories)
router.get('/stories',Stories.listStories)
router.get('/:id',Stories.getOneStory)
router.post('/',Stories.createStory)
router.put('/:id',Stories.editStory)
router.delete('/:id',Stories.deleteStory)

module.exports = router;
