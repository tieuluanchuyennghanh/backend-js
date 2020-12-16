const CategoryController= require("../controller/categoryController");
const express = require("express");
const router = express.Router();

router.get("/getCategory",CategoryController.getCategory);

module.exports = router;