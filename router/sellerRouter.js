var express = require("express");
const router = express.Router();
const {verifyUser}=require("./verifyUser");
const upload = require("../multer");
const utils = require("../utils/utils");
const { verifyUser } = require("./verifyUser");
const sellerController=require("../controller/sellerController")


var cpUpload=upload.fields([
    {name:"images",maxCount:5},
    {
        name:"previewImgs",maxCount:20
    },
]);
router.use(verifyUser);
router.post(
    "upload",
    utils.requireRole(2),
    cpUpload,
    sellerController.postUpload
);
module.exports= router;

