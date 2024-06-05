const mongoose = require("mongoose");

const CustomerAction = new mongoose.Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
    date: {type: Date, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model("Action", CustomerAction);
