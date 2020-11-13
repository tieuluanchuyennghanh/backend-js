const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const userRouter=require("./router/userRouter");


mongoose.connect(
    'mongodb+srv://huynhnhan:huynhnhan999@cluster0.i4lij.mongodb.net/test?retryWrites=true&w=majority'
    ,
    { useUnifiedTopology: true,useNewUrlParser:true },
    () => console.log('connect to db')
    );
    const port = 3000   
app.listen(port, () =>{
    console.log(`Listening to port: ${port}`)
})
// Code here
const user = require("./models/user");
const product= require("./models/product");

app.use("/users", userRouter);
app.post('/themTaiKhoan',function(req,res){
    var userimport =new user( {  
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        address: req.body.address,
        mail: req.body.mail,
        phone: req.body.phone,
        groupid: req.body.groupid
    });
    userimport.save().then(u=>{
        res.json(u)
    }).catch(err=>res.status(400).json(err.message));
    /*(function(err){
        if(err){
            res.json({kq:0});
        }
        else{
            res.json({kq:0});
        }
    })*/
})

