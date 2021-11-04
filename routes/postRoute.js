const router = require("express").Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth.js");



router.get("/posts", postController.getPosts);
router.get("/posts/:id", postController.getPost);
router.post("/posts", postController.createPost);
router.patch("/posts/:id", postController.updatePost);
router.delete("/posts/:id", postController.deletePost);
router.patch('/:id/likes', postController.likePost)
router.patch('/:id/comments', postController.commentPost)

module.exports = router;