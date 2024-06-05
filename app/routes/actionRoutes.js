const express = require("express");
const router = express.Router();
const actionController = require("../controller/actionController");

router.post("/:id/actions/create", actionController.createAction);
router.get("/:id/actions", actionController.getActionsByCustomer);
router.get("/:id/actions/:actionId", actionController.getAction)
router.put("/:id/actions/:actionId/edit", actionController.updateAction);
router.delete("/:id/actions/:actionId/delete", actionController.deleteAction);


module.exports = router;


 