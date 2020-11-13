const User=require("../models/user");
const Product=require("../models/product");
const Cart=require("../models/cart")
const { findById } = require("../models/user");


//code here
module.exports.postRegister = async function (req, res){
    const {mail, username}=req.body;
    const userByUsername= await User.find({username});
    const userByEmail=await User.find({mail});
    if(userByUsername.length){
        return res.status(202).json({
            success: false,
            msg: "Username đã tồn tài",
        });
    }
    if(userByEmail.length){
        return res.status(202).json({
            success:false,
            msg: "Email đã tồn tại",
        });
    }

    var user = await User.create(req.body);
   
    res.status(201).json({ success: true, data: { user } });
}