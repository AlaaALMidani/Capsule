const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  senderId: { type: String, required: true },
  status: { type: String, required: true, enum: ["pending", "completed","cancelled"], default:"pending"},
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
    return await Order.findOne({ id }); 
  };
  static findBySenderId = async (senderId) => {
    return await Order.findOne({ senderId });
  };
  static deleteOne = async (id) => {
    return await Order.findOneAndDelete({ id }); 
};
  static findPending = async (senderId) => {
    return await Order.find({ senderId, status: "pending" });
  };
  static findCompleted = async (senderId) => {
    return await Order.find({ senderId, status: "completed" });
  };
  static updateOne = async (id, updateData) => {  
    try {  
      const updatedOrder = await Order.findOneAndUpdate({ id }, updateData, {  
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