const { PostRepo } = require("../models/postModel");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { UserRepo } = require("../models/userModel");

class PostService {
  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    });
    this.upload = multer({ storage: this.storage }).fields([
      { name: "postPhoto", maxCount: 1 },
      { name: "video", maxCount: 1 },
      { name: "PDF", maxCount: 1 },
    ]);
  }
  async validate(post) {
    const errors = {};
    if (
      !post.productName ||
      typeof post.productName !== "string" ||
      post.productName.trim().length < 3 ||
      post.productName.trim().length > 100
    ) {
      errors.productName =
        "The productName is required, must be a string, and between 3 and 100 characters.";
    }
    if (
      (post.description && typeof post.description !== "string") ||
      (post.description && post.description.trim().length > 500)
    ) {
      errors.description =
        "The description must be a string and <500 characters.";
    }
    if (post.photo && typeof post.photo !== "string") {
      errors.photo = "Photo must be a valid string URL or file path.";
    }
    if (post.PDF && typeof post.PDF !== "string") {
      errors.PDF = "PDF must be a valid string URL or file path.";
    }
    if (post.video && typeof post.video !== "string") {
      errors.video = "video must be a valid string URL or file path.";
    }
    return errors;
  }

  async validateToken(token) {
    try {
      const decoded = await jwt.verify(token, "sdwe");
      return { success: true, userId: decoded.userID };
    } catch (error) {
      return { success: false, error: "Invalid or expired token" };
    }
  }

  async createPost(postData, token) {
    try {
      const { success, userId, error } = await this.validateToken(
        token,
        "sdwe"
      );
      console.log("Token Validation Result:", { success, userId, error });
      if (!success) {
        return { success: false, error };
      }
      postData.userId = userId;
      if (postData.photo && postData.photo.path) {
        postData.photo = postData.photo.path;
      }
      if (postData.video && postData.video.path) {
        postData.video = postData.video.path;
      }
      if (postData.PDF && postData.PDF.path) {
        postData.PDF = postData.PDF.path;
      }
      const errors = await this.validate(postData);
      if (Object.keys(errors).length > 0) {
        return { success: false, errors };
      }
      const newPost = await PostRepo.create(postData);
      return { success: true, post: newPost };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getOwnPosts(token) {
    try {
      const { success, error, userId } = await this.validateToken(
        token,
        "sdwe"
      );
      if (!success) {
        return { success: false, error };
      }
      const ownPosts = await PostRepo.findByUserId(userId);
      if (!ownPosts || ownPosts.length === 0) {
        return { success: false, error: "There are no posts" };
      }
      return { success: true, orders: previousOrders };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deletePost(postId, token) {
    try {
      const { success, error, userId } = await this.validateToken(
        token,
        "sdwe"
      );
      if (!success) {
        return { success: false, error };
      }
      const deletePost = await PostRepo.deleteOne(postId);
      if (!deletePost) {
        return { success: false, error: "Post not found" };
      }
      return { success: true, order: deleteOrder };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  async updatePost(postId, updateData, token) {
    try {
      const { success, error, userId } = await this.validateToken(
        token,
        "sdwe"
      );
      if (!success) {
        return { success: false, error };
      }
      const existingPost = await PostRepo.findById(postId);
      if (!existingPost) {
        return { success: false, error: "Post not found" };
      }
      const updatedData = {
        ...existingPost.toObject(),
        ...updateData,
      };
      const errors = await this.validate(updatedData);
      if (Object.keys(errors).length > 0) {
        return { success: false, errors };
      }
      const updatedPost = await PostRepo.updateOne(postId, updatedData);
      return { success: true, post: updatedPost };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

}
module.exports = new PostService();
