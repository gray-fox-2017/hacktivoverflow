const express = require ('express')
const router = express.Router()
const Ideas = require('../Controllers/ideas-controller.js')

router.get('/list',Ideas.listIdeas)
router.get('/:id',Ideas.storyIdeas)
router.get('/user/:id',Ideas.userIdeas)
router.get('/one/:id',Ideas.getOneIdea)
router.post('/',Ideas.createIdea)
router.put('/:id',Ideas.editIdea)
router.delete('/:id',Ideas.deleteIdea)

module.exports = router;