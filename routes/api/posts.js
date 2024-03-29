const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../Model/User");
const Profile = require("../../Model/Profile");
const Post = require("../../Model/Post");
const { check, validationResult } = require("express-validator");

// @route   POST api/posts
// @desc    create post
// @access   private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const { text } = req.body;
      const newPost = {
        text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      let post = new Post(newPost);
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error!!");
    }
  }
);

// @route   GET api/posts
// @desc    get all post
// @access   private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({
      date: -1,
    });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:id
// @desc    get post by id
// @access   private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("Server Error!!");
  }
});

// @route   Delete api/posts/:id
// @desc    delete a post by id
// @access   private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }

    // check on the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed!!" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("Server Error!!!");
  }
});

// @route   PUT api/posts/like/:id
// @desc    like a post
// @access   private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if the post have already been liked
    const liked = post.likes.filter(
      (like) => like.user.toString() === req.user.id
    ).length;
    if (liked > 0) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!!!");
  }
});

// @route   put api/posts/unlike/:id
// @desc    unlike a post
// @access   private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const isLiked = post.likes.filter(
      (like) => like.user.toString() === req.user.id
    ).length;
    if (isLiked === 0) {
      return res.status(400).json({ msg: "post has not yet been liked" });
    }

    const removeIndex = post.likes
      .map((item) => item.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!!");
  }
});

// @route   put api/posts/comment/:id
// @desc    commenting on a post
// @access   private

router.put(
  "/comment/:id",
  [auth, check("text", "text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   delete api/posts/comment/:id/:com_id
// @desc    deleting  a comment
// @access   private

router.delete("/comment/:id/:com_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //  pull out comment from the post
    const comment = post.comments.find((com) => com.id === req.params.com_id);

    // make sure comment exist
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist!" });
    }

    // check the user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //  find index
    const removeIndex = post.comments
      .map((com) => com.id)
      .indexOf(req.params.com_id);
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "no comment have been made" });
    }

    res.status(500).send("Server Error!!");
  }
});

module.exports = router;
