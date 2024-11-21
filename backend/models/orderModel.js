const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  status: {
    type: String,
    required: true, 
    enum: ["pending","offer_accepted", "inProgress", "completed", "canceled"],
    default: "pending",
  },
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

  static findById = async (_id) => {
    return await Order.findOne({ _id });
  };

  static findBySenderId = async (senderId) => {
    return await Order.find({ senderId });
  };

  static deleteOne = async (_id) => {
    return await Order.findOneAndDelete({ _id });
  };

  static findByStatus = async (senderId, status) => {
    return await Order.find({ senderId, status });
  };

  static findByStatus = async (status) => {
    return await Order.find({ status });
  };

  static findByIDAndStatus = async (senderId, status) => {
    return await Order.find({ senderId, status });
  };

  static findCompleted = async (senderId) => {
    return await Order.find({ senderId, status: "completed" });
  };

  static updateOne = async (_id, updateData) => {
    try {
      const updatedOrder = await Order.findOneAndUpdate({ _id }, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedOrder) {
        return { success: false, error: "Order not found" };
      }
      return { success: true, order: updatedOrder };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

}

module.exports = {
  OrderRepo,
};
  