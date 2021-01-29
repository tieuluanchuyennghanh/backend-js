const express = require("express");
const router = express.Router();
const authController=require("../controller/authController");
const { verifyUser } = require("./verifyUser");
const utils = require("../utils/utils");

router.use(verifyUser)
router.get("/add-oder",utils.requireRole(1),authController.addOrder);
router.get("/",utils.requireRole(1),authController.orders);
router.put("/:idOrder/status",utils.requireRole(1),authController.cancelOrder);

module.exports= router