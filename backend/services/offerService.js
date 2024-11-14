const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserRepo } = require("../models/userModel");
const { OrderRepo } = require("../models/orderModel");
const { OfferRepo } = require("../models/offerModel");

class OfferServices {
  async validate(offer) {
    let errors = {};
    if (
      !offer.message ||
      typeof offer.message !== "string" ||
      offer.message.trim().length < 5 ||
      offer.message.trim().length > 500
    ) {
      errors.message =
        "The message is required, must be a string, and between 5 and 500 characters.";
    }
    if (
      offer.cost === undefined ||
      typeof offer.cost !== "number" ||
      isNaN(offer.cost) ||
      offer.cost <= 0
    ) {
      errors.cost = "The cost is required, must be a number, and >0";
    }
    if (
      offer.estimatedCost !== undefined &&
      (typeof offer.estimatedCost !== "number" ||
        isNaN(offer.estimatedCost) ||
        offer.estimatedCost < 0)
    ) {
      errors.estimatedCost =
        "If provided, estimated cost must be a non-negative number.";
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
  async createOffer(offerData, token) {
    const { success, userId, error } = await this.validateToken(token);
    if (!success) {
      return { success: false, error };
    }
    offerData.senderID = userId;
    try {
      let order = await OrderRepo.findById(offerData.orderID);
      if (!order) {
        return { success: false, error: "Order not found" };
      }
      //   let receiver=await UserRepo.findById(order.senderId)
      offerData.receiverID = order.senderId;
      const errors = await this.validate(offerData);
      if (Object.keys(errors).length > 0) {
        return { success: false, errors };
      }
      const newOffer = await OfferRepo.create(offerData);
      return { success: true, offer: newOffer };
    } catch (error) {
      return { success: false, error: "Failed to create offer" };
    }
  }
  async deleteOneOffer(offerId, token) {
    const { success, userId, error } = await this.validateToken(token);
    if (!success) {
      return { success: false, error };
    }
    try {
      const offer = await OfferRepo.findById(offerId);
      if (!offer) {
        return { success: false, error: "Offer not found" };
      }
      if (offer.senderID !== userId) {
        return { success: false, error: "Unauthorized to delete this offer" };
      }
      await OfferRepo.deleteOne(offerId);
      return { success: true, message: "Offer deleted successfully" };
    } catch (error) {
      return { success: false, error: "Failed to delete offer" };
    }
  }
  async updateOffer(offerId, offerData, token) {
    const { success, userId, error } = await this.validateToken(token);
    if (!success) {
      return { success: false, error };
    }
    try {
      const offer = await OfferRepo.findById(offerId);
      if (!offer) {
        return { success: false, error: "Offer not found" };
      }
      if (offer.senderID !== userId) {
        return { success: false, error: "Unauthorized to update this offer" };
      }
      const errors = await this.validate(offerData);
      if (Object.keys(errors).length > 0) {
        return { success: false, errors };
      }
      const updatedOffer = await OfferRepo.update(offerId, offerData);
      return { success: true, offer: updatedOffer };
    } catch (error) {
      return { success: false, error: "Failed to update offer" };
    }
  }
  
}
module.exports = new OfferServices();
