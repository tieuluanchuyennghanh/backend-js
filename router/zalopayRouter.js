const zalopayController=require("../controller/zalopayController");
const express = require("express");
const router = express.Router();

router.post("/create-order",zalopayController.createOrder);
router.post("/getorder",zalopayController.getData);
module.exports=router;