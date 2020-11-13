const User=require("../models/user");
const Product=require("../models/product");
const Cart=require("../models/cart")
const { findById } = require("../models/user");
const Validator=require("validatorjs")


//code here
module.exports.postRegister = async function (req, res){
    let rules = {
        email:"required|email",
        password:"required|min:8|max:20|regex:\/^\\S+$",
        confirm_password:"same:password",
        name:"required",
        phone:"present|digits_between:4,13"
      };
      let validation = new Validator(req.body, rules);
      if(validation.fails()){
          return res.status(422).json({msg:validation.errors.all()})
      }
    const {email}=req.body;
    const userByEmail=await User.find({email});
    if(userByEmail.length){
        return res.status(409).json({
            success:false,
            msg: "Email đã tồn tại",
        });
    }
    var user = await User.create(req.body);
    res.status(201).json({ success: true, data: { user } });
}