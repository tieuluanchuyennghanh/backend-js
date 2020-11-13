const mongoose=require('mongoose');

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
module.exports =  mongoose.model('product', productSchema)