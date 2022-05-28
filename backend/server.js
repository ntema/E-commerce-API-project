const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const express = require('express')

connectDB()

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes

app.listen(process.env.PORT,() => {console.log('server running on port '+ process.env.PORT )})