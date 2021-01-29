const bookController=require("../controller/productController");
const express=require("express");
const productController=require("../controller/productController")
const router=express.Router();

router.post("/search",productController.searchProduct);
router.post("/addProduct",productController.postProduct);
router.get("/all",productController.getAllProduct);
router.get("/newproduct",productController.getNewProduct)
router.get("/:id_product",productController.getProduct);
router.post("/deleteProduct",productController.deleteProduct);

module.exports = router;