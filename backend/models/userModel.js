const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  token: { type: String },
});

const User = mongoose.model("Users", userSchema);

class UserRepo {
  static create = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
  };
  static findAll = async () => {
    return await User.find();
  };
  static findById = async (id) => {
    return await User.findById(id);
  };
  static findByEmail = async (email) => {
    return await User.findOne({ email });
  };
  static findByUsername = async (username) => {
    return await User.findOne({ username });
  };
  static update = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true }); //new:true returns the updated doc
  };
  static deleteOne = async (id) => {
    return await User.findByIdAndDelete(id);
  };
}

module.exports = {
  UserRepo,
};
