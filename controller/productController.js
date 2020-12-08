const Product=require("../models/product");
const Validator=require("validatorjs");
const { model } = require("../models/product");


//code here
module.exports.postProduct = async(req,res)=>{
    var product= await Product.create(req.body);
    // return res.status(201).json({ success: true, data: { books } });
   return res.status(201).json({
        msg:"Thêm sản phẩm thành công"
    })
}

module.exports.getAllProduct=async(req,res)=>{
    const products=await Product.find({})
    return res.json(products);
}

module.exports.getProduct=async(req,res)=>{
    const {id_product:idProduct}=req.params;
    const product= await Product.findById(idProduct).populate("seller");
    return res.json(product);
}
module.exports.deleteProduct=async(req,res)=>{
    let {_id}=req.body;
    const product=await Product.findByIdAndDelete(_id)
    if(product) return res.json("xoa thanh cong")
    else return res.json("xoa that bai")
}