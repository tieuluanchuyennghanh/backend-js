const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    address:String,
    content:String,
});
const Contact = mongoose.model("Contact", contactSchema, "contacts");
module.exports = Contact;