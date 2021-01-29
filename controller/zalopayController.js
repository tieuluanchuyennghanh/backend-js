const CryptoJS = require('crypto-js'); // npm install crypto-js
const uuid = require('uuid'); // npm install uuid
const moment = require('moment'); // npm install moment
const axios = require('axios').default; // npm install axios
const qs = require('qs');

const config = {
    appid: "554",
    key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
    key2: "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny",
    endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder"
  };
module.exports.getData= async(req,res)=>{
        console.log(req.body)
          return res.json({
            "returncode": 1,
            "returnmessage": "[returnmessage]"
          })
}
const embeddata = {
      merchantinfo: "embeddata123"
    };
const items = [{
    itemid: "knb",
    itemname: "kim nguyen bao",
    itemprice: 198400,
    itemquantity: 1
  }];
module.exports.createOrder=async(req,res)=>{
  const{_amount}=req.body;
  let order={
          appid: config.appid, 
          apptransid: `${moment().format('YYMMDD')}_${new Date().getTime()}`, // mã giao dich có định dạng yyMMdd_xxxx
          appuser: "demo", 
          apptime: Date.now(), // miliseconds
          item: JSON.stringify(items), 
          embeddata: JSON.stringify(embeddata), 
          amount: _amount, 
          description: "ZaloPay Integration Demo",
          bankcode:"zalopayapp",
        }
        const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        let result={};
        console.log("=============",order)
        try {
          let payment = await axios.post(config.endpoint,qs.stringify(order),{
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
          });
          res.status(200).json(payment.data)
        } catch (error) {
          console.log(error)
          res.json(error)
        }
  }