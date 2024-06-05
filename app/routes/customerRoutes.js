const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");

router.get("/", customerController.index);

router.post("/create", customerController.create);

router.post("/find", customerController.findCustomer);

router.get("/:id", customerController.customerInfo);

router.put("/edit/:id", customerController.updateCustomer);

router.delete("/delete/:id", customerController.delete);

module.exports = router;
