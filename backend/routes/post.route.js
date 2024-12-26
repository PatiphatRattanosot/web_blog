const express = require("express");
const PostController = require("../controllers/post.controller");
const { upload } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/authJwt.middleware");

const router = express.Router();

router.post("/", [authJwt.verifyToken, upload], PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.put("/:id", [authJwt.verifyToken, upload], PostController.updatePost);
router.delete("/:id", [authJwt.verifyToken], PostController.deletePost);

module.exports = router;
