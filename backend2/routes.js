const express = require('express');
const router = express.Router();
const restController = require('./restController');
const authController = require("./authController");

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

router.get('/whoami', authController.whoami)
router.get('/logout', authController.logout)
router.post('/register', authController.signUp)
router.post('/login', authController.signIn)

module.exports = router;