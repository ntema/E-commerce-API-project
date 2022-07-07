const bcrypt = require('bcryptjs')
const { Query } = require('mongoose')
const Product = require('../models/user')
const {verifyToken,
    verifyTokenForUserAndAdmin, 
   verifyTokenForModerator,
    verifyTokenForAdmin,
    verifyTokenForSecreatary} = require('./Authorization')
const router = require('express').Router()


router.post('/add',verifyTokenForAdmin, async(req, res) => {
      try {
        const newProduct =  new Product({
            title: req.body.title,
            desc: req.body.desc,
            category: req.body.category,
            price: req.body.price,
            img:req.body.img
        })

           const product = await newProduct.save()
            res.status(201).json(product)
      } catch (error) {
        res.status(500).json(error.message)
      }  
    })


router.get('/find/:id', async(req,res) => { 
    try {
        const product = await Product.findById(req.params.id)
    if(product){
        res.status(200).json(product)
    }else{
        res.status(200).json('product not found')
    }
    } catch (error) {
        console.error(error.message)
        res.status(500).json('server error')
    }
})

router.get('/', async(req,res) => { 
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products
        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5)
        }else if(qCategory){
            products = await Product.find({
               category: {
                    $in:  ["fashion", "shoes", "babies", "babies things"].includes(req.product.category)
               }
            })
        }else{
            products = await Product.find()
        }
        if(products){
        res.status(200).json(products)
    }else{
        res.status(200).json('product not found')
    }
    } catch (error) {
        console.error(error.message)
        res.status(500).json('server error')
    }
})

router.put('/:id',verifyTokenForAdmin, async(req,res) => { 
    try {
        const updatedProduct = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new:true})
    
            res.status(200).json(updatedProduct)
    } catch (error) {
        console.error(error.message)
        res.status(500).json('server error')
    }
})

router.delete('/:id',verifyTokenForAdmin, async(req,res) => { 
    try {
            const productFound = await Product.findById(req.params.id)
             if(productFound){
             await Product.findByIdAndDelete(req.params.id)
             res.status(200).json('product deleted')
      }else{
        res.status(200).json('product not found')
     }
    } catch (error) {
        console.error(error.message)
        res.status(500).json('server error')
    }
})

module.exports = router