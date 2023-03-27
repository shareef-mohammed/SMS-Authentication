const mongoose = require('mongoose') 

const otpSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true, 
        unique: true
    },
    otp: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('OTP', otpSchema)