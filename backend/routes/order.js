
const { Query } = require('mongoose')
const Order = require('../models/order')
const {verifyToken,
    verifyTokenForUserAndAdmin, 
   verifyTokenForModerator,
    verifyTokenForAdmin,
    verifyTokenForSecreatary} = require('./Authorization')
const router = require('express').Router()

router.get('/find/:user',verifyTokenForUserAndAdmin ,async(req,res) => { 
    try {
        const order = await Order.findById({user:req.params.user})
    if(order){
        res.status(200).json(order)
    }else{
        res.status(400).json('order not found')
    }
    } catch (error) {
        console.error(error.message)
        res.status(500).json('server error')
    }
})

router.get('/',verifyTokenForAdmin, async(req,res) => { 
    try{
        const order = await Order.find()
        if(order){
        res.status(200).json(order)
         }else{
         res.status(400).json('order not found')
     }
}catch(err){
         console.error(err.message)
        res.status(500).json('server error')
}})

router.put('/:id',verifyTokenForUserAndAdmin, async(req,res) => { 
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new:true})
    
            res.status(200).json(updatedOrder)
    } catch (error) {
        console.error(error.message)
        res.status(500).json('server error')
    }
})

router.delete('/:id',verifyTokenForUserAndAdmin, async(req,res) => { 
    try {
            const orderFound = await Order.findById(req.params.id)
             if(orderFound){
             await Order.findByIdAndDelete(req.params.id)
             res.status(200).json('order deleted')
      }else{
        res.status(400).json('order not found')
     }
    } catch (error) {
        console.error(error.message)
        res.status(500).json('server error')
    }
})

module.exports = router