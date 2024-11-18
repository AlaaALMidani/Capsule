const { OrderRepo } = require("../models/orderModel");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { UserRepo } = require("../models/userModel");
const InvoiceService = require("../services/invoiceService");

class OrderServices {
  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    });
    this.upload = multer({ storage: this.storage }).single("photo");
  }
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
    if (order.photo && typeof order.photo !== "string") {
      errors.photo = "Photo must be a valid string URL or file path.";
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
  async createOrder(orderData, token, req) {
    try {
      const { success, userId, error } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }
      orderData.senderId = userId;
      if (req.file) {
        orderData.photo = req.file.path.replace(/\\/g, "/");
      }
      const errors = await this.validate(orderData);
      if (Object.keys(errors).length > 0) {
        return { success: false, errors };
      }
      const newOrder = await OrderRepo.create(orderData);
      const baseURL = "http://localhost:3002/";
      return {
        success: true,
        order: {
          ...newOrder.toObject(),
          photo: newOrder.photo ? `${baseURL}${newOrder.photo}` : null,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteOrder(orderId, token) {
    try {
      const { success, error, userId } = await this.validateToken(
        token,
        "sdwe"
      );
      if (!success) {
        return { success: false, error };
      }
      const deleteOrder = await OrderRepo.deleteOne(orderId);
      if (!deleteOrder) {
        return { success: false, error: "Order not found" };
      }
      return { success: true, order: deleteOrder };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  async ordersByStatus(token, status) {
    try {
      const { success, error, userId } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }
      const currentOrders = await OrderRepo.findByStatus(userId, status);
      if (!currentOrders || currentOrders.length === 0) {
        return { success: false, error: `There are no ${status}  orders` };
      }
      const validStatuses = [
        "pending",
        "offer_accepted",
        "inProgress",
        "completed",
        "canceled",
      ];
      if (!validStatuses.includes(status)) {
        return { success: false, error: "Invalid status provided" };
      }

      const baseURL = "http://localhost:3002/";
      const formattedOrders = currentOrders.map((order) => ({
        ...order.toObject(),
        photo: order.photo
          ? `${baseURL}${order.photo.replace(/\\/g, "/")}`
          : null,
      }));

      return { success: true, orders: formattedOrders };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getAllOrders(token) {
    try {
      const { success, error, userId } = await this.validateToken(
        token,
        "sdwe"
      );
      if (!success) {
        return { success: false, error };
      }

      const user = await UserRepo.findByID(userId);
      if (!user) {
        return { success: false, error: "User not found" };
      }
      let orders;
      const baseURL = "http://localhost:3002/";
      if (user.roleID == 3) {
        orders = await OrderRepo.findAll();
        const filteredOrders = await Promise.all(
          orders.map(async (order) => {
            const orderUser = await UserRepo.findByID(order.senderId);
            if (orderUser && orderUser.roleID == 2) {
              return {
                ...order.toObject(),
                photo: order.photo
                  ? `${baseURL}${order.photo.replace(/\\/g, "/")}`
                  : null,
              };
            }
          })
        );

        orders = filteredOrders.filter((order) => order !== undefined);
      } else if (user.roleID == 4) {
        orders = await OrderRepo.findAll();
        const filteredOrders = await Promise.all(
          orders.map(async (order) => {
            const orderUser = await UserRepo.findByID(order.senderId);
            if (orderUser && orderUser.roleID == 3) {
              return {
                ...order.toObject(),
                photo: order.photo
                  ? `${baseURL}${order.photo.replace(/\\/g, "/")}`
                  : null,
              };
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
      const { success, error, userId } = await this.validateToken(
        token,
        "sdwe"
      );
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
      const baseURL = "http://localhost:3002/";
      return {
        success: true,
        order: {
          ...newOrder.toObject(),
          photo: newOrder.photo
            ? `${baseURL}${newOrder.photo.replace(/\\/g, "/")}`
            : null,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to repeat order",
      };
    }
  }
  async updateOrder(orderId, updateData, token, req) {
    try {
      const { success, error, userId } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }
      const existingOrder = await OrderRepo.findById(orderId);
      if (!existingOrder) {
        return { success: false, error: "Order not found" };
      }
      if (req.file) {
        updateData.photo = req.file.path.replace(/\\/g, "/");
      }
      const updatedData = {
        ...existingOrder.toObject(),
        ...updateData,
      };
      const errors = await this.validate(updatedData);
      if (Object.keys(errors).length > 0) {
        return { success: false, errors };
      }
      const updatedOrder = await OrderRepo.updateOne(orderId, updatedData);
      const baseURL = "http://localhost:3002/";
      return {
        success: true,
        order: {
          ...updatedOrder.order.toObject(),
          photo: updatedOrder.order.photo
            ? `${baseURL}${updatedOrder.order.photo}`
            : null,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateStatus(orderId, offerId, status, token) {
    try {
      const { success, error, userId } = await this.validateToken(token);
      if (!success) {
        return { success: false, error };
      }
      const existingOrder = await OrderRepo.findById(orderId);
      if (!existingOrder) {
        return { success: false, error: "Order not found" };
      }
      const validStatuses = [
        "pending",
        "offer_accepted",
        "inProgress",
        "completed",
        "canceled",
      ];
      if (!validStatuses.includes(status)) {
        return { success: false, error: "Invalid status" };
      }

      const updatedOrder = await OrderRepo.updateOne(orderId, { status });

      if (status === "completed") {
        const invoiceResponse = await InvoiceService.createInvoice(
          offerId,
          orderId
        );
        if (!invoiceResponse.success) {
          return {
            success: false,
            error: "Order status updated but failed to create invoice.",
          };
        }
      }

      const baseURL = "http://localhost:3002/";
      return {
        success: true,
        order: {
          ...updatedOrder.order.toObject(),
          photo: updatedOrder.order.photo
            ? `${baseURL}${updatedOrder.order.photo}`
            : null,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
module.exports = new OrderServices();
