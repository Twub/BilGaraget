const express = require('express');
const router = express.Router();
const restController = require('./restController');

router.get('/subjects', restController.getCategories)
router.get('/threads/:categoryId', restController.getThreadsByCategory)
router.get('/replies/:threadId', restController.getReplies),
router.post('/threads/:categoryId', restController.createThread)
router.post('/replies/:threadId', restController.createReply)
router.get('/:username', restController.getUser)
router.get('/moderator/:userId', restController.getAllModeratedThreads)
router.get("/removeModerator/:userId/:threadId", restController.removeAsModerator);
router.get("/addModerator/:userId/:threadId", restController.setAsModerator);
router.get("/lockThread/:threadId", restController.disableThread)
router.get('/deleteReply/:replyId', restController.deleteReply)

module.exports = router;