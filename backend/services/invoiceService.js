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

      const newInvoice = await InvoiceRepo.create(invoice);
      return { success: true, invoice: newInvoice };
     } catch (error) {
       return { success: false, error: "Failed to create invoice" };
    }
  }
}
module.exports = new InvoiceServices();
