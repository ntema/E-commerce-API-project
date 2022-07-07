const bcrypt = require('bcryptjs')
const User = require('../models/user')
const {verifyToken,
    verifyTokenForUserAndAdmin, 
   verifyTokenForModerator,
    verifyTokenForAdmin,
    verifyTokenForSecreatary} = require('./Authorization')
const router = require('express').Router()

router.get('/find/:id',verifyTokenForAdmin, async(req,res) => { 
    try {
        const user = await User.findById(req.params.id)
    if(user){
        res.status(200).json(user)
    }else{
        res.status(200).json('user not found')
    }
    } catch (error) {
        console.error(error.message)
        res.status(500).json('server error')
    }
})

router.get('/',verifyTokenForAdmin, async(req,res) => { 
    try {
        const query = req.query.new
        const user = query? await User.find().sort({_id:-1}).limit(5) : await User.find()
        if(user){
        res.status(200).json(user)
    }else if(!verifyTokenForAdmin) {
        res.status(400).json('no token')
    }else{
        res.status(400).json('user not found')
    }
    
    } catch (error) {
        console.error(error.message)
        res.status(500).json('server error')
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
router.put('/:id',verifyTokenForUserAndAdmin, async(req,res) => { 
    try {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password,salt)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new:true})
    
            res.status(200).json(updatedUser)
    } catch (error) {
        console.error(error.message)
        res.status(500).json('server error')
    }
})

router.delete('/:id',verifyTokenForAdmin, async(req,res) => { 
    try {
            const userFound = await User.findById(req.params.id)
             if(userFound){
             await User.findByIdAndDelete(req.params.id)
             res.status(200).json('user deleted')
      }else{
        res.status(200).json('user not found')
     }
    } catch (error) {
        console.error(error.message)
        res.status(500).json('server error')
    }
})

module.exports = router