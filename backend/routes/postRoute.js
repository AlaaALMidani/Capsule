const express = require("express");
const router = express.Router();
const { PostService } = require('./services/postService');

const postService = new PostService();

router.post('/addPost', postService.upload, async (req, res) => {
  const postData = req.body;
  if (req.files) {
    if (req.files.photo) {
      postData.photo = req.files.photo[0].path;
    }
    if (req.files.video) {
      postData.video = req.files.video[0].path;
    }
    if (req.files.PDF) {
      postData.PDF = req.files.PDF[0].path;
    }
  }
  const token = req.headers['authorization'];
  const response = await postService.createPost(postData, token);
  res.json(response);
});

module.exports = router;