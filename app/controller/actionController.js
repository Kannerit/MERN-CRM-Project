const Action = require("../models/CustomerAction");

module.exports = {
  createAction: async (req, res) => {
    try {
      const action = new Action({
        ...req.body,
        customerId: req.params.id,
      });
      await action.save();
      res.status(201).json(action);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getActionsByCustomer: async (req, res) => {
    try {
      const actions = await Action.find({ customerId: req.params.id });
      res.status(200).json(actions);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAction: async (req, res) => {
    try {
      const action = await Action.findById(req.params.actionId);
      if (!action) return res.status(404).json({ error: "Action not found" });
      res.status(200).json(action);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateAction: async (req, res) => {
    try {
      const action = await Action.findByIdAndUpdate(
        req.params.actionId,
        req.body,
        { new: true }
      );
      if (!action) return res.status(404).json({ error: "Action not found :'(" });
      res.status(200).json(action);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteAction: async (req, res) => {
    try {
      const action = await Action.findByIdAndDelete(req.params.actionId);
      if (!action) return res.status(404).json({ error: "Action not found" });
      res.status(200).json({ message: "Action deleted successfully " });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
