const mongoose = require("mongoose");

const CustomerModel = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: {type: String, required: true},
  email: {type: String, required: true},
  taxId: { type: String },
});

module.exports = mongoose.model("Customer", CustomerModel);
