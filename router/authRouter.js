const express = require("express");
const router = express.Router();
const authController=require("../controller/authController");
const upload = require("../multer");
const utils = require("../utils/utils");


router.post("/register",authController.postRegister);
router.get("/user", authController.getUserById);
router.post("/login",authController.postLogin);
router.post("/add-to-cart", utils.requireRole(1), authController.addToCart);
router.get("/cart", utils.requireRole(1), userController.getCart);
module.exports = router;