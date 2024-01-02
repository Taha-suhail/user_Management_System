const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController")
// customer routes
router.get("/",customerController.homepage);
router.get("/add",customerController.addCustomer);
router.post("/add",customerController.postCustomer);
router.get("/view/:id",customerController.viewCustomer);
router.get("/edit/:id",customerController.edit);
router.put("/edit/:id",customerController.editPost);
router.delete("/edit/:id",customerController.deletePost);
router.post("/search",customerController.search);

module.exports = router;