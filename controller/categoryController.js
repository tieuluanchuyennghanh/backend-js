const Category=require("../models/category");


module.exports.getCategory = async (req,res)=>{
    const categories = await Category.find({});
    return res.json(categories);
}