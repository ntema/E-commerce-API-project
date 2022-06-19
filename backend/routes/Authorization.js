const jwt  = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
const User = require('../models/user') 
const verifyToken = async(req,res,next ) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token
            req.user = await User.findById({_id:decoded.id, role: decoded.role}).select('-password')

            next()
        }catch(error){
            console.error(error)
            res.status(401)
            throw new Error('Not authorized')
        }
        
    }
    if(!token){
        res.status(401)
        throw new Error('Access denied. No token for authorization')
    }
}

const verifyTokenForUserAndAdmin = async(req,res,next ) => {
    verifyToken(req,res,()=>{
        if(req.user.id=== req.params.id ||['admin','moderator'].includes( req.user.role)){
            next()
        }else{
            res.status(401).json({error:"Not authorized"})
            
        }
    })
}

const verifyTokenForAdmin = async(req,res,next ) => {
    verifyToken(req,res,()=>{
        if(["admin","moderator"].includes(req.user.role)){
            next()
        }else{
            res.status(401).json({error:"Not authorized"})
            
        }
    })
}

const verifyTokenForModerator = async(req,res,next ) => {
    verifyToken(req,res,()=>{
        if(['moderator'].includes(req.user.role)){
            next()
        }else{
            res.status(401).json({error:"Not authorized"})
            
        }
    })
}

const verifyTokenForSecreatary = async(req,res,next ) => {
    verifyToken(req,res,()=>{
        if(['moderator','admin', 'secretary'].includes(req.user.role)){
            next()
        }else{
            res.status(401).json({error:"Not authorized"})
            
        }
    })
}
module.exports= {verifyToken,
             verifyTokenForUserAndAdmin, 
            verifyTokenForModerator,
             verifyTokenForAdmin,
             verifyTokenForSecreatary}


