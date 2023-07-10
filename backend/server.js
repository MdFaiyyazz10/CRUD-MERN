// import express from 'express'
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
// import dotenv from 'dotenv'
const userRoute = require('./routes/userRoutes.js')
// import userRoute from './routes/userRoutes.js'
const cors = require('cors')
// import cors from 'cors'

dotenv.config({path:'./config/config.env'})

const app = express();


app.use(express.json())

app.use(cors())

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(`Mongo DB Connected Successfully`)
}).catch((err)=>{
    console.log("Error", err)
})





app.listen(process.env.PORT ,()=>{
    console.log(`Server is Running on PORT:${process.env.PORT}`)
})


app.use(userRoute)