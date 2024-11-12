const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  senderId: { type: String, required: true },
  status: { type: String, required: true, enum: ["pending", "completed"], default:"pending"},
  createdAt: { type: Date, required: true, default: Date.now },
  message: { type: String, required: true, minlength: 5 },
  photo: { type: String },
  location: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);

class OrderRepo {
  static create = async (orderData) => {
    const newOrder = new Order(orderData);
    return await newOrder.save();
  };
  static findAll = async () => {
    return await Order.find();
  };
  static findById = async (id) => {
    return await Order.findById(id);
  };
  static findBySenderId = async (senderId) => {
    return await Order.findOne({ senderId });
  };

  static deleteOne = async (id) => {
    return await Order.findByIdAndDelete(id);
  };
  static findPending = async (senderId) => {
    return await Order.find({ senderId, status: "pending" });
  };
  static findCompleted = async (senderId) => {
    return await Order.find({ senderId, status: "completed" });
  };
}
module.exports = {
  OrderRepo,
};
