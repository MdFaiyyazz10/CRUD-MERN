const express = require('express')
// import express from 'express'
const User = require('../models/user.js')
// import User from '../models/user.js'
const router = express.Router()


//Create Route || API  post = bcz we adding the data in DB

router.post('/', async (req,res)=>{
    // let name = req.body.name this is a long way
    const {name,email,age} = req.body

    try {
        const userAdded = await User.create({
            name: name,
            email: email,
            age: age
        })

        res.status(201).json(userAdded)
        
    } catch (error) {
        res.status(400).json({error: error.message})
        // console.log(error)
    }

})

//GET

router.get('/', async (req,res)=>{
    try {
        const showData = await User.find()
        res.status(200).json(showData)
    } catch (error) {
        res.status(500).json({error: error.message})
        console.log(error)
    }
})

//get single user 

router.get('/:id', async (req,res)=>{
    const {id} = req.params // params = URL se id bahar nikaalne ke liye params use karte hai
    try {
        const singleUser = await User.findById({_id: id})
        res.status(200).json(singleUser)
    } catch (error) {
        res.status(500).json({error: error.message})
        // console.log(error)
    }
})

//Delete 

router.delete('/:id', async (req,res)=>{
    const {id} = req.params // params = URL se id bahar nikaalne ke liye params use karte hai
    try {
        const deleteUser = await User.findByIdAndDelete({_id: id})
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(400).json({error: error.message})
        console.log(error)
    }
})

//PUT || PATCH || edit

router.patch('/:id', async (req,res)=>{
    const {id} = req.params // params = URL se id bahar nikaalne ke liye params use karte hai
    // const {name , email , age} = req.body
    try {
        const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({error: error.message})
        // console.log(error)
    }
})

module.exports = router;
// export default router