const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config()
const authRouter=require("./router/authRouter");
const profileRouter = require("./router/profileRouter")

mongoose.connect(process.env.MONGODB_URI,{ useUnifiedTopology: true,useNewUrlParser:true },
    () => console.log('connect to db'));

const port = 3000   
app.use("/auth", authRouter);
app.use("/profile",profileRouter)
app.listen(port, () =>{
    console.log(`Listening to port: ${port}`)
})



