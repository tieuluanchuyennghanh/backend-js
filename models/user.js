const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    address: String,
    phone: String,
    groupid: String
})
module.exports =  mongoose.model('user', userSchema)