const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  productName: { type: String, required: true, minlength: 3, maxlength: 100 },
  userId: { type: String, required: true },
  description: { type: String, maxlength: 500 },
  PDF: { type: String },
  postPhoto: { type: String },
  video: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

class PostRepo {
  static create = async (postData) => {
    const newPost = new Post(postData);
    return await newPost.save();
  };

  static findAll = async () => {
    return await Post.find();
  };

  static findById = async (id) => {
    return await Post.findById(id);
  };

  static findByUserId = async (userId) => {
    return await Post.find({ userId });
  };

  static deleteOne = async (id) => {
    return await Post.findByIdAndDelete(id);
  };

  static updateOne = async (id, updateData) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedPost) {
        return { success: false, error: "Post not found" };
      }
      return { success: true, post: updatedPost };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

module.exports = {
  PostRepo,
};
