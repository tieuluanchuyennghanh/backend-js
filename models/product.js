const mongoose=require('mongoose');
const mongoosePaginate = require("mongoose-paginate");

const productSchema=new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    status: Number, // 1: ?, 2: ?, 3: ?
    quantity: Number,
    categoryID: mongoose.Schema.Types.ObjectId,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    images: String,
    Createby: String,
    detail: String,
    groupid: String
})
productSchema.plugin(mongoosePaginate);
const product=mongoose.model("Product", productSchema,"products");
module.exports =  product;