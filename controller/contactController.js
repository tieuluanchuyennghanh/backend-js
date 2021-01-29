const Contact = require("../models/contact");
const ContactModel=require("../models/contact");

module.exports.postContact=async(req,res)=>{
    const Objectnew= await ContactModel.create(req.body);
    res.status(201).json(Objectnew);
}