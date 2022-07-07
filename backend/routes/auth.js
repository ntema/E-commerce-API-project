const jwt  = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const user = require('../models/user')
const router = require('express').Router()

router.post('/register', async(req, res) => {
    // try{

    // }catch(err){
    //     res.status(501).json('registration unsuccessful')
    // }
    const userExist = await User.findOne({username: req.body.email})
    if(!userExist){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await  bcrypt.hash(req.body.password,salt)

      
        const newUser = await new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email

        })

            await newUser.save()
            const {password, ...others} = newUser._doc
            res.status(201).json({...others})
        
        
        
    }else{
        res.status(401).json('user already exist')
    }    
})

router.post('/login',async(req, res) => {
  try {
    const {password} = req.body
    const user = await User.findOne({username: req.body.username})
    if(user && (await bcrypt.compare(password,user.password))){

        const generateToken=  jwt.sign({id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "3d"})

        res.status(200).json({
            message: 'Login successful',
            user,
            token: generateToken
        })
    }else{
        res.status(400).json({
        message: 'invalid login credentials',
        })
    }
  } catch (err) {
      console.error(err.message)
        res.status(500).json({
        message: 'server error',
        })
  }
})
module.exports= router