const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  orderID: { type: String, require: true },
  receiverId: { type: String },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

class InvoiceRepo {
  static create = async (invoicData) => {
    const newInvoice = new Invoice(invoicData);
    return await newInvoice.save();
  };

  static findAll = async () => {
    return await Invoice.find();
  };
  static findById = async (id) => {
    return await Invoice.findById(id);
  };
  static deleteOne = async (id) => {
    return await Invoice.findByIdAndDelete(id);
  };
  static update = async (id, invoicData) => {
    return await Invoice.findByIdAndUpdate(id, invoicData, { new: true });
  };
  static findByOrderId = async (orderID) => {
    return await Invoice.find({ orderID });
  };
  static findByOfferId = async (offerID) => {
    return await Invoice.find({ offerID });
  };
}
module.exports = {
  InvoiceRepo,
};
