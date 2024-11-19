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
    let errors = {};
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
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
      }
      const decoded = await jwt.verify(token, "sdwe");
      return { success: true, userId: decoded.userID };
    } catch (error) {
      return { success: false, error: "Invalid or expired token" };
    }
  }

  async createPost(postData, token, req) {
    try {
      const { success, userId, error } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }

      postData.userId = userId;
      if (req.files) {
        if (
          req.files.postPhoto &&
          this.isValidFileType(req.files.postPhoto[0], "image")
        ) {
          postData.postPhoto = req.files.postPhoto[0].path;
        } else if (req.files.postPhoto) {
          return { success: false, error: "Invalid photo type." };
        }

        if (
          req.files.video &&
          this.isValidFileType(req.files.video[0], "video")
        ) {
          postData.video = req.files.video[0].path;
        } else if (req.files.video) {
          return { success: false, error: "Invalid video type." };
        }

        if (req.files.PDF && this.isValidFileType(req.files.PDF[0], "pdf")) {
          postData.PDF = req.files.PDF[0].path;
        } else if (req.files.PDF) {
          return { success: false, error: "Invalid PDF type." };
        }
      }
      const errors = await this.validate(postData);
      if (Object.keys(errors).length > 0) {
        return { success: false, errors };
      }
      const newPost = await PostRepo.create(postData);
      const baseURL = "http://localhost:3002/";
      return {
        success: true,
        post: {
          ...newPost.toObject(),
          postPhoto: newPost.postPhoto
            ? `${baseURL}${newPost.postPhoto}`
            : null,
          video: newPost.video ? `${baseURL}${newPost.video}` : null,
          PDF: newPost.PDF ? `${baseURL}${newPost.PDF}` : null,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  isValidFileType(file, type) {
    const allowedTypes = {
      image: ["image/jpeg", "image/png", "image/gif"],
      video: ["video/mp4", "video/x-msvideo", "video/x-matroska"],
      pdf: ["application/pdf"],
    };
    return file && allowedTypes[type].includes(file.mimetype);
  }

  async getOwnPosts(token) {
    try {
      const { success, error, userId } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }
      const ownPosts = await PostRepo.findByUserId(userId);
      if (!ownPosts || ownPosts.length === 0) {
        return { success: false, error: "No posts found for this user" };
      }

      const baseURL = "http://localhost:3002/";
      const formattedPosts = ownPosts.map((post) => {
        const isLikedByUser = post.likes.includes(userId);
        return {
          ...post.toObject(),
          postPhoto: post.postPhoto ? `${baseURL}${post.postPhoto}` : null,
          video: post.video ? `${baseURL}${post.video}` : null,
          PDF: post.PDF ? `${baseURL}${post.PDF}` : null,
          isLiked: isLikedByUser,
          likesCount: post.likes.length,
        };
      });
      return { success: true, posts: formattedPosts };
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
        return { success: false, error: "Invalid or expired token" };
      }

      const deletedPost = await PostRepo.deleteOne(postId);

      if (!deletedPost) {
        return { success: false, error: "Post not found" };
      }

      return { success: true, message: "Post deleted successfully" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updatePost(postId, updateData, token, req) {
    try {
      const { success, error, userId } = await this.validateToken(token);
      if (!success) {
        return { success: false, error: "Invalid or expired token" };
      }
      const existingPost = await PostRepo.findById(postId);
      if (!existingPost) {
        return { success: false, error: "Post not found" };
      }
      if (existingPost.userId !== userId) {
        return {
          success: false,
          error: "Unauthorized: You can only update your own posts",
        };
      }
      if (req.files) {
        if (
          req.files.postPhoto &&
          this.isValidFileType(req.files.postPhoto[0], "image")
        ) {
          updateData.postPhoto = req.files.postPhoto[0].path;
        } else if (req.files.postPhoto) {
          return { success: false, error: "Invalid photo type." };
        }

        if (
          req.files.video &&
          this.isValidFileType(req.files.video[0], "video")
        ) {
          updateData.video = req.files.video[0].path;
        } else if (req.files.video) {
          return { success: false, error: "Invalid video type." };
        }

        if (req.files.PDF && this.isValidFileType(req.files.PDF[0], "pdf")) {
          updateData.PDF = req.files.PDF[0].path;
        } else if (req.files.PDF) {
          return { success: false, error: "Invalid PDF type." };
        }
      }
      const errors = await this.validate({
        ...existingPost.toObject(),
        ...updateData,
      });
      if (Object.keys(errors).length > 0) {
        return { success: false, errors };
      }
      const updateResult = await PostRepo.updateOne(postId, updateData);
      if (!updateResult.success) {
        return { success: false, error: "Failed to update the post" };
      }
      const baseURL = "http://localhost:3002/";
      const updatedPost = {
        ...updateResult.post.toObject(),
        postPhoto: updateResult.post.postPhoto
          ? `${baseURL}${updateResult.post.postPhoto.replace(/\\/g, "/")}`
          : null,
        video: updateResult.post.video
          ? `${baseURL}${updateResult.post.video.replace(/\\/g, "/")}`
          : null,
        PDF: updateResult.post.PDF
          ? `${baseURL}${updateResult.post.PDF.replace(/\\/g, "/")}`
          : null,
      };
      return { success: true, post: updatedPost };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getAllPosts(token) {
    try {
      const { success, error, userId } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }
      const user = await UserRepo.findByID(userId);
      if (!user) {
        return { success: false, error: "User not found" };
      }
      let posts;
      if (user.roleID == 2 || user.roleID == 3) {   
        posts = await PostRepo.findAll();
        const filteredPosts = await Promise.all(
          posts.map(async (post) => {
            const postUser = await UserRepo.findByID(post.userId);
            return postUser && postUser.roleID == 3 ? post : null;
          })
        );
        posts = filteredPosts.filter((post) => post !== null);
      } else if (user.roleID == 3 || user.roleID == 4) {
        posts = await PostRepo.findAll();
        const filteredPosts = await Promise.all(
          posts.map(async (post) => {
            const postUser = await UserRepo.findByID(post.userId);
            return postUser && postUser.roleID == 4 ? post : null;
          })
        );
        posts = filteredPosts.filter((post) => post !== null);
      } else {
        return { success: false, error: "Unauthorized role" };
      }
      const baseURL = "http://localhost:3002/";
      const formattedPosts = posts.map((post) => {
        const isLikedByUser = post.likes.includes(userId);
        return {
          ...post.toObject(),
          postPhoto: post.postPhoto ? `${baseURL}${post.postPhoto}` : null,
          video: post.video ? `${baseURL}${post.video}` : null,
          PDF: post.PDF ? `${baseURL}${post.PDF}` : null,
          isLiked: isLikedByUser,
          likesCount: post.likes.length,
        };
      });
      return { success: true, posts: formattedPosts };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
module.exports = new PostService();
