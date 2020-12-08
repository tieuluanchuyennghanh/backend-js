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
    const cart=new Cart({
        userID:user._id,
    });
    await cart.save();
    let access_token = jwt.sign({
        id:user._id,
        email:user.email
      },secret, { expiresIn: 60 * 60 });
     //res.status(201).json({ success: true, data: { user } });
    return res.status(201).json({
        message:"Create user successfully",
        access_token,
    })
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
        }
        if (userByEmail.groupid !== groupid) {
            return res
                .status(202)
                .json({ success: false, msg: "Lỗi quyền truy cập" });
        }
        if (userByUsername.status === 0) {
            return res.status(202).json({
                success: false,
                msg: "Lỗi truy cập. Tài khoản đã bị khóa",
            });
        }
    
    }

    const payload = {
        user: {
            id: userByEmail.id,
            email: userByEmail.email,
            groupid: userByEmail.groupid,
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
module.exports.postUpdateUser=async(req,res)=>{
    let ObjUpdate=req.body;
    const result=await User.findOneAndUpdate(
        {_id:req.body.id},
        ObjUpdate,
        {
            new: true,
        }
    )
   return res.status(201).json({
        success:true,
        data: {user:result}
    })
}

module.exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ userID: req.user.id });

    return res.json(cart);
};
module.exports.addToCart=async(req,res)=>{
    const {productID,amount}=req.body;
    let user=req.user;
    var duplicate=false;

    const product=await Product.findById(productID);
    const cart=await Cart.find({userID: user.id});
    var totalPrice=0;
    cart[0].productList.array.forEach(element => {
        if(element.productID._id==productID){
            element.amount=parseInt(element.amount)+parseInt(amount);
            dupticate=true;
        }
        totalPrice+=parseInt(element.amount*element.productID.price);
        
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
                    productID:product,
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
module.exports.updateCart=async(req,res)=>{
    const{productID,amount}=req.body;
    const cart=await Cart.findOne({userID:req.user.id});
    console.log(cart);
    let productList=[...cart.productList];

    let distance=0;
    for(let product of productList){
        if(productID===product.productID._id.toString()){
            distance=
                product.productID.price*amount-
                product.productID.price* product.amount;
            product.amount=amount;
            break;
        }
    }
    console.log(productList);
    console.log(distance);
    var totalPrice=parseInt(cart.totalPrice)+distance;
    console.log(totalPrice);
    const update=await Cart.findOneAndUpdate(
        {userID:req.user.id},
        {
            productList,
            totalPrice,
        },
        {new:true}
    );
    const result=await Cart.findOne({userID:req.user.id});
    res.status(201).json({success:true,data:result});
};

module.exports.removeFromCart=async (req,res)=>{
    const{productID}=req.body;
    const cart=await Cart.find({userID:req.user.id});
    var totalPrice=cart[0].totalPrice;
    for(let i=0;i<cart[0].productList.length;i++){
        if(cart[0].productList[i].productID._id==productID){
            totalPrice-=parseInt(
                cart[0].productList[i].amount* cart[0].productList[i].productID.price
            );
            cart[0].productList.splice(i,1);
            break;
        }
    }
    const update=await Cart.findOneAndUpdate(
        {userID:req.user.id},
        {
            productList:cart[0].productList,
            totalPrice:totalPrice,
        }
    );
    const result=await Cart.findOne({userID:req.user.id});
    if(update)res.status(201).json({success:true,data:result});
}
module.exports.addOrder=async (req,res)=>{
    let cart=await Cart.findOne({userID:req.user.id});
    if(cart.totalPrice==0){
        return res.status(201).json({
            success:false,
            msg:"Giỏ hàng đang rỗng"
        })
    }
    let order=await Order.create({
        customer:ObjectId(req.user.id),
        cart:{
            totalPrice:cart.totalPrice,
            productList:cart.productList},
        status:0,
    });
    await Cart.findOneAndUpdate(
        {userID:req.user.id},
        {totalPrice:0,productList:[]}
    );
    if(order){
        return res.status(201).json({success:true});
    }
    res.status(500).json({success:false});
};
module.exports.orders=async (req,res)=>{
    const orders=await Order.find({customer:req.user.id});
    res.status(200).json({success:true,orders});
};
module.exports.cancelOrder=async(req,res)=>{
    let result=await Order.findByIdAndUpdate(req.params.idOrder,{
        status:req.body.status,
    });
    const orders=await Order.find({}).populate("customer");
    res.json({success:true,orders});
};


