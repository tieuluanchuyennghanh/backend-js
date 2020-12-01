const User=require("../models/user");
const Product=require("../models/product");
const Cart=require("../models/cart")
const Order=require("../models/order");
const ObjectId=require("mongodb").ObjectId;
const { findById } = require("../models/user");
const Validator=require("validatorjs")
var jwt = require('jsonwebtoken');
let secret = process.env.JWT_SECRET
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
    // let access_token = jwt.sign({
    //     id:user._id,
    //     email:user.email
    //   },secret, { expiresIn: 60 * 60 });
     res.status(201).json({ success: true, data: { user } });
    // return res.status(201).json({
    //     message:"Create user successfully",
    //     access_token
    // })
}

module.exports.postLogin = async (req, res) => {
    const { email, password, groupid } = req.body;
    const userByEmail = await User.findOne({ email });

    if (userByEmail === null) {
        return res
            .status(202)
            .json({ success: false, msg: "Username không tồn tại" });
    } else {
        if (password != userByEmail.password) {
            return res
                .status(202)
                .json({ success: false, msg: "Mật khẩu không đúng" });
        // }
        // if (userByEmail.groupid !== groupid) {
        //     return res
        //         .status(202)
        //         .json({ success: false, msg: "Lỗi quyền truy cập" });
        // }
        // if (userByUsername.status === 0) {
        //     return res.status(202).json({
        //         success: false,
        //         msg: "Lỗi truy cập. Tài khoản đã bị khóa",
        //     });
        // }
    }
}

    const payload = {
        user: {
            id: userByEmail.id,
            email: userByEmail.email,
            // role: userByEmail.role,
        },
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });
    res.status(201).json({
        success: true,
        data: { accessToken, user: userByEmail },
    });
};

module.exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ userID: req.user.id });

    return res.json(cart);
};
module.exports.addToCart=async(req,res)=>{
    const {productId,amount}=req.body;
    let user=req.user;
    var duplicate=false;

    const product=await Product.findById(productId);
    const cart=await Cart.find({userID: user.id});
    var totalPrice=0;
    cart[0].productList.array.forEach(element => {
        if(element.productId._id==productId){
            element.amount=parseInt(element.amount)+parseInt(amount);
            dupticate=true;
        }
        totalPrice+=parseInt(element.amount*element.productId.price);
        
    });
    let update;
    if(duplicate){
        update=await Cart.findOneAndUpdate(
            {userID:user.id},
            {
                productList:cart[0].productList,
                totalPrice:totalPrice,
            }
        );
    }
    else{
        update=await Cart.findOneAndUpdate(
            {userID:user.id},
            {
            $push:{
                productList:{
                    amount:amount,
                    productId:product,
                },
            },
            $inc: {
                totalPrice:parseInt(amount*product.price)
            },
        }
        );
    }
    const result=await Cart.find({userID:user.id});
    if(update)
    res.status(201).json({success:true,date:result});
};


