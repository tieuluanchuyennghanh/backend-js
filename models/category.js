const mongoose = require("mongoose");


const categorySchema= new mongoose.Schema({
    name: String,
});
const Category=mongoose.model("Category",categorySchema,"categorys");
module.exports =Category;