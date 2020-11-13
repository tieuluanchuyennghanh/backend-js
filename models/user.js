const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    address: String,
    mail: String,
    phone: String,
    groupid: String
})
module.exports =  mongoose.model('user', userSchema)