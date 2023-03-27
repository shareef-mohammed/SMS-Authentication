const { application } = require('express')
const express = require('express')
const { register, verifyOTP } = require('../controllers/userController')
const router = express.Router()

router.post('/register', register)
router.post('/verifyOTP', verifyOTP)

module.exports = router