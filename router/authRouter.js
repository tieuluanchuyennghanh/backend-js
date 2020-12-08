const express = require("express");
const router = express.Router();
const authController=require("../controller/authController");
const upload = require("../multer");
const utils = require("../utils/utils");


router.post("/register",authController.postRegister);
// router.get("/user", authController.getUserById);
router.post("/login",authController.postLogin);
router.post("/add-to-cart", utils.requireRole(1), authController.addToCart);
router.post("/update-cart",authController.updateCart);
router.post("/remove-from-cart",authController.removeFromCart)
router.get("/cart", utils.requireRole(1), authController.getCart);
router.post("/updateuser",authController.postUpdateUser);
router.post("/update-cart",authController.updateCart);
//order
router.get("/order/add-oder",utils.requireRole(1),authController.addOrder);
router.get("/orders",utils.requireRole(1),authController.orders);
router.put("/orders/:/idOrder/status",utils.requireRole(1),authController.cancelOrder);
module.exports = router;