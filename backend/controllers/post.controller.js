const Post = require("../models/post.model");
const fs = require("fs");

exports.createPost = async (req, res) => {
  const { title, summary, content } = req.body;

  //File upload
  const authorId = req.userId;

  if (!req.file) return res.status(400).json({ message: "Image is required" });

  try {
    if (!title || !summary || !content) {
      return res.status(400).json({ message: "All Fields is require" });
    }
    const newPost = await Post.create({
      title,
      summary,
      content,
      cover: req.file.firebaseURL,
      author: authorId,
    });
    if (!newPost) {
      res.status(404).json({ message: "cannot create post" });
    }
    if (authorId !== newPost.author.toString())
      return res.status(403).json({ message: "You can not delete this post!" });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.userId;

  if (!id) return res.status(404).json({ message: "Post id is not Provided" });
  try {
    const updatePost = await Post.findById(id);
    if (authorId !== updatePost.author.toString()) {
      res.status(403).send({
        message: "You Cannnot update this post",
      });
      return;
    }

    const { title, summary, content } = req.body;
    if (!title || !summary || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }
    updatePost.title = title;
    updatePost.summary = summary;
    updatePost.content = content;
    if (req.file) {
      // Delete Image File from folder
      // const imagePath = (__dirname, updatePost.cover);
      // fs.unlink(imagePath, (err) => {
      //   if (err) {
      //     return res.status(500).json({ message: "Failed to delete image." });
      //   }
      // });

      updatePost.cover = req.file.firebaseURL;
    }
    await updatePost.save();

    res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.userId;
  try {
    const deletedPost = await Post.findById(id);
    if (authorId !== deletedPost.author.toString())
      return res.status(403).json({ message: "You can not delete this post!" });
    // const imagePath = (__dirname, deletedPost.cover);
    await deletedPost.deleteOne();
    // Delete Image File from folder
    // fs.unlink(imagePath, (err) => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).json({ message: "Failed to delete image." });
    //   }
    //   res.status(200).json(deletedPost);
    // });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostsByUserId = async (req, res) => {
  const { id } = req.params

  try {
    const posts = await Post.find({ author: id })
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .limit(20);
    if (!posts) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}