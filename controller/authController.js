const User=require("../models/user");
const Product=require("../models/product");
const Cart=require("../models/cart")
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
    let access_token = jwt.sign({
        id:user._id,
        email:user.email
      },secret, { expiresIn: 60 * 60 });
    // res.status(201).json({ success: true, data: { user } });
    return res.status(201).json({
        message:"Create user successfully",
        access_token
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