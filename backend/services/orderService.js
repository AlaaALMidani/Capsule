const { OrderRepo } = require("../models/orderModel");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { UserRepo } = require("../models/userModel");

class OrderServices {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  upload = multer({ storage: storage });

  async validate(order) {
    const errors = {};
    if (
      !order.message ||
      typeof order.message !== "string" ||
      order.message.trim().length < 5 ||
      order.message.trim().length > 100
    ) {
      errors.message =
        "The message is required, must be a string, and between 5 and 100 characters.";
    }
    if (!order.location) {
      errors.location = "The location is required";
    }
    return errors;
  }
  async validateToken(token) {
    try {
      const decoded = await jwt.verify(token);
      return { success: true, userId: decoded.id };
    } catch (error) {
      return { success: false, error: "Invalid or expired token" };
    }
  }
  async createOrder(orderData, token) {
    try {
      const { success, error, userId } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }
      orderData.senderId = userId;
      const errors = await this.validate(orderData);
      if (Object.keys(errors).length > 0) {
        return { success: false, errors };
      }
      if (orderData.photo && orderData.photo.path) {
        orderData.photo = orderData.photo.path;
    }
      const newOrder = await OrderRepo.create(orderData);
      return { success: true, order: newOrder };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  async deleteOrder(id, token) {
    try {
      const { success, error, userId } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }
      const deleteOrder = await OrderRepo.deleteOne(id);
      if (!deleteOrder) {
        return { success: false, error: "Order not found" };
      }
      return { success: true, order: deleteOrder };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  async currentOrders(token) {
    try {
      const { success, error, userId } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }
      const currentOrders = await OrderRepo.findPending(userId);
      if (!currentOrders || currentOrders.length === 0) {
        return { success: false, error: "There are no orders" };
      }
      return { success: true, orders: currentOrders };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  async previousOrders(token) {
    try {
      const { success, error, userId } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }
      const previousOrders = await OrderRepo.findCompleted(userId);
      if (!previousOrders || previousOrders.length === 0) {
        return { success: false, error: "There are no orders" };
      }
      return { success: true, orders: previousOrders };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  async getAllOrders(token) {
    try {
      const { success, error, userId } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }

      const user = await UserRepo.findById(userId);
      if (!user) {
        return { success: false, error: "User not found" };
      }

      let orders;
      if (user.role === "ph") {
        orders = await OrderRepo.findAll();
        const filteredOrders = await Promise.all(
          orders.map(async (order) => {
            const orderUser = await UserRepo.findById(order.senderId);
            if (orderUser.role === "customer") {
              return order;
            }
          })
        );

        orders = filteredOrders.filter((order) => order !== undefined);
      } else if (user.role === "sup") {
        orders = await OrderRepo.findAll();
        const filteredOrders = await Promise.all(
          orders.map(async (order) => {
            const orderUser = await UserRepo.findById(order.senderId);
            if (orderUser.role === "ph") {
              return order;
            }
          })
        );

        orders = filteredOrders.filter((order) => order !== undefined);
      } else {
        return { success: false, error: "Unauthorized role" };
      }

      return { success: true, orders };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async repeatOrder(orderId, token) {
    try {
      const { success, error, userId } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }
  
      const previousOrder = await OrderRepo.findById(orderId);
      if (!previousOrder) {
        return { success: false, error: "Order not found" };
      }
      
      const newOrderData = {
        message: previousOrder.message,
        location: previousOrder.location,
        photo: previousOrder.photo,
        senderId: userId, 
        status: "pending",
      };
   
      const errors = await this.validate(newOrderData);
      if (Object.keys(errors).length > 0) {
        return { success: false, errors };
      }
  
      const newOrder = await OrderRepo.create(newOrderData);
      return { success: true, order: newOrder };
    } catch (error) {
      return { success: false, error: error.message || "Failed to repeat order" };
    }
  }
}
module.exports = new OrderServices();
