const express = require("express");
const router = express.Router();

const PostServices = require('../services/postService');
router.post('/addPost', PostServices.upload, async (req, res) => {
  try {
    const postData = req.body;

    const token = req.headers['authorization'];
    const response = await PostServices.createPost(postData, token, req); // pass req here
    return res.json(response);

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
router.get("/getOwnPosts", async (req, res) => {

    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ success: false, error: "Authorization token missing" });
    }
    const response = await PostServices.getOwnPosts(token);
    if (!response.success) {
      return res.status(404).json({ success: false, error: response.error });
    }
    return res.status(200).json({ success: true, posts: response.posts })
});

router.delete('/:postId', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const result = await PostServices.deletePost(req.params.postId, token);

  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
});

router.put('/:postId', PostServices.upload, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const postId = req.params.postId;
    const updateData = req.body;
    if (!token) {
      return res.status(401).json({ success: false, error: "Authorization token missing" });
    }
    const response = await PostServices.updatePost(postId, updateData, token, req);
    if (response.success) {
      return res.status(200).json({ success: true, post: response.post });
    } else {
      return res.status(400).json({ success: false, error: response.error || response.errors });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});


router.get('/getAllPosts', async (req, res) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(401).json({ success: false, error: "Authorization token missing" });
    }
    const response = await PostServices.getAllPosts(token);
    if (!response.success) {
      return res.status(400).json({ success: false, error: response.error });
    }
    return res.status(200).json({ success: true, posts: response.posts });
});
module.exports = router;