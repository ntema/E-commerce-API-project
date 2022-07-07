const {verifyTokenForAdmin } = require("./Authorization");
const router = require('express').Router()
const Order = require('../models/order')
const User = require('../models/user')
// router.get('/income',verifyTokenForModerator, async(req,res) => { 
//     const date = new Date()
//     const lastMonth = new Date(date.setMonth(date.getMonth()-1))
//     const previousMonth = new Date(date.setMonth(lastMonth.getMonth()-1))
// })



router.get('/income', verifyTokenForAdmin, async(req, res)=>{
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))

    try {
        const income = await Order.aggregate([
            {$match:{createdAt:{$gte:previousMonth}}},

            {$project:{month:{$month:'$createdAt'}},sales:'$amount'},

            {$group:{whatMonth:'$month', totalSales:{$sum:'$sales'}}}
        ])
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/stat', verifyTokenForAdmin, async(req,res)=>{
    try {
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear()-1))

        const data = await User.aggregate([{
            $match: {
                createdAt:{$gte:lastYear}
            }},

            {$project:{
                month:{$month:'$createdAt'}
            }},

            {$group:{
                what_month:'$month',
                total:{$sum: 1}
            }}
        ])

        res. status(200).json(data)
    } catch (err) {
        res.status(500).json({error:{
            message:err
        }})
    }
})
module.exports = router