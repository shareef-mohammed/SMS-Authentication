const userData = require("../models/userModel");
const otpData = require('../models/OTPModel');
const { hashOTP, compareOTP } = require("../helpers/helper");

module.exports.register = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if ((!name || !email || !phone)) {
      return res.status(400).send("Invalid input");
    }
    const userExist = await userData.findOne(
      {        
          $or: [{email}, {phone}],         
      },
    );
    if (userExist) {
      return res.status(409).send("Account already exist");
    }
    await otpData.findOneAndDelete({phone})
    otpVerification(req, res, name, email, phone);
  } catch (err) {
    console.log(err);
  }
};




const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function otpVerification(req, res, name, email, phone) {
  const random = Math.floor(Math.random() * 90000) + 10000;
  client.messages
    .create({
      body: random,
      from: "+14406364552",
      to: `+91${phone}`,
    })
    .then(() => {
      const newOtp = new otpData({
        name,
        email,
        phone,
        otp:hashOTP(`${random}`)
      })
      newOtp.save()
      .then(() => {
        res.status(200).send('OTP successfully sended')
      })
    });
}

module.exports.verifyOTP = async(req, res) => {
  try {
    const {phone,enteredOTP} = req.body
    const user = await otpData.findOne({phone})
    if(user) {
      const valid = compareOTP(`${enteredOTP}`, user.otp)
      if(valid) {
        const newUser = new userData ({
          name: user.name,
          email: user.email,
          phone: user.phone
        })
        await newUser.save()
        await otpData.findOneAndDelete({phone})
        console.log('successfully verified')
        res.status(200).send('successfully verified')
      } else {
        console.log('Invalid OTP')
        res.status(400).send('Invalid OTP')
      }
    } else {
      console.log('Cannot find user')
      res.status(400).send('Cannot find user')
    }
  } catch (err) {
    console.log(err)
    res.status(404)
  }
}