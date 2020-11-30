const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const cors=require("cors");
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
require('dotenv').config()
const authRouter=require("./router/authRouter");
const profileRouter = require("./router/profileRouter")
const productRouter=require("./router/productRouter");

mongoose.connect(process.env.MONGODB_URI,{ useUnifiedTopology: true,useNewUrlParser:true },
    () => console.log('connect to db'));

const port = 3000
//product   
app.use("/product",productRouter);
//user
app.use("/auth", authRouter);
app.use("/profile",profileRouter)
app.listen(port, () =>{
    console.log(`Listening to port: ${port}`)
})



