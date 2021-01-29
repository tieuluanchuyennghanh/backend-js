const express = require("express");
const router = express.Router();
const authController=require("../controller/authController");
const upload = require("../multer");
const utils = require("../utils/utils");

router.delete("/deletecomment",authController.deleteComment)
router.get("/comment",authController.getComment);
router.post("/forgetpass",authController.postForgetPass);
router.post('/callback', authController.callbackFacebook);
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

router.post("/sendmail",authController.postEmail);
module.exports = router;