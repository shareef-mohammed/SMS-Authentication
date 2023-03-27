const mongoose = require('mongoose')
const config = async () => {
    mongoose.connect(process.env.MONG_URI)
    .then(() => {
        console.log('Database Connected.')
    })
    .catch((err) => {
        console.log('Connection Error')
        console.log(err)
    })
}

module.exports = config;