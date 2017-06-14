const express = require('express');
const router = express.Router();
const threadsController = require('../controllers/threads_controller');

router.get('/', threadsController.getAll);
router.get('/:id', threadsController.getSingle);
router.post('/', threadsController.createThread);
router.delete('/:id', threadsController.deleteThread);
router.put('/:id', threadsController.updateThread);

module.exports = router;
