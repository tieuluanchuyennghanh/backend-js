const bookController=require("../controller/productController");
const express=require("express");
const productController=require("../controller/productController")
const router=express.Router();

router.post("/addProduct",productController.postProduct);
router.get("/all",productController.getAllProduct);
router.get("/:id_product",bookController.getProduct);
module.exports = router;