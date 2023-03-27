require('dotenv').config()
const express = require('express')
const app = express()
const connectDb = require('./config/connectDb')
const userRouter = require('./routes/userRouter')
app.use(express.json())

connectDb();
app.use('/', userRouter)


app.listen(process.env.PORT, () => {
    console.log('Listening to the server')
})