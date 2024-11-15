const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { InvoiceRepo } = require("../models/invoiceModel");

class InvoiceServices {
  async createInvoice(offerID, orderID) {
    try {
      const invoice = {
        offerID: offerID,
        orderID: orderID,
      };
      const newInvoice = await InvoiceRepo(invoice);
      return { success: true, offer: newOffer };
    } catch (error) {
      return { success: false, error: "Failed to create offer" };
    }
  }
}
module.exports = new InvoiceServices();