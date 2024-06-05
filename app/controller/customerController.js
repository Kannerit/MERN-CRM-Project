const Customer = require("../models/Customer");

module.exports = {
  index: async (req, res) => {
    try {
      const customers = await Customer.find();
      res.status(200).json(customers);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  create: async (req, res) => {
    try {
      const customer = new Customer(req.body);
      await customer.save();
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  findCustomer: async (req, res) => {
    try {
      const { name, phone } = req.body;
      const customer = await Customer.findOne({ name, phone });
      if (!customer)
        return res.status(400).json({
          error: "Customer not found",
        });
      res.status(200).json(customer);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  customerInfo: async (req, res,) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer)
        return res.status(400).json({
          error: "Customer not found",
        });
        res.status(200).json(customer)
    } catch (error) {
      res.status(400).json({
        error: error.nessage,
      })
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const editCustomer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!editCustomer)
        return res.status(404).json({
          error: "Customer not found :(",
        });
      res.status(200).json(editCustomer);
    } catch (error) {
      res.status(400).json({
        error: error.nessage,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const deleteCustomer = await Customer.findByIdAndDelete(req.params.id);
      if (!deleteCustomer)
        return res.status(404).json({ error: "Customer not found" });
      res.status(200).json({
        message: "Customer deleted successfully",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
};
