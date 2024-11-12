const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, },
  active: { type: Boolean },
  token: { type: String },
  roleID: { type: Number, required: true }
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
  static findByPhoneNumber = async (phoneNumber) => {
    return await User.findOne({ phoneNumber });
  };
 
  static findByRole = async (role) => {
    return await User.findOne({ role })
  }
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
