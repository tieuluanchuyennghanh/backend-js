const Product=require("../models/product");
const Validator=require("validatorjs")


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