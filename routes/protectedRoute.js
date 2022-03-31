const express = require('express');
const protectedController = require('../controllers/protectedController');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.get('/protected/addComplaint',isAuth, protectedController.getAddComplaints)
router.post('/protected/addComplaint',isAuth, protectedController.postAddComplaints)

router.get('/protected/posts', isAuth,protectedController.getPosts)


router.post('/protected/post', isAuth,protectedController.postEdit)
router.post('/protected/delete-post',isAuth, protectedController.deletePost)

router.get('/protected/post/:id',isAuth, protectedController.editPost)




module.exports = router;